import type { QualityFlag, TrialRecord } from "../schemas";
import { ensureFiniteNumbers } from "../core/math";
import { mean, median, standardDeviation } from "../core/stats";

export interface ReactionTimeTrialClassification {
  isPractice: boolean;
  isCorrect: boolean;
  isOmission: boolean;
  isAnticipation: boolean;
  isLapse: boolean;
  isValid: boolean;
}

export interface ReactionTimeSummary {
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
}

export function classifyReactionTimeTrial(
  trial: TrialRecord,
  options: ReactionTimeOptions = {},
): ReactionTimeTrialClassification {
  const anticipationThreshold = options.anticipationThresholdMs ?? 150;
  const lapseThreshold = options.lapseThresholdMs ?? 2000;
  const rt = trial.reactionTimeMs ?? trial.latencyMs ?? null;
  const isOmission = rt === null || rt === undefined || !Number.isFinite(rt);
  const isAnticipation = !isOmission && rt < anticipationThreshold;
  const isLapse = !isOmission && rt > lapseThreshold;
  const isCorrect = trial.isCorrect ?? (trial.expectedResponse !== undefined && trial.response === trial.expectedResponse);
  const isValid = !trial.isPractice && !isOmission && !isAnticipation;
  return {
    isPractice: Boolean(trial.isPractice),
    isCorrect: Boolean(isCorrect),
    isOmission,
    isAnticipation,
    isLapse,
    isValid,
  };
}

export function summarizeReactionTime(
  trials: readonly TrialRecord[],
  options: ReactionTimeOptions = {},
): ReactionTimeSummary {
  const includePractice = options.includePractice ?? false;
  const scoredTrials = trials.filter((trial) => includePractice || !trial.isPractice);
  const classified = scoredTrials.map((trial) => ({ trial, classification: classifyReactionTimeTrial(trial, options) }));
  const validTrials = classified.filter(({ classification }) => classification.isValid);
  const invalidTrials = classified.filter(({ classification }) => !classification.isValid);
  const correctValidRts = validTrials
    .filter(({ classification }) => classification.isCorrect)
    .map(({ trial }) => trial.reactionTimeMs ?? trial.latencyMs)
    .filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  const early = validTrials.filter(({ trial }) => (trial.blockId ?? "early") === "early").map(({ trial }) => trial.reactionTimeMs ?? trial.latencyMs ?? 0);
  const late = validTrials.filter(({ trial }) => (trial.blockId ?? "late") === "late").map(({ trial }) => trial.reactionTimeMs ?? trial.latencyMs ?? 0);
  const left = validTrials.filter(({ trial }) => trial.stimulusSide === "left").map(({ trial }) => trial.reactionTimeMs ?? trial.latencyMs ?? 0);
  const right = validTrials.filter(({ trial }) => trial.stimulusSide === "right").map(({ trial }) => trial.reactionTimeMs ?? trial.latencyMs ?? 0);
  const omissionRate = scoredTrials.length
    ? classified.filter(({ classification }) => classification.isOmission).length / scoredTrials.length
    : 0;
  const anticipationRate = scoredTrials.length
    ? classified.filter(({ classification }) => classification.isAnticipation).length / scoredTrials.length
    : 0;
  const errorRate = scoredTrials.length
    ? classified.filter(({ classification }) => !classification.isCorrect && !classification.isOmission).length / scoredTrials.length
    : 0;
  const accuracy = scoredTrials.length ? classified.filter(({ classification }) => classification.isCorrect).length / scoredTrials.length : 0;
  const averageRt = correctValidRts.length ? mean(correctValidRts) : null;
  const rtSd = correctValidRts.length > 1 ? standardDeviation(correctValidRts) : null;
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
    totalTrials: scoredTrials.length,
    validTrialCount: validTrials.length,
    invalidTrialCount: invalidTrials.length,
    medianCorrectRt: correctValidRts.length ? median(correctValidRts) : null,
    meanCorrectRt: averageRt,
    rtSd,
    coefficientOfVariation: averageRt && rtSd ? rtSd / averageRt : null,
    accuracy,
    errorRate,
    omissionRate,
    anticipationRate,
    earlyLateDifferenceMs: early.length && late.length ? mean(late) - mean(early) : null,
    leftRightAsymmetryMs: left.length && right.length ? mean(right) - mean(left) : null,
    qualityFlags,
  };
}

