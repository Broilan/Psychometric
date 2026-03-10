import type {
  ConfidenceInterval,
  ItemDefinition,
  QualityFlag,
  ScaleDefinition,
  ScoreResult,
  ScoreTransformMap,
  SubscaleScoreResult,
} from "../schemas";
import { countMissing } from "../core/missing";
import { assertFiniteNumber, clamp, ensureFiniteNumbers, sum } from "../core/math";
import { confidenceIntervalMean, percentileOfScore, standardDeviation } from "../core/stats";

export interface ScaleScoringOptions {
  minAnswered?: number;
  prorate?: boolean;
  confidenceLevel?: number;
  mean?: number;
  standardDeviation?: number;
}

/** @deprecated Use `ScaleScoringOptions`. */
export type ScoreItemsOptions = ScaleScoringOptions;

export function reverseScore(value: number, min: number, max: number): number {
  assertFiniteNumber(value, "value");
  return max + min - value;
}

export function applyReverseScoring(
  responses: Readonly<Record<string, number | null | undefined>>,
  items: readonly ItemDefinition<number>[],
): Record<string, number | null | undefined> {
  return Object.fromEntries(
    items.map((item) => {
      const value = responses[item.id];
      if (item.reverse && typeof value === "number" && item.min !== undefined && item.max !== undefined) {
        return [item.id, reverseScore(value, item.min, item.max)];
      }
      return [item.id, value];
    }),
  );
}

export function sumScore(values: readonly number[]): number {
  return sum(ensureFiniteNumbers(values));
}

export function weightedSumScore(values: readonly number[], weights: readonly number[]): number {
  const scores = ensureFiniteNumbers(values, "values");
  const numericWeights = ensureFiniteNumbers(weights, "weights");
  if (scores.length !== numericWeights.length) {
    throw new RangeError("values and weights must have the same length");
  }
  return sum(scores.map((value, index) => value * numericWeights[index]));
}

export function prorateScore(
  answeredValues: readonly number[],
  totalItemCount: number,
  minAnswered = totalItemCount,
): number | null {
  const values = answeredValues.filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  if (values.length < minAnswered || !totalItemCount) {
    return null;
  }
  return (sum(values) / values.length) * totalItemCount;
}

export function discrepancyScore(left: number, right: number, absolute = false): number {
  const difference = left - right;
  return absolute ? Math.abs(difference) : difference;
}

export function changeScore(baseline: number, followUp: number): number {
  return followUp - baseline;
}

export function standardizeZ(raw: number, meanValue: number, standardDeviationValue: number): number {
  if (!standardDeviationValue) {
    return 0;
  }
  return (raw - meanValue) / standardDeviationValue;
}

export function toTScore(z: number, meanValue = 50, standardDeviationValue = 10): number {
  return meanValue + z * standardDeviationValue;
}

export function toScaledScore(z: number, meanValue = 10, standardDeviationValue = 3): number {
  return meanValue + z * standardDeviationValue;
}

export function toPercentileRank(z: number): number {
  return clamp(50 + z * 34.1344746, 0, 100);
}

export function toStanine(z: number): number {
  return clamp(Math.round(z * 2 + 5), 1, 9);
}

export function reliableChangeIndex(
  baseline: number,
  followUp: number,
  standardDeviationValue: number,
  reliability: number,
): number | null {
  if (standardDeviationValue <= 0 || reliability < 0 || reliability > 1) {
    return null;
  }
  const sed = standardDeviationValue * Math.sqrt(2 * (1 - reliability));
  return sed ? (followUp - baseline) / sed : null;
}

export function scoreConfidenceInterval(
  observedScore: number,
  sem: number,
  level = 0.95,
): ConfidenceInterval {
  const pseudoSample = [observedScore - sem, observedScore, observedScore + sem];
  const interval = confidenceIntervalMean(pseudoSample, level);
  return {
    lower: observedScore - interval.margin,
    upper: observedScore + interval.margin,
    level,
  };
}

function buildSubscaleResult(
  id: string,
  itemIds: readonly string[],
  responses: Record<string, number | null | undefined>,
  itemsById: Map<string, ItemDefinition<number>>,
  options: ScaleScoringOptions = {},
): SubscaleScoreResult {
  const values = itemIds
    .map((itemId) => responses[itemId])
    .filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  const raw = options.prorate
    ? prorateScore(values, itemIds.length, options.minAnswered ?? itemIds.length)
    : values.length >= (options.minAnswered ?? itemIds.length)
      ? sum(values)
      : null;
  const transforms = raw === null ? undefined : buildScoreTransforms(raw, options.mean, options.standardDeviation);

  return {
    id,
    itemIds: [...itemIds],
    raw,
    answeredCount: values.length,
    missingCount: itemIds.length - values.length,
    maxPossible: itemIds.reduce((total, itemId) => total + (itemsById.get(itemId)?.max ?? 0), 0),
    transforms,
    transformed: transforms,
  };
}

