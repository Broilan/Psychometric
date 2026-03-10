import type {
  ConditionContrastResult,
  ConditionSummary,
  InhibitionTaskSummary,
  LatencySummary,
  MemoryTaskSummary,
  PracticeSplit,
  Primitive,
  ProcessingSpeedSummary,
  QualityFlag,
  TrialRecord,
} from "../schemas";
import { ensureFiniteNumbers } from "../core/math";
import { mean, median, standardDeviation } from "../core/stats";

const BEHAVIORAL_SCHEMA_VERSION = "1.0.0" as const;

export interface ReactionTimeTrialClassification {
  isPractice: boolean;
  isCorrect: boolean;
  isOmission: boolean;
  isAnticipation: boolean;
  isLapse: boolean;
  isTimeout: boolean;
  isInvalid: boolean;
  isValid: boolean;
}

export interface ReactionTimeSummary {
  summaryType: "reaction-time";
  schemaVersion: typeof BEHAVIORAL_SCHEMA_VERSION;
  taskFamily: "reaction-time";
  practiceIncluded: boolean;
  counts: {
    total: number;
    valid: number;
    invalid: number;
    correct: number;
    incorrect: number;
    omissions: number;
    anticipations: number;
    lapses: number;
  };
  rates: {
    accuracy: number;
    error: number;
    omission: number;
    anticipation: number;
  };
  timing: LatencySummary & {
    medianCorrectRtMs: number | null;
    meanCorrectRtMs: number | null;
    rtSdMs: number | null;
  };
  comparisons: {
    earlyLateDifferenceMs: number | null;
    leftRightAsymmetryMs: number | null;
  };
  conditionSummaries?: Record<string, ConditionSummary>;
  blockSummaries?: Record<string, ConditionSummary>;
  phaseSummaries?: Record<string, ConditionSummary>;
  congruencySummaries?: Record<string, ConditionSummary>;
  switchSummaries?: Record<string, ConditionSummary>;
  responseSideSummaries?: Record<string, ConditionSummary>;
  cueSummaries?: Record<string, ConditionSummary>;
  contrastSummaries?: Record<string, ConditionContrastResult>;
  contrasts?: ConditionContrastResult[];
  halfSummaries?: {
    early: ConditionSummary | null;
    late: ConditionSummary | null;
  };
  practiceSummary?: ConditionSummary | null;
  scoredSummary?: ConditionSummary | null;
  totalTrials: number;
  validTrialCount: number;
  invalidTrialCount: number;
  medianCorrectRt: number | null;
  meanCorrectRt: number | null;
  rtSd: number | null;
  coefficientOfVariation: number | null;
  accuracy: number;
  errorRate: number;
  omissionRate: number;
  anticipationRate: number;
  earlyLateDifferenceMs: number | null;
  leftRightAsymmetryMs: number | null;
  qualityFlags: QualityFlag[];
}

export interface ReactionTimeOptions {
  anticipationThresholdMs?: number;
  lapseThresholdMs?: number;
  includePractice?: boolean;
  minimumValidTrials?: number;
  blockLabels?: {
    early?: string;
    late?: string;
  };
  conditionSelector?: (trial: TrialRecord) => string | undefined;
  blockSelector?: (trial: TrialRecord) => string | undefined;
  phaseSelector?: (trial: TrialRecord) => string | undefined;
  responseSideSelector?: (trial: TrialRecord) => string | undefined;
  cueSelector?: (trial: TrialRecord) => string | undefined;
}

export interface ContrastOptions {
  leftLabel: string;
  rightLabel: string;
  metric: string;
  standardizer?: number | null;
  contrastType?: string;
}

export interface GoNoGoSummary extends InhibitionTaskSummary {
  summaryType: "go-no-go";
  schemaVersion: typeof BEHAVIORAL_SCHEMA_VERSION;
  taskFamily: "go-no-go";
  goSummary?: ConditionSummary;
  noGoSummary?: ConditionSummary;
  stopSummary?: ConditionSummary;
  commissionErrors: number;
  omissionErrors: number;
  inhibitionSuccessRate: number;
  falseAlarmRate: number;
  ssrtMs?: number | null;
}

export interface InterferenceTaskSummary extends InhibitionTaskSummary {
  summaryType: "interference-task";
  schemaVersion: typeof BEHAVIORAL_SCHEMA_VERSION;
  taskFamily: "interference-task";
  congruentSummary?: ConditionSummary;
  incongruentSummary?: ConditionSummary;
  switchSummary?: ConditionSummary;
  repeatSummary?: ConditionSummary;
  interferenceEffectMs?: number | null;
  switchingCostMs?: number | null;
  mixingCostMs?: number | null;
  cueingBenefitMs?: number | null;
}

export interface FlankerSummary extends Omit<ReactionTimeSummary, "summaryType" | "taskFamily"> {
  summaryType: "flanker";
  taskFamily: "flanker";
  congruentSummary?: ConditionSummary;
  incongruentSummary?: ConditionSummary;
  congruencyEffect?: ConditionContrastResult | null;
}

export interface TaskSwitchingSummary extends Omit<ReactionTimeSummary, "summaryType" | "taskFamily"> {
  summaryType: "task-switching";
  taskFamily: "task-switching";
  switchSummary?: ConditionSummary;
  repeatSummary?: ConditionSummary;
  singleTaskSummary?: ConditionSummary;
  switchCost?: ConditionContrastResult | null;
  mixingCost?: ConditionContrastResult | null;
}

export interface SequenceErrorSummary<T = string | number> {
  orderErrors: number;
  substitutions: number;
  repetitions: number;
  prematureResponses: number;
  expectedLength: number;
  observedLength: number;
  taxonomy?: Record<string, number>;
}

export interface SpanDirectionSummary {
  label: string;
  totalTrials: number;
  totalCorrectTrials: number;
  longestSpan: number;
  meanSpan: number | null;
  accuracy: number;
}

export interface SpanTaskSummary {
  summaryType: "span-task";
  schemaVersion: typeof BEHAVIORAL_SCHEMA_VERSION;
  taskFamily: "span-task";
  practiceIncluded: boolean;
  counts: {
    total: number;
    correct: number;
    incorrect: number;
  };
  timing: {
    firstResponseLatencyMeanMs: number | null;
    interResponseIntervalMeanMs: number | null;
    totalSequenceResponseTimeMeanMs: number | null;
  };
  timingSummaries: {
    firstResponseLatency: LatencySummary;
    interResponseInterval: LatencySummary;
    totalSequenceResponseTime: LatencySummary;
  };
  phaseSummaries?: Record<string, SpanDirectionSummary>;
  directionSummaries?: Record<string, SpanDirectionSummary>;
  totalTrials: number;
  totalCorrectTrials: number;
  longestSpan: number;
  accuracyBySpanLevel: Record<string, number>;
  accuracyBySequenceLength: Record<string, number>;
  firstResponseLatencyMean: number | null;
  interResponseIntervalMean: number | null;
  totalSequenceResponseTimeMean: number | null;
  forwardBackwardDelta: number | null;
  forwardBackwardContrast?: ConditionContrastResult | null;
  manipulationCost: number | null;
  errors: SequenceErrorSummary[];
  errorBreakdown: SequenceErrorSummary & {
    taxonomy: Record<string, number>;
  };
  practiceSummary?: SpanDirectionSummary | null;
  scoredSummary?: SpanDirectionSummary | null;
}