export interface SequenceErrorSummary<T = string | number> {
  orderErrors: number;
  substitutions: number;
  repetitions: number;
  prematureResponses: number;
  expectedLength: number;
  observedLength: number;
}

export function classifySequenceErrors<T>(
  expected: readonly T[],
  observed: readonly T[],
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

  return {
    orderErrors,
    substitutions,
    repetitions,
    prematureResponses,
    expectedLength: expected.length,
    observedLength: observed.length,
  };
}

export interface SpanTaskSummary {
  totalTrials: number;
  totalCorrectTrials: number;
  longestSpan: number;
  accuracyBySpanLevel: Record<string, number>;
  firstResponseLatencyMean: number | null;
  interResponseIntervalMean: number | null;
  totalSequenceResponseTimeMean: number | null;
  forwardBackwardDelta: number | null;
  errors: SequenceErrorSummary[];
}

export function separatePracticeTrials<T extends TrialRecord>(trials: readonly T[]): {
  practiceTrials: T[];
  scoredTrials: T[];
} {
  return {
    practiceTrials: trials.filter((trial) => trial.isPractice),
    scoredTrials: trials.filter((trial) => !trial.isPractice),
  };
}

export function scoreSpanTask(
  trials: readonly TrialRecord[],
  options: { includePractice?: boolean } = {},
): SpanTaskSummary {
  const scopedTrials = options.includePractice ? trials : trials.filter((trial) => !trial.isPractice);
  const correctTrials = scopedTrials.filter((trial) =>
    trial.isCorrect ?? JSON.stringify(trial.expectedSequence ?? []) === JSON.stringify(trial.responseSequence ?? []),
  );
  const spanLevels = [...new Set(scopedTrials.map((trial) => trial.spanLevel).filter((value): value is number => typeof value === "number"))];
  const accuracyBySpanLevel = Object.fromEntries(
    spanLevels.map((spanLevel) => {
      const levelTrials = scopedTrials.filter((trial) => trial.spanLevel === spanLevel);
      const levelCorrect = levelTrials.filter((trial) =>
        trial.isCorrect ?? JSON.stringify(trial.expectedSequence ?? []) === JSON.stringify(trial.responseSequence ?? []),
      );
      return [String(spanLevel), levelTrials.length ? levelCorrect.length / levelTrials.length : 0];
    }),
  );

  const latencies = scopedTrials
    .map((trial) => trial.latencyMs)
    .filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  const durations = scopedTrials
    .map((trial) => trial.durationMs)
    .filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  const interResponseIntervals = scopedTrials
    .map((trial) => {
      const responses = trial.responses ?? [];
      if (responses.length < 2 || !trial.durationMs) {
        return null;
      }
      return trial.durationMs / (responses.length - 1);
    })
    .filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  const forward = correctTrials.filter((trial) => `${trial.metadata?.direction ?? "forward"}` === "forward");
  const backward = correctTrials.filter((trial) => `${trial.metadata?.direction ?? "forward"}` === "backward");

  return {
    totalTrials: scopedTrials.length,
    totalCorrectTrials: correctTrials.length,
    longestSpan: Math.max(0, ...correctTrials.map((trial) => trial.spanLevel ?? 0)),
    accuracyBySpanLevel,
    firstResponseLatencyMean: latencies.length ? mean(latencies) : null,
    interResponseIntervalMean: interResponseIntervals.length ? mean(interResponseIntervals) : null,
    totalSequenceResponseTimeMean: durations.length ? mean(durations) : null,
    forwardBackwardDelta: forward.length && backward.length
      ? mean(forward.map((trial) => trial.spanLevel ?? 0)) - mean(backward.map((trial) => trial.spanLevel ?? 0))
      : null,
    errors: scopedTrials.map((trial) =>
      classifySequenceErrors(trial.expectedSequence ?? [], trial.responseSequence ?? []),
    ),
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