function buildScoreTransforms(
  raw: number,
  distributionMean?: number,
  distributionStandardDeviation?: number,
): ScoreTransformMap | undefined {
  if (distributionMean === undefined || distributionStandardDeviation === undefined || !distributionStandardDeviation) {
    return undefined;
  }
  const z = standardizeZ(raw, distributionMean, distributionStandardDeviation);
  return {
    z,
    t: toTScore(z),
    scaled: toScaledScore(z),
    percentile: toPercentileRank(z),
    stanine: toStanine(z),
  };
}

export function scoreSubscales(
  definition: ScaleDefinition<number>,
  responses: Readonly<Record<string, number | null | undefined>>,
  options: ScaleScoringOptions = {},
): SubscaleScoreResult[] {
  const scoredResponses = applyReverseScoring(responses, definition.items);
  const itemsById = new Map(definition.items.map((item) => [item.id, item]));
  return Object.entries(definition.subscales ?? {}).map(([id, itemIds]) =>
    buildSubscaleResult(id, itemIds, scoredResponses, itemsById, options),
  );
}

export function scoreComposite(
  id: string,
  subscales: readonly SubscaleScoreResult[],
  subscaleIds: readonly string[],
): SubscaleScoreResult {
  const selected = subscales.filter((subscale) => subscaleIds.includes(subscale.id));
  const values = selected.map((subscale) => subscale.raw).filter((value): value is number => value !== null);
  return {
    id,
    itemIds: subscaleIds.slice(),
    raw: values.length === selected.length ? sum(values) : null,
    answeredCount: values.length,
    missingCount: selected.length - values.length,
  };
}

export function scoreLikertScale(
  definition: ScaleDefinition<number>,
  responses: Readonly<Record<string, number | null | undefined>>,
  options: ScaleScoringOptions = {},
): ScoreResult {
  const resolvedOptions: ScaleScoringOptions = {
    ...options,
    minAnswered: options.minAnswered ?? definition.scoring?.minAnswered,
    prorate: options.prorate ?? definition.scoring?.allowProrating,
  };
  const scoredResponses = applyReverseScoring(responses, definition.items);
  const answeredValues = definition.items
    .map((item) => scoredResponses[item.id])
    .filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  const missingCount = countMissing(definition.items.map((item) => scoredResponses[item.id]));
  const minAnswered = resolvedOptions.minAnswered ?? definition.items.length;
  const raw = resolvedOptions.prorate
    ? prorateScore(answeredValues, definition.items.length, minAnswered)
    : answeredValues.length >= minAnswered
      ? sum(answeredValues)
      : null;

  const subscales = scoreSubscales(definition, responses, resolvedOptions);
  const composites = Object.entries(definition.composites ?? {}).map(([id, subscaleIds]) =>
    scoreComposite(id, subscales, subscaleIds),
  );
  const qualityFlags: QualityFlag[] = [];
  if (missingCount > 0 && definition.scoring?.maxMissingRate !== undefined) {
    const rate = missingCount / definition.items.length;
    if (rate > definition.scoring.maxMissingRate) {
      qualityFlags.push({
        code: "too-much-missing-item-data",
        severity: "warning",
        message: "Missing item rate exceeds configured threshold.",
        observed: rate,
        threshold: definition.scoring.maxMissingRate,
        source: definition.id,
      });
    }
  }

  const transforms = raw === null ? undefined : buildScoreTransforms(raw, resolvedOptions.mean, resolvedOptions.standardDeviation);
  return {
    scaleId: definition.id,
    raw,
    transforms,
    transformed: transforms,
    answeredCount: answeredValues.length,
    missingCount,
    itemCount: definition.items.length,
    subscales,
    composites,
    qualityFlags,
  };
}

export function scoreBattery(
  definitions: readonly ScaleDefinition<number>[],
  responsesByScale: Readonly<Record<string, Readonly<Record<string, number | null | undefined>>>>,
  options: ScaleScoringOptions = {},
): ScoreResult[] {
  return definitions.map((definition) => scoreLikertScale(definition, responsesByScale[definition.id] ?? {}, options));
}

export function percentileRankFromNormSample(score: number, sample: readonly number[]): number {
  return percentileOfScore(sample, score);
}

export function scoreDistributionSummary(scores: readonly number[]): {
  mean: number;
  standardDeviation: number;
} {
  const values = ensureFiniteNumbers(scores);
  return {
    mean: values.reduce((total, value) => total + value, 0) / values.length,
    standardDeviation: standardDeviation(values),
  };
}