export interface RecognitionMemorySummary extends MemoryTaskSummary {
  summaryType: "recognition-memory";
  schemaVersion: typeof BEHAVIORAL_SCHEMA_VERSION;
  taskFamily: "recognition-memory";
  hitRate: number;
  falseAlarmRate: number;
  correctedRecognition: number;
  delayedChange?: number | null;
}

export interface PairedAssociatesSummary extends MemoryTaskSummary {
  summaryType: "paired-associates";
  schemaVersion: typeof BEHAVIORAL_SCHEMA_VERSION;
  taskFamily: "paired-associates";
  totalCorrect: number;
  learningGain: number | null;
}

export interface ProcessingSpeedOptions {
  durationMinutes?: number;
  timeWindowSelector?: (trial: TrialRecord) => string | undefined;
}

export interface SpanTaskOptions {
  includePractice?: boolean;
  directionSelector?: (trial: TrialRecord) => string | undefined;
  phaseSelector?: (trial: TrialRecord) => string | undefined;
}

export interface TaskSwitchingOptions extends ReactionTimeOptions {
  singleTaskSelector?: (trial: TrialRecord) => boolean;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function filterNumbers(values: readonly (number | null | undefined)[]): number[] {
  return values.filter((value): value is number => isFiniteNumber(value));
}

function getTrialLatency(trial: TrialRecord): number | null {
  const latency = trial.reactionTimeMs ?? trial.latencyMs ?? null;
  return isFiniteNumber(latency) ? latency : null;
}

function getExpectedResponse<TResponse = Primitive>(trial: TrialRecord<TResponse>): TResponse | undefined {
  return (trial.correctResponse ?? trial.expectedResponse) as TResponse | undefined;
}

function getObservedResponse<TResponse = Primitive>(trial: TrialRecord<TResponse>): TResponse | undefined {
  return (trial.observedResponse ?? trial.response) as TResponse | undefined;
}

function isPracticeTrial(trial: TrialRecord): boolean {
  return Boolean(
    trial.isPractice ||
      trial.phase === "practice" ||
      trial.labels?.phase === "practice" ||
      trial.labels?.scoringPhase === "practice",
  );
}

function summarizeLatencyValues(values: readonly number[]): LatencySummary {
  const filtered = filterNumbers(values);
  if (!filtered.length) {
    return {
      meanMs: null,
      medianMs: null,
      standardDeviationMs: null,
      coefficientOfVariation: null,
      minMs: null,
      maxMs: null,
    };
  }

  const average = mean(filtered);
  const sd = filtered.length > 1 ? standardDeviation(filtered) : 0;
  return {
    meanMs: average,
    medianMs: median(filtered),
    standardDeviationMs: filtered.length > 1 ? sd : 0,
    coefficientOfVariation: average ? sd / average : null,
    minMs: Math.min(...filtered),
    maxMs: Math.max(...filtered),
  };
}

function makeConditionSummary(
  label: string,
  trials: readonly TrialRecord[],
  options: ReactionTimeOptions = {},
  taskFamily = "reaction-time",
  metadata?: Record<string, Primitive | Primitive[] | undefined>,
): ConditionSummary {
  const classified = trials.map((trial) => ({ trial, classification: classifyReactionTimeTrial(trial, options) }));
  const validTrials = classified.filter(({ classification }) => classification.isValid);
  const correctValidRts = validTrials
    .filter(({ classification }) => classification.isCorrect)
    .map(({ trial }) => getTrialLatency(trial));
  const incorrectTrials = classified.filter(({ classification }) => !classification.isCorrect && !classification.isOmission);
  const omissions = classified.filter(({ classification }) => classification.isOmission);
  const anticipations = classified.filter(({ classification }) => classification.isAnticipation);
  const lapses = classified.filter(({ classification }) => classification.isLapse);
  const correctCount = classified.filter(({ classification }) => classification.isCorrect).length;

  return {
    label,
    schemaVersion: BEHAVIORAL_SCHEMA_VERSION,
    taskFamily,
    counts: {
      total: trials.length,
      valid: validTrials.length,
      invalid: trials.length - validTrials.length,
      correct: correctCount,
      incorrect: incorrectTrials.length,
      omissions: omissions.length,
      anticipations: anticipations.length,
      lapses: lapses.length,
    },
    rates: {
      accuracy: trials.length ? correctCount / trials.length : 0,
      error: trials.length ? incorrectTrials.length / trials.length : 0,
      omission: trials.length ? omissions.length / trials.length : 0,
      anticipation: trials.length ? anticipations.length / trials.length : 0,
    },
    timing: summarizeLatencyValues(filterNumbers(correctValidRts)),
    metadata,
  };
}

function groupTrials(
  trials: readonly TrialRecord[],
  selector: (trial: TrialRecord) => string | undefined,
): Map<string, TrialRecord[]> {
  const grouped = new Map<string, TrialRecord[]>();
  trials.forEach((trial) => {
    const key = selector(trial);
    if (!key) {
      return;
    }
    grouped.set(key, [...(grouped.get(key) ?? []), trial]);
  });
  return grouped;
}

function buildSummaryMap(
  trials: readonly TrialRecord[],
  selector: (trial: TrialRecord) => string | undefined,
  options: ReactionTimeOptions = {},
  taskFamily = "reaction-time",
): Record<string, ConditionSummary> | undefined {
  const grouped = groupTrials(trials, selector);
  if (!grouped.size) {
    return undefined;
  }

  return Object.fromEntries(
    [...grouped.entries()].map(([key, groupedTrials]) => [key, makeConditionSummary(key, groupedTrials, options, taskFamily)]),
  );
}

function getPrimaryConditionLabel(trial: TrialRecord, options: ReactionTimeOptions): string | undefined {
  return (
    options.conditionSelector?.(trial) ??
    trial.labels?.condition ??
    trial.labels?.congruency ??
    trial.labels?.switchType ??
    trial.labels?.cueValidity ??
    (typeof trial.metadata?.condition === "string" ? trial.metadata.condition : undefined)
  );
}

function getBlockLabel(trial: TrialRecord, options: ReactionTimeOptions): string | undefined {
  return options.blockSelector?.(trial) ?? trial.blockId ?? (trial.blockIndex !== undefined ? `block-${trial.blockIndex}` : undefined);
}

function getPhaseLabel(trial: TrialRecord, options: ReactionTimeOptions): string | undefined {
  return (
    options.phaseSelector?.(trial) ??
    trial.phase ??
    trial.labels?.phase ??
    trial.labels?.scoringPhase ??
    (isPracticeTrial(trial) ? "practice" : "scored")
  );
}

function getResponseSideLabel(trial: TrialRecord, options: ReactionTimeOptions): string | undefined {
  return options.responseSideSelector?.(trial) ?? trial.responseSide ?? trial.labels?.responseSide ?? trial.stimulusSide;
}

function getCueLabel(trial: TrialRecord, options: ReactionTimeOptions): string | undefined {
  return options.cueSelector?.(trial) ?? trial.labels?.cueValidity ?? trial.labels?.cueType ?? trial.cue;
}

function getConditionMetric(summary: ConditionSummary | undefined, metric: "meanMs" | "medianMs" = "meanMs"): number | null {
  if (!summary) {
    return null;
  }
  return metric === "medianMs" ? summary.timing.medianMs ?? null : summary.timing.meanMs;
}

function buildContrastMap(
  entries: readonly (ConditionContrastResult | null | undefined)[],
): Record<string, ConditionContrastResult> | undefined {
  const filtered = entries.filter((entry): entry is ConditionContrastResult => Boolean(entry));
  if (!filtered.length) {
    return undefined;
  }
  return Object.fromEntries(filtered.map((entry) => [entry.contrastType ?? `${entry.leftLabel}-vs-${entry.rightLabel}`, entry]));
}

function buildRtContrast(
  leftSummary: ConditionSummary | undefined,
  rightSummary: ConditionSummary | undefined,
  options: ContrastOptions,
): ConditionContrastResult | null {
  if (!leftSummary || !rightSummary) {
    return null;
  }
  return computeConditionContrast(getConditionMetric(leftSummary), getConditionMetric(rightSummary), options);
}

function computeMeanDifference(left: readonly number[], right: readonly number[]): number | null {
  return left.length && right.length ? mean(left) - mean(right) : null;
}

function getValidLatencyValues(trials: readonly TrialRecord[], options: ReactionTimeOptions = {}): number[] {
  return trials
    .filter((trial) => classifyReactionTimeTrial(trial, options).isValid)
    .map((trial) => getTrialLatency(trial))
    .filter((value): value is number => value !== null);
}

function getValidLatencyMean(trials: readonly TrialRecord[], options: ReactionTimeOptions = {}): number | null {
  const values = getValidLatencyValues(trials, options);
  return values.length ? mean(values) : null;
}

function getDirectionLabel(trial: TrialRecord): string | undefined {
  return trial.labels?.direction ?? (typeof trial.metadata?.direction === "string" ? trial.metadata.direction : undefined);
}

function getExpectedSequence<T = string | number>(trial: TrialRecord<T>): readonly T[] {
  return (trial.expectedSequence ?? trial.presentedSequence ?? []) as readonly T[];
}

function getObservedSequence<T = string | number>(trial: TrialRecord<T>): readonly T[] {
  return (trial.responseSequence ?? trial.recalledSequence ?? []) as readonly T[];
}

function isSequenceCorrect<T = string | number>(trial: TrialRecord<T>): boolean {
  if (trial.isCorrect !== undefined) {
    return Boolean(trial.isCorrect);
  }
  return JSON.stringify(getExpectedSequence(trial)) === JSON.stringify(getObservedSequence(trial));
}

function countTaxonomy(trial: TrialRecord): Record<string, number> {
  const taxonomy = trial.errorTaxonomy ?? {};
  const counts: Record<string, number> = {};
  Object.entries(taxonomy).forEach(([key, value]) => {
    if (typeof value === "number" && Number.isFinite(value)) {
      counts[key] = value;
      return;
    }
    if (typeof value === "boolean") {
      counts[key] = value ? 1 : 0;
      return;
    }
    if (typeof value === "string") {
      counts[value] = (counts[value] ?? 0) + 1;
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((entry) => {
        const label = `${entry}`;
        counts[label] = (counts[label] ?? 0) + 1;
      });
    }
  });
  return counts;
}

function summarizeSpanDirection(label: string, trials: readonly TrialRecord[]): SpanDirectionSummary {
  const correctTrials = trials.filter((trial) => isSequenceCorrect(trial));
  const spans = correctTrials
    .map((trial) => trial.spanLevel ?? trial.sequenceLength ?? getExpectedSequence(trial).length)
    .filter(isFiniteNumber);

  return {
    label,
    totalTrials: trials.length,
    totalCorrectTrials: correctTrials.length,
    longestSpan: spans.length ? Math.max(...spans) : 0,
    meanSpan: spans.length ? mean(spans) : null,
    accuracy: trials.length ? correctTrials.length / trials.length : 0,
  };
}

function buildSpanGroupSummary(
  trials: readonly TrialRecord[],
  selector: (trial: TrialRecord) => string | undefined,
): Record<string, SpanDirectionSummary> | undefined {
  const grouped = groupTrials(trials, selector);
  if (!grouped.size) {
    return undefined;
  }
  return Object.fromEntries([...grouped.entries()].map(([label, groupedTrials]) => [label, summarizeSpanDirection(label, groupedTrials)]));
}

export function computeConditionContrast(
  leftValue: number | null,
  rightValue: number | null,
  options: ContrastOptions,
): ConditionContrastResult {
  const rawDifference = leftValue === null || rightValue === null ? null : leftValue - rightValue;
  const proportionalDifference = rawDifference === null || rightValue === null || rightValue === 0 ? null : rawDifference / rightValue;
  const standardizedDifference = rawDifference === null || !options.standardizer ? null : rawDifference / options.standardizer;
  return {
    schemaVersion: BEHAVIORAL_SCHEMA_VERSION,
    contrastType: options.contrastType,
    leftLabel: options.leftLabel,
    rightLabel: options.rightLabel,
    metric: options.metric,
    leftValue,
    rightValue,
    rawDifference,
    proportionalDifference,
    standardizedDifference,
  };
}

export function classifyReactionTimeTrial(
  trial: TrialRecord,
  options: ReactionTimeOptions = {},
): ReactionTimeTrialClassification {
  const anticipationThreshold = options.anticipationThresholdMs ?? 150;
  const lapseThreshold = options.lapseThresholdMs ?? 2000;
  const rt = getTrialLatency(trial);
  const isPractice = isPracticeTrial(trial);
  const isOmission = trial.isOmission ?? rt === null;
  const isAnticipation = trial.isAnticipation ?? (!isOmission && rt !== null && rt < anticipationThreshold);
  const isLapse = !isOmission && rt !== null && rt > lapseThreshold;
  const isTimeout = Boolean(trial.isTimeout);
  const isInvalid = Boolean(trial.isInvalid) || isTimeout;
  const expectedResponse = getExpectedResponse(trial);
  const observedResponse = getObservedResponse(trial);
  const isCorrect = trial.isCorrect ?? (expectedResponse !== undefined && observedResponse === expectedResponse);
  const allowPractice = options.includePractice ?? false;
  const isValid = (allowPractice || !isPractice) && !isOmission && !isAnticipation && !isInvalid;

  return {
    isPractice,
    isCorrect: Boolean(isCorrect),
    isOmission,
    isAnticipation,
    isLapse,
    isTimeout,
    isInvalid,
    isValid,
  };
}

export function summarizeConditionedReactionTime(
  trials: readonly TrialRecord[],
  selector: (trial: TrialRecord) => string | undefined,
  options: ReactionTimeOptions = {},
): Record<string, ConditionSummary> | undefined {
  return buildSummaryMap(options.includePractice ? trials : trials.filter((trial) => !isPracticeTrial(trial)), selector, options);
}

export function summarizeReactionTime(
  trials: readonly TrialRecord[],
  options: ReactionTimeOptions = {},
): ReactionTimeSummary {
  const includePractice = options.includePractice ?? false;
  const scopedTrials = includePractice ? trials : trials.filter((trial) => !isPracticeTrial(trial));
  const classified = scopedTrials.map((trial) => ({ trial, classification: classifyReactionTimeTrial(trial, options) }));
  const validTrials = classified.filter(({ classification }) => classification.isValid);
  const invalidTrials = classified.filter(({ classification }) => !classification.isValid);
  const correctTrials = classified.filter(({ classification }) => classification.isCorrect);
  const incorrectTrials = classified.filter(({ classification }) => !classification.isCorrect && !classification.isOmission);
  const omissions = classified.filter(({ classification }) => classification.isOmission);
  const anticipations = classified.filter(({ classification }) => classification.isAnticipation);
  const lapses = classified.filter(({ classification }) => classification.isLapse);
  const correctValidRts = validTrials
    .filter(({ classification }) => classification.isCorrect)
    .map(({ trial }) => getTrialLatency(trial));

  const baseTiming = summarizeLatencyValues(filterNumbers(correctValidRts));
  const timing = {
    ...baseTiming,
    medianCorrectRtMs: baseTiming.medianMs ?? null,
    meanCorrectRtMs: baseTiming.meanMs,
    rtSdMs: baseTiming.standardDeviationMs ?? null,
  };

  const omissionRate = scopedTrials.length ? omissions.length / scopedTrials.length : 0;
  const anticipationRate = scopedTrials.length ? anticipations.length / scopedTrials.length : 0;
  const errorRate = scopedTrials.length ? incorrectTrials.length / scopedTrials.length : 0;
  const accuracy = scopedTrials.length ? correctTrials.length / scopedTrials.length : 0;

  const halfPoint = Math.ceil(scopedTrials.length / 2);
  const earlyHalfTrials = scopedTrials.slice(0, halfPoint);
  const lateHalfTrials = scopedTrials.slice(halfPoint);
  const earlyHalfSummary = earlyHalfTrials.length ? makeConditionSummary("early-half", earlyHalfTrials, options) : null;
  const lateHalfSummary = lateHalfTrials.length ? makeConditionSummary("late-half", lateHalfTrials, options) : null;

  const responseSideSummaries = buildSummaryMap(scopedTrials, (trial) => getResponseSideLabel(trial, options), options);
  const blockSummaries = buildSummaryMap(scopedTrials, (trial) => getBlockLabel(trial, options), options);
  const congruencySummaries = buildSummaryMap(scopedTrials, (trial) => trial.labels?.congruency, options);
  const switchSummaries = buildSummaryMap(scopedTrials, (trial) => trial.labels?.switchType, options);
  const cueSummaries = buildSummaryMap(scopedTrials, (trial) => getCueLabel(trial, options), options);
  const earlyBlockLabel = options.blockLabels?.early ?? "early";
  const lateBlockLabel = options.blockLabels?.late ?? "late";
  const groupedByBlock = groupTrials(scopedTrials, (trial) => getBlockLabel(trial, options));
  const groupedBySide = groupTrials(scopedTrials, (trial) => getResponseSideLabel(trial, options));
  const earlyValidMean = getValidLatencyMean(groupedByBlock.get(earlyBlockLabel) ?? [], options);
  const lateValidMean = getValidLatencyMean(groupedByBlock.get(lateBlockLabel) ?? [], options);
  const earlyHalfMean = getValidLatencyMean(earlyHalfTrials, options);
  const lateHalfMean = getValidLatencyMean(lateHalfTrials, options);
  const earlyLateDifferenceMs = earlyValidMean !== null && lateValidMean !== null
    ? lateValidMean - earlyValidMean
    : earlyHalfMean !== null && lateHalfMean !== null
      ? lateHalfMean - earlyHalfMean
      : null;
  const leftMean = getValidLatencyMean(groupedBySide.get("left") ?? [], options);
  const rightMean = getValidLatencyMean(groupedBySide.get("right") ?? [], options);
  const leftRightAsymmetryMs = leftMean !== null && rightMean !== null ? rightMean - leftMean : null;
  const contrasts = [
    buildRtContrast(congruencySummaries?.incongruent, congruencySummaries?.congruent, {
      leftLabel: "incongruent",
      rightLabel: "congruent",
      metric: "meanCorrectRtMs",
      standardizer: timing.standardDeviationMs,
      contrastType: "congruency-effect",
    }),
    buildRtContrast(switchSummaries?.switch, switchSummaries?.repeat, {
      leftLabel: "switch",
      rightLabel: "repeat",
      metric: "meanCorrectRtMs",
      standardizer: timing.standardDeviationMs,
      contrastType: "switching-cost",
    }),
    buildRtContrast(responseSideSummaries?.right, responseSideSummaries?.left, {
      leftLabel: "right",
      rightLabel: "left",
      metric: "meanCorrectRtMs",
      standardizer: timing.standardDeviationMs,
      contrastType: "response-side-asymmetry",
    }),
    buildRtContrast(cueSummaries?.invalid, cueSummaries?.valid, {
      leftLabel: "invalid",
      rightLabel: "valid",
      metric: "meanCorrectRtMs",
      standardizer: timing.standardDeviationMs,
      contrastType: "cue-validity-cost",
    }),
  ].filter((contrast): contrast is ConditionContrastResult => Boolean(contrast));
  const contrastSummaries = buildContrastMap(contrasts);

  const qualityFlags: QualityFlag[] = [];
  const minimumValidTrials = options.minimumValidTrials ?? 10;
  if (validTrials.length < minimumValidTrials) {
    qualityFlags.push({
      code: "insufficient-valid-trials",
      severity: "warning",
      message: "Valid trial count is below the configured minimum.",
      observed: validTrials.length,
      threshold: minimumValidTrials,
      source: "behavioral.reaction-time",
    });
  }

  return {
    summaryType: "reaction-time",
    schemaVersion: BEHAVIORAL_SCHEMA_VERSION,
    taskFamily: "reaction-time",
    practiceIncluded: includePractice,
    counts: {
      total: scopedTrials.length,
      valid: validTrials.length,
      invalid: invalidTrials.length,
      correct: correctTrials.length,
      incorrect: incorrectTrials.length,
      omissions: omissions.length,
      anticipations: anticipations.length,
      lapses: lapses.length,
    },
    rates: {
      accuracy,
      error: errorRate,
      omission: omissionRate,
      anticipation: anticipationRate,
    },
    timing,
    comparisons: {
      earlyLateDifferenceMs,
      leftRightAsymmetryMs,
    },
    conditionSummaries: buildSummaryMap(scopedTrials, (trial) => getPrimaryConditionLabel(trial, options), options),
    blockSummaries,
    phaseSummaries: buildSummaryMap(scopedTrials, (trial) => getPhaseLabel(trial, options), options),
    congruencySummaries,
    switchSummaries,
    responseSideSummaries,
    cueSummaries,
    contrastSummaries,
    contrasts,
    halfSummaries: {
      early: earlyHalfSummary,
      late: lateHalfSummary,
    },
    practiceSummary: trials.some((trial) => isPracticeTrial(trial))
      ? makeConditionSummary("practice", trials.filter((trial) => isPracticeTrial(trial)), { ...options, includePractice: true })
      : null,
    scoredSummary: scopedTrials.length ? makeConditionSummary("scored", scopedTrials, options) : null,
    totalTrials: scopedTrials.length,
    validTrialCount: validTrials.length,
    invalidTrialCount: invalidTrials.length,
    medianCorrectRt: baseTiming.medianMs ?? null,
    meanCorrectRt: baseTiming.meanMs,
    rtSd: baseTiming.standardDeviationMs ?? null,
    coefficientOfVariation: baseTiming.coefficientOfVariation ?? null,
    accuracy,
    errorRate,
    omissionRate,
    anticipationRate,
    earlyLateDifferenceMs,
    leftRightAsymmetryMs,
    qualityFlags,
  };
}

export function summarizeFlanker(
  trials: readonly TrialRecord[],
  options: ReactionTimeOptions = {},
): FlankerSummary {
  const base = summarizeReactionTime(trials, {
    ...options,
    conditionSelector: options.conditionSelector ?? ((trial) => trial.labels?.condition ?? trial.labels?.congruency),
  });

  return {
    ...base,
    summaryType: "flanker",
    taskFamily: "flanker",
    congruentSummary: base.congruencySummaries?.congruent,
    incongruentSummary: base.congruencySummaries?.incongruent,
    congruencyEffect: base.contrastSummaries?.["congruency-effect"] ?? null,
  };
}

export function summarizeTaskSwitching(
  trials: readonly TrialRecord[],
  options: TaskSwitchingOptions = {},
): TaskSwitchingSummary {
  const scopedTrials = options.includePractice ? trials : trials.filter((trial) => !isPracticeTrial(trial));
  const base = summarizeReactionTime(trials, {
    ...options,
    conditionSelector: options.conditionSelector ?? ((trial) => trial.labels?.condition ?? trial.labels?.switchType),
  });
  const singleTaskTrials = scopedTrials.filter((trial) =>
    options.singleTaskSelector?.(trial) ?? (
      trial.labels?.condition === "single" ||
      trial.metadata?.taskContext === "single"
    ),
  );
  const repeatTrials = scopedTrials.filter((trial) => trial.labels?.switchType === "repeat" && trial.labels?.condition !== "single");
  const switchTrials = scopedTrials.filter((trial) => trial.labels?.switchType === "switch");
  const singleTaskSummary = singleTaskTrials.length ? makeConditionSummary("single", singleTaskTrials, options) : undefined;
  const repeatSummary = repeatTrials.length ? makeConditionSummary("repeat", repeatTrials, options) : undefined;
  const switchSummary = switchTrials.length ? makeConditionSummary("switch", switchTrials, options) : undefined;
  const switchCost = buildRtContrast(switchSummary, repeatSummary, {
    leftLabel: "switch",
    rightLabel: "repeat",
    metric: "meanCorrectRtMs",
    standardizer: base.timing.standardDeviationMs,
    contrastType: "switching-cost",
  });
  const mixingCost = singleTaskSummary
    ? buildRtContrast(repeatSummary, singleTaskSummary, {
      leftLabel: "repeat",
      rightLabel: "single",
      metric: "meanCorrectRtMs",
      standardizer: base.timing.standardDeviationMs,
      contrastType: "mixing-cost",
    })
    : null;

  const contrastSummaries = {
    ...(base.contrastSummaries ?? {}),
    ...(switchCost ? { "switching-cost": switchCost } : {}),
    ...(mixingCost ? { "mixing-cost": mixingCost } : {}),
  };

  return {
    ...base,
    summaryType: "task-switching",
    taskFamily: "task-switching",
    switchSummary,
    repeatSummary,
    singleTaskSummary,
    switchCost,
    mixingCost,
    contrastSummaries,
    contrasts: [
      ...(base.contrasts ?? []).filter((contrast) => contrast.contrastType !== "switching-cost"),
      ...(switchCost ? [switchCost] : []),
      ...(mixingCost ? [mixingCost] : []),
    ],
  };
}

export function summarizeGoNoGo(
  trials: readonly TrialRecord[],
  options: ReactionTimeOptions = {},
): GoNoGoSummary {
  const scopedTrials = options.includePractice ? trials : trials.filter((trial) => !isPracticeTrial(trial));
  const goTrials = scopedTrials.filter((trial) => (trial.labels?.goNoGoType ?? trial.metadata?.goNoGoType) === "go");
  const noGoTrials = scopedTrials.filter((trial) => (trial.labels?.goNoGoType ?? trial.metadata?.goNoGoType) === "no-go");
  const stopTrials = scopedTrials.filter((trial) => (trial.labels?.stopSignalType ?? trial.metadata?.stopSignalType) === "stop");
  const goSummary = goTrials.length ? makeConditionSummary("go", goTrials, options, "go-no-go") : undefined;
  const noGoSummary = noGoTrials.length ? makeConditionSummary("no-go", noGoTrials, options, "go-no-go") : undefined;
  const stopSummary = stopTrials.length ? makeConditionSummary("stop", stopTrials, options, "go-no-go") : undefined;
  const commissionErrors = noGoTrials.filter((trial) => getObservedResponse(trial) !== undefined && !trial.isCorrect).length;
  const omissionErrors = goTrials.filter((trial) => classifyReactionTimeTrial(trial, options).isOmission).length;
  const latencyValues = scopedTrials.map((trial) => getTrialLatency(trial));
  const rates = {
    accuracy: scopedTrials.length ? scopedTrials.filter((trial) => classifyReactionTimeTrial(trial, options).isCorrect).length / scopedTrials.length : 0,
    error: scopedTrials.length ? scopedTrials.filter((trial) => !classifyReactionTimeTrial(trial, options).isCorrect).length / scopedTrials.length : 0,
    omission: scopedTrials.length ? scopedTrials.filter((trial) => classifyReactionTimeTrial(trial, options).isOmission).length / scopedTrials.length : 0,
    anticipation: scopedTrials.length ? scopedTrials.filter((trial) => classifyReactionTimeTrial(trial, options).isAnticipation).length / scopedTrials.length : 0,
    commissionError: noGoTrials.length ? commissionErrors / noGoTrials.length : 0,
  };
  const contrasts = goSummary && noGoSummary
    ? [
      computeConditionContrast(goSummary.rates.accuracy, noGoSummary.rates.accuracy, {
        leftLabel: "go",
        rightLabel: "no-go",
        metric: "accuracy",
        contrastType: "go-no-go-accuracy-gap",
      }),
    ]
    : [];

  const qualityFlags: QualityFlag[] = [];
  if (noGoTrials.length && commissionErrors / noGoTrials.length > 0.3) {
    qualityFlags.push({
      code: "excessive-no-go-false-alarms",
      severity: "warning",
      message: "False alarm rate on no-go trials exceeds threshold.",
      observed: commissionErrors / noGoTrials.length,
      threshold: 0.3,
      source: "behavioral.go-no-go",
    });
  }

  return {
    summaryType: "go-no-go",
    schemaVersion: BEHAVIORAL_SCHEMA_VERSION,
    taskFamily: "go-no-go",
    counts: {
      total: scopedTrials.length,
      valid: scopedTrials.filter((trial) => classifyReactionTimeTrial(trial, options).isValid).length,
      invalid: scopedTrials.filter((trial) => !classifyReactionTimeTrial(trial, options).isValid).length,
      correct: scopedTrials.filter((trial) => classifyReactionTimeTrial(trial, options).isCorrect).length,
      incorrect: scopedTrials.filter((trial) => !classifyReactionTimeTrial(trial, options).isCorrect).length,
      omissions: omissionErrors,
      anticipations: scopedTrials.filter((trial) => classifyReactionTimeTrial(trial, options).isAnticipation).length,
      commissionErrors,
    },
    rates,
    timing: summarizeLatencyValues(filterNumbers(latencyValues)),
    conditionSummaries: {
      ...(goSummary ? { go: goSummary } : {}),
      ...(noGoSummary ? { "no-go": noGoSummary } : {}),
      ...(stopSummary ? { stop: stopSummary } : {}),
    },
    contrasts,
    qualityFlags,
    metadata: undefined,
    goSummary,
    noGoSummary,
    stopSummary,
    commissionErrors,
    omissionErrors,
    inhibitionSuccessRate: noGoTrials.length ? 1 - commissionErrors / noGoTrials.length : 0,
    falseAlarmRate: noGoTrials.length ? commissionErrors / noGoTrials.length : 0,
    ssrtMs: undefined,
  };
}

export function summarizeInterferenceTask(
  trials: readonly TrialRecord[],
  options: ReactionTimeOptions = {},
): InterferenceTaskSummary {
  const base = summarizeReactionTime(trials, {
    ...options,
    conditionSelector: options.conditionSelector ?? ((trial) => trial.labels?.condition ?? trial.labels?.congruency ?? trial.labels?.switchType),
  });

  return {
    summaryType: "interference-task",
    schemaVersion: BEHAVIORAL_SCHEMA_VERSION,
    taskFamily: "interference-task",
    counts: base.counts,
    rates: base.rates,
    timing: base.timing,
    conditionSummaries: {
      ...(base.congruencySummaries ?? {}),
      ...(base.switchSummaries ?? {}),
      ...(base.cueSummaries ?? {}),
    },
    contrasts: base.contrasts,
    qualityFlags: base.qualityFlags,
    metadata: undefined,
    congruentSummary: base.congruencySummaries?.congruent,
    incongruentSummary: base.congruencySummaries?.incongruent,
    switchSummary: base.switchSummaries?.switch,
    repeatSummary: base.switchSummaries?.repeat,
    interferenceEffectMs: base.contrastSummaries?.["congruency-effect"]?.rawDifference ?? null,
    switchingCostMs: base.contrastSummaries?.["switching-cost"]?.rawDifference ?? null,
    mixingCostMs: null,
    cueingBenefitMs: base.contrastSummaries?.["cue-validity-cost"]?.rawDifference ?? null,
  };
}

export function classifySequenceErrors<T>(
  expected: readonly T[],
  observed: readonly T[],
  errorTaxonomy?: Record<string, Primitive | Primitive[] | undefined>,
): SequenceErrorSummary<T> {
  let orderErrors = 0;
  let substitutions = 0;
  let repetitions = 0;
  let prematureResponses = 0;
  const seen = new Set<T>();

  observed.forEach((value, index) => {
    if (index >= expected.length) {
      prematureResponses += 1;
      return;
    }
    if (value === expected[index]) {
      seen.add(value);
      return;
    }
    if (expected.includes(value) && value !== expected[index]) {
      orderErrors += 1;
    } else {
      substitutions += 1;
    }
    if (seen.has(value)) {
      repetitions += 1;
    }
    seen.add(value);
  });

  const taxonomyCounts: Record<string, number> = {};
  Object.entries(errorTaxonomy ?? {}).forEach(([key, value]) => {
    if (typeof value === "number" && Number.isFinite(value)) {
      taxonomyCounts[key] = value;
    } else if (typeof value === "string") {
      taxonomyCounts[value] = (taxonomyCounts[value] ?? 0) + 1;
    } else if (Array.isArray(value)) {
      value.forEach((entry) => {
        const label = `${entry}`;
        taxonomyCounts[label] = (taxonomyCounts[label] ?? 0) + 1;
      });
    }
  });

  return {
    orderErrors,
    substitutions,
    repetitions,
    prematureResponses,
    expectedLength: expected.length,
    observedLength: observed.length,
    taxonomy: taxonomyCounts,
  };
}

export function separatePracticeTrials<T extends TrialRecord>(trials: readonly T[]): PracticeSplit<T> & {
  practiceTrials: T[];
  scoredTrials: T[];
} {
  return {
    practice: trials.filter((trial) => isPracticeTrial(trial)),
    scored: trials.filter((trial) => !isPracticeTrial(trial)),
    practiceTrials: trials.filter((trial) => isPracticeTrial(trial)),
    scoredTrials: trials.filter((trial) => !isPracticeTrial(trial)),
  };
}

export function scoreSpanTask(
  trials: readonly TrialRecord[],
  options: SpanTaskOptions = {},
): SpanTaskSummary {
  const includePractice = options.includePractice ?? false;
  const scopedTrials = includePractice ? trials : trials.filter((trial) => !isPracticeTrial(trial));
  const correctTrials = scopedTrials.filter((trial) => isSequenceCorrect(trial));
  const spanLevels = [...new Set(scopedTrials.map((trial) => trial.spanLevel).filter(isFiniteNumber))];
  const sequenceLengths = [...new Set(scopedTrials.map((trial) => trial.sequenceLength ?? getExpectedSequence(trial).length).filter(isFiniteNumber))];
  const accuracyBySpanLevel = Object.fromEntries(
    spanLevels.map((spanLevel) => {
      const levelTrials = scopedTrials.filter((trial) => trial.spanLevel === spanLevel);
      return [String(spanLevel), levelTrials.length ? levelTrials.filter((trial) => isSequenceCorrect(trial)).length / levelTrials.length : 0];
    }),
  );
  const accuracyBySequenceLength = Object.fromEntries(
    sequenceLengths.map((length) => {
      const lengthTrials = scopedTrials.filter((trial) => (trial.sequenceLength ?? getExpectedSequence(trial).length) === length);
      return [String(length), lengthTrials.length ? lengthTrials.filter((trial) => isSequenceCorrect(trial)).length / lengthTrials.length : 0];
    }),
  );

  const firstResponseLatencies = filterNumbers(scopedTrials.map((trial) => trial.latencyMs));
  const sequenceDurations = filterNumbers(scopedTrials.map((trial) => trial.durationMs));
  const interResponseIntervals = filterNumbers(
    scopedTrials.map((trial) => {
      const responses = trial.responses ?? getObservedSequence(trial);
      if (responses.length < 2 || !isFiniteNumber(trial.durationMs)) {
        return null;
      }
      return trial.durationMs / (responses.length - 1);
    }),
  );

  const directionSelector = options.directionSelector ?? getDirectionLabel;
  const directionSummaries = buildSpanGroupSummary(scopedTrials, directionSelector);
  const phaseSummaries = buildSpanGroupSummary(scopedTrials, options.phaseSelector ?? ((trial) => getPhaseLabel(trial, {})));
  const practiceSummary = trials.some((trial) => isPracticeTrial(trial))
    ? summarizeSpanDirection("practice", trials.filter((trial) => isPracticeTrial(trial)))
    : null;
  const scoredSummary = scopedTrials.length ? summarizeSpanDirection("scored", scopedTrials) : null;

  const errors = scopedTrials.map((trial) =>
    classifySequenceErrors(getExpectedSequence(trial), getObservedSequence(trial), trial.errorTaxonomy),
  );
  const errorBreakdown = errors.reduce<SpanTaskSummary["errorBreakdown"]>(
    (accumulator, error, index) => {
      accumulator.orderErrors += error.orderErrors;
      accumulator.substitutions += error.substitutions;
      accumulator.repetitions += error.repetitions;
      accumulator.prematureResponses += error.prematureResponses;
      accumulator.expectedLength += error.expectedLength;
      accumulator.observedLength += error.observedLength;
      Object.entries(error.taxonomy ?? countTaxonomy(scopedTrials[index]!)).forEach(([key, value]) => {
        accumulator.taxonomy[key] = (accumulator.taxonomy[key] ?? 0) + value;
      });
      return accumulator;
    },
    {
      orderErrors: 0,
      substitutions: 0,
      repetitions: 0,
      prematureResponses: 0,
      expectedLength: 0,
      observedLength: 0,
      taxonomy: {},
    },
  );

  const forwardSummary = directionSummaries?.forward;
  const backwardSummary = directionSummaries?.backward;
  const forwardBackwardContrast = forwardSummary && backwardSummary
    ? computeConditionContrast(backwardSummary.meanSpan, forwardSummary.meanSpan, {
      leftLabel: "backward",
      rightLabel: "forward",
      metric: "meanCorrectSpan",
      contrastType: "forward-backward-span-difference",
    })
    : null;
  const forwardLatencies = filterNumbers(correctTrials.filter((trial) => directionSelector(trial) === "forward").map((trial) => getTrialLatency(trial)));
  const backwardLatencies = filterNumbers(correctTrials.filter((trial) => directionSelector(trial) === "backward").map((trial) => getTrialLatency(trial)));

  return {
    summaryType: "span-task",
    schemaVersion: BEHAVIORAL_SCHEMA_VERSION,
    taskFamily: "span-task",
    practiceIncluded: includePractice,
    counts: {
      total: scopedTrials.length,
      correct: correctTrials.length,
      incorrect: scopedTrials.length - correctTrials.length,
    },
    timing: {
      firstResponseLatencyMeanMs: firstResponseLatencies.length ? mean(firstResponseLatencies) : null,
      interResponseIntervalMeanMs: interResponseIntervals.length ? mean(interResponseIntervals) : null,
      totalSequenceResponseTimeMeanMs: sequenceDurations.length ? mean(sequenceDurations) : null,
    },
    timingSummaries: {
      firstResponseLatency: summarizeLatencyValues(firstResponseLatencies),
      interResponseInterval: summarizeLatencyValues(interResponseIntervals),
      totalSequenceResponseTime: summarizeLatencyValues(sequenceDurations),
    },
    phaseSummaries,
    directionSummaries,
    totalTrials: scopedTrials.length,
    totalCorrectTrials: correctTrials.length,
    longestSpan: Math.max(0, ...correctTrials.map((trial) => trial.spanLevel ?? trial.sequenceLength ?? getExpectedSequence(trial).length)),
    accuracyBySpanLevel,
    accuracyBySequenceLength,
    firstResponseLatencyMean: firstResponseLatencies.length ? mean(firstResponseLatencies) : null,
    interResponseIntervalMean: interResponseIntervals.length ? mean(interResponseIntervals) : null,
    totalSequenceResponseTimeMean: sequenceDurations.length ? mean(sequenceDurations) : null,
    forwardBackwardDelta:
      forwardSummary?.meanSpan !== null && backwardSummary?.meanSpan !== null
        ? (backwardSummary?.meanSpan ?? 0) - (forwardSummary?.meanSpan ?? 0)
        : null,
    forwardBackwardContrast,
    manipulationCost: computeMeanDifference(backwardLatencies, forwardLatencies),
    errors,
    errorBreakdown,
    practiceSummary,
    scoredSummary,
  };
}

export function summarizeRecognitionMemory(
  trials: readonly TrialRecord[],
  options: ReactionTimeOptions = {},
): RecognitionMemorySummary {
  const scopedTrials = options.includePractice ? trials : trials.filter((trial) => !isPracticeTrial(trial));
  const classified = scopedTrials.map((trial) => {
    const actualOld = Boolean(trial.wasPreviouslySeen);
    const observedResponse = getObservedResponse(trial);
    const respondedOld = observedResponse === true || observedResponse === "old" || observedResponse === "seen";
    return {
      trial,
      actualOld,
      respondedOld,
      hit: actualOld && respondedOld,
      falseAlarm: !actualOld && respondedOld,
      miss: actualOld && !respondedOld,
      correctRejection: !actualOld && !respondedOld,
    };
  });
  const oldTrials = classified.filter((trial) => trial.actualOld);
  const newTrials = classified.filter((trial) => !trial.actualOld);
  const hitRate = oldTrials.length ? classified.filter((trial) => trial.hit).length / oldTrials.length : 0;
  const falseAlarmRate = newTrials.length ? classified.filter((trial) => trial.falseAlarm).length / newTrials.length : 0;
  const phaseGroups = new Map<string, typeof classified>();
  classified.forEach((trial) => {
    const key = trial.trial.phase;
    if (!key) {
      return;
    }
    phaseGroups.set(key, [...(phaseGroups.get(key) ?? []), trial]);
  });
  const phaseSummaries = phaseGroups.size
    ? Object.fromEntries(
      [...phaseGroups.entries()].map(([key, phaseTrials]) => [
        key,
        {
          label: key,
          schemaVersion: BEHAVIORAL_SCHEMA_VERSION,
          taskFamily: "recognition-memory",
          counts: {
            total: phaseTrials.length,
            valid: phaseTrials.length,
            invalid: 0,
            correct: phaseTrials.filter((trial) => trial.hit || trial.correctRejection).length,
            incorrect: phaseTrials.filter((trial) => trial.miss || trial.falseAlarm).length,
            omissions: 0,
            anticipations: 0,
            lapses: 0,
          },
          rates: {
            accuracy: phaseTrials.length ? phaseTrials.filter((trial) => trial.hit || trial.correctRejection).length / phaseTrials.length : 0,
            error: phaseTrials.length ? phaseTrials.filter((trial) => trial.miss || trial.falseAlarm).length / phaseTrials.length : 0,
            omission: 0,
            anticipation: 0,
          },
          timing: summarizeLatencyValues(filterNumbers(phaseTrials.map((trial) => getTrialLatency(trial.trial)))),
        },
      ]),
    )
    : undefined;
  const immediateSummary = phaseSummaries?.immediate;
  const delayedSummary = phaseSummaries?.delayed;
  return {
    summaryType: "recognition-memory",
    schemaVersion: BEHAVIORAL_SCHEMA_VERSION,
    taskFamily: "recognition-memory",
    counts: {
      total: scopedTrials.length,
      hits: classified.filter((trial) => trial.hit).length,
      falseAlarms: classified.filter((trial) => trial.falseAlarm).length,
      misses: classified.filter((trial) => trial.miss).length,
      correctRejections: classified.filter((trial) => trial.correctRejection).length,
    },
    rates: {
      accuracy: scopedTrials.length ? classified.filter((trial) => trial.hit || trial.correctRejection).length / scopedTrials.length : 0,
      hitRate,
      falseAlarmRate,
      correctedRecognition: hitRate - falseAlarmRate,
    },
    timing: summarizeLatencyValues(filterNumbers(scopedTrials.map((trial) => getTrialLatency(trial)))),
    conditionSummaries: phaseSummaries,
    learningCurve: undefined,
    contrasts: immediateSummary && delayedSummary ? [
      computeConditionContrast(delayedSummary.rates.accuracy, immediateSummary.rates.accuracy, {
        leftLabel: "delayed",
        rightLabel: "immediate",
        metric: "accuracy",
        contrastType: "delayed-memory-change",
      }),
    ] : [],
    qualityFlags: [],
    hitRate,
    falseAlarmRate,
    correctedRecognition: hitRate - falseAlarmRate,
    delayedChange: immediateSummary && delayedSummary ? delayedSummary.rates.accuracy - immediateSummary.rates.accuracy : null,
  };
}

export function summarizePairedAssociates(
  trials: readonly TrialRecord[],
  options: ReactionTimeOptions = {},
): PairedAssociatesSummary {
  const scopedTrials = options.includePractice ? trials : trials.filter((trial) => !isPracticeTrial(trial));
  const correct = scopedTrials.filter((trial) => trial.isCorrect).length;
  const byBlock = buildSummaryMap(scopedTrials, (trial) => getBlockLabel(trial, options), options, "paired-associates");
  const orderedBlocks = Object.keys(byBlock ?? {});
  const firstBlock = orderedBlocks.length ? byBlock?.[orderedBlocks[0]] : undefined;
  const lastBlock = orderedBlocks.length ? byBlock?.[orderedBlocks[orderedBlocks.length - 1]] : undefined;
  return {
    summaryType: "paired-associates",
    schemaVersion: BEHAVIORAL_SCHEMA_VERSION,
    taskFamily: "paired-associates",
    counts: {
      total: scopedTrials.length,
      correct,
      incorrect: scopedTrials.length - correct,
    },
    rates: {
      accuracy: scopedTrials.length ? correct / scopedTrials.length : 0,
    },
    timing: summarizeLatencyValues(filterNumbers(scopedTrials.map((trial) => getTrialLatency(trial)))),
    conditionSummaries: byBlock,
    learningCurve: byBlock ? Object.fromEntries(Object.entries(byBlock).map(([key, summary]) => [key, summary.rates.accuracy])) : undefined,
    contrasts: [],
    qualityFlags: [],
    totalCorrect: correct,
    learningGain: firstBlock && lastBlock ? lastBlock.rates.accuracy - firstBlock.rates.accuracy : null,
  };
}

export function summarizeProcessingSpeed(
  trials: readonly TrialRecord[],
  options: ProcessingSpeedOptions = {},
): ProcessingSpeedSummary {
  const attempted = trials.filter((trial) => getObservedResponse(trial) !== undefined || trial.isCorrect !== undefined);
  const totalCorrect = trials.filter((trial) => trial.isCorrect).length;
  const durationMinutes = options.durationMinutes ?? (() => {
    const durations = filterNumbers(trials.map((trial) => trial.durationMs));
    return durations.length ? mean(durations) / 60000 : null;
  })();
  const selector = options.timeWindowSelector ?? ((trial: TrialRecord) => trial.blockId);
  const grouped = groupTrials(trials, selector);
  const blockSummaries = grouped.size
    ? Object.fromEntries([...grouped.entries()].map(([key, groupedTrials]) => {
      const correct = groupedTrials.filter((trial) => trial.isCorrect).length;
      const attemptedCount = groupedTrials.filter((trial) => getObservedResponse(trial) !== undefined || trial.isCorrect !== undefined).length;
      const duration = filterNumbers(groupedTrials.map((trial) => trial.durationMs));
      const durationMinutesForBlock = duration.length ? mean(duration) / 60000 : null;
      return [key, {
        counts: {
          total: groupedTrials.length,
          attempted: attemptedCount,
          correct,
          incorrect: attemptedCount - correct,
        },
        rates: {
          accuracy: attemptedCount ? correct / attemptedCount : 0,
        },
        throughputPerMinute: durationMinutesForBlock ? correct / durationMinutesForBlock : undefined,
      }];
    }))
    : undefined;

  return {
    summaryType: "processing-speed",
    counts: {
      totalAttempted: attempted.length,
      totalCorrect,
      totalIncorrect: attempted.length - totalCorrect,
    },
    rates: {
      accuracy: attempted.length ? totalCorrect / attempted.length : 0,
      throughputPerMinute: durationMinutes ? totalCorrect / durationMinutes : 0,
    },
    timing: {
      durationMinutes,
    },
    blockSummaries,
    qualityFlags: [],
  };
}

export function summarizeLatency(values: readonly number[]): {
  mean: number;
  median: number;
  standardDeviation: number;
} {
  const numbers = ensureFiniteNumbers(values);
  return {
    mean: mean(numbers),
    median: median(numbers),
    standardDeviation: standardDeviation(numbers),
  };
}
