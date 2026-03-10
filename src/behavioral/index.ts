import type {
  ConditionContrastResult,
  ConditionSummary,
  InhibitionTaskSummary,
  LatencySummary,
  MemoryTaskSummary,
  PracticeSplit,
  ProcessingSpeedSummary,
  QualityFlag,
  TrialRecord,
} from "../schemas";
import { ensureFiniteNumbers } from "../core/math";
import { mean, median, standardDeviation } from "../core/stats";

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
}

export interface ContrastOptions {
  leftLabel: string;
  rightLabel: string;
  metric: string;
  standardizer?: number | null;
}

export interface GoNoGoSummary extends InhibitionTaskSummary {
  summaryType: "go-no-go";
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
  congruentSummary?: ConditionSummary;
  incongruentSummary?: ConditionSummary;
  switchSummary?: ConditionSummary;
  repeatSummary?: ConditionSummary;
  interferenceEffectMs?: number | null;
  switchingCostMs?: number | null;
  mixingCostMs?: number | null;
  cueingBenefitMs?: number | null;
}

export interface SequenceErrorSummary<T = string | number> {
  orderErrors: number;
  substitutions: number;
  repetitions: number;
  prematureResponses: number;
  expectedLength: number;
  observedLength: number;
}

export interface SpanTaskSummary {
  summaryType: "span-task";
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
  totalTrials: number;
  totalCorrectTrials: number;
  longestSpan: number;
  accuracyBySpanLevel: Record<string, number>;
  accuracyBySequenceLength: Record<string, number>;
  firstResponseLatencyMean: number | null;
  interResponseIntervalMean: number | null;
  totalSequenceResponseTimeMean: number | null;
  forwardBackwardDelta: number | null;
  manipulationCost: number | null;
  errors: SequenceErrorSummary[];
}

export interface RecognitionMemorySummary extends MemoryTaskSummary {
  summaryType: "recognition-memory";
  hitRate: number;
  falseAlarmRate: number;
  correctedRecognition: number;
  delayedChange?: number | null;
}

export interface PairedAssociatesSummary extends MemoryTaskSummary {
  summaryType: "paired-associates";
  totalCorrect: number;
  learningGain: number | null;
}

export interface ProcessingSpeedOptions {
  durationMinutes?: number;
  timeWindowSelector?: (trial: TrialRecord) => string | undefined;
}

function getTrialLatency(trial: TrialRecord): number | null {
  const latency = trial.reactionTimeMs ?? trial.latencyMs ?? null;
  return typeof latency === "number" && Number.isFinite(latency) ? latency : null;
}

function summarizeLatencyValues(values: readonly number[]): LatencySummary {
  const filtered = values.filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  if (!filtered.length) {
    return {
      meanMs: null,
      medianMs: null,
      standardDeviationMs: null,
      coefficientOfVariation: null,
    };
  }

  const average = mean(filtered);
  const sd = filtered.length > 1 ? standardDeviation(filtered) : 0;
  return {
    meanMs: average,
    medianMs: median(filtered),
    standardDeviationMs: filtered.length > 1 ? sd : 0,
    coefficientOfVariation: average ? sd / average : null,
  };
}

function makeConditionSummary(
  label: string,
  trials: readonly TrialRecord[],
  options: ReactionTimeOptions = {},
): ConditionSummary {
  const classified = trials.map((trial) => ({ trial, classification: classifyReactionTimeTrial(trial, options) }));
  const validTrials = classified.filter(({ classification }) => classification.isValid);
  const correctValidRts = validTrials
    .filter(({ classification }) => classification.isCorrect)
    .map(({ trial }) => getTrialLatency(trial))
    .filter((value): value is number => value !== null);
  const incorrectTrials = classified.filter(({ classification }) => !classification.isCorrect && !classification.isOmission);
  const omissions = classified.filter(({ classification }) => classification.isOmission);
  const anticipations = classified.filter(({ classification }) => classification.isAnticipation);
  const lapses = classified.filter(({ classification }) => classification.isLapse);

  return {
    label,
    counts: {
      total: trials.length,
      valid: validTrials.length,
      invalid: trials.length - validTrials.length,
      correct: classified.filter(({ classification }) => classification.isCorrect).length,
      incorrect: incorrectTrials.length,
      omissions: omissions.length,
      anticipations: anticipations.length,
      lapses: lapses.length,
    },
    rates: {
      accuracy: trials.length ? classified.filter(({ classification }) => classification.isCorrect).length / trials.length : 0,
      error: trials.length ? incorrectTrials.length / trials.length : 0,
      omission: trials.length ? omissions.length / trials.length : 0,
      anticipation: trials.length ? anticipations.length / trials.length : 0,
    },
    timing: summarizeLatencyValues(correctValidRts),
  };
}

function buildSummaryMap(
  trials: readonly TrialRecord[],
  selector: (trial: TrialRecord) => string | undefined,
  options: ReactionTimeOptions = {},
): Record<string, ConditionSummary> | undefined {
  const grouped = new Map<string, TrialRecord[]>();
  trials.forEach((trial) => {
    const key = selector(trial);
    if (!key) {
      return;
    }
    grouped.set(key, [...(grouped.get(key) ?? []), trial]);
  });

  if (!grouped.size) {
    return undefined;
  }

  return Object.fromEntries(
    [...grouped.entries()].map(([key, groupedTrials]) => [key, makeConditionSummary(key, groupedTrials, options)]),
  );
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
  const isOmission = trial.isOmission ?? rt === null;
  const isAnticipation = trial.isAnticipation ?? (!isOmission && rt !== null && rt < anticipationThreshold);
  const isLapse = !isOmission && rt !== null && rt > lapseThreshold;
  const isTimeout = Boolean(trial.isTimeout);
  const isInvalid = Boolean(trial.isInvalid) || isTimeout;
  const isCorrect = trial.isCorrect ?? (trial.expectedResponse !== undefined && trial.response === trial.expectedResponse);
  const isValid = !trial.isPractice && !isOmission && !isAnticipation && !isInvalid;
  return {
    isPractice: Boolean(trial.isPractice),
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
  return buildSummaryMap(options.includePractice ? trials : trials.filter((trial) => !trial.isPractice), selector, options);
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
  const correctTrials = classified.filter(({ classification }) => classification.isCorrect);
  const incorrectTrials = classified.filter(({ classification }) => !classification.isCorrect && !classification.isOmission);
  const omissions = classified.filter(({ classification }) => classification.isOmission);
  const anticipations = classified.filter(({ classification }) => classification.isAnticipation);
  const lapses = classified.filter(({ classification }) => classification.isLapse);
  const correctValidRts = validTrials
    .filter(({ classification }) => classification.isCorrect)
    .map(({ trial }) => getTrialLatency(trial))
    .filter((value): value is number => value !== null);
  const earlyLabel = options.blockLabels?.early ?? "early";
  const lateLabel = options.blockLabels?.late ?? "late";
  const early = validTrials.filter(({ trial }) => (trial.blockId ?? earlyLabel) === earlyLabel).map(({ trial }) => getTrialLatency(trial) ?? 0);
  const late = validTrials.filter(({ trial }) => (trial.blockId ?? lateLabel) === lateLabel).map(({ trial }) => getTrialLatency(trial) ?? 0);
  const left = validTrials.filter(({ trial }) => (trial.labels?.responseSide ?? trial.stimulusSide) === "left").map(({ trial }) => getTrialLatency(trial) ?? 0);
  const right = validTrials.filter(({ trial }) => (trial.labels?.responseSide ?? trial.stimulusSide) === "right").map(({ trial }) => getTrialLatency(trial) ?? 0);
  const omissionRate = scoredTrials.length ? omissions.length / scoredTrials.length : 0;
  const anticipationRate = scoredTrials.length ? anticipations.length / scoredTrials.length : 0;
  const errorRate = scoredTrials.length ? incorrectTrials.length / scoredTrials.length : 0;
  const accuracy = scoredTrials.length ? correctTrials.length / scoredTrials.length : 0;
  const baseTiming = summarizeLatencyValues(correctValidRts);
  const timing = {
    ...baseTiming,
    medianCorrectRtMs: baseTiming.medianMs ?? null,
    meanCorrectRtMs: baseTiming.meanMs,
    rtSdMs: baseTiming.standardDeviationMs ?? null,
  };
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

  const halfPoint = Math.ceil(scoredTrials.length / 2);
  const earlyHalfTrials = scoredTrials.slice(0, halfPoint);
  const lateHalfTrials = scoredTrials.slice(halfPoint);

  return {
    summaryType: "reaction-time",
    practiceIncluded: includePractice,
    counts: {
      total: scoredTrials.length,
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
      earlyLateDifferenceMs: early.length && late.length ? mean(late) - mean(early) : null,
      leftRightAsymmetryMs: left.length && right.length ? mean(right) - mean(left) : null,
    },
    conditionSummaries: buildSummaryMap(scoredTrials, (trial) => options.conditionSelector?.(trial) ?? trial.labels?.condition ?? trial.metadata?.condition?.toString(), options),
    blockSummaries: buildSummaryMap(scoredTrials, (trial) => trial.blockId, options),
    phaseSummaries: buildSummaryMap(scoredTrials, (trial) => trial.phase, options),
    halfSummaries: {
      early: earlyHalfTrials.length ? makeConditionSummary("early-half", earlyHalfTrials, options) : null,
      late: lateHalfTrials.length ? makeConditionSummary("late-half", lateHalfTrials, options) : null,
    },
    practiceSummary: trials.some((trial) => trial.isPractice) ? makeConditionSummary("practice", trials.filter((trial) => trial.isPractice), { ...options, includePractice: true }) : null,
    scoredSummary: scoredTrials.length ? makeConditionSummary("scored", scoredTrials, options) : null,
    totalTrials: scoredTrials.length,
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
    earlyLateDifferenceMs: early.length && late.length ? mean(late) - mean(early) : null,
    leftRightAsymmetryMs: left.length && right.length ? mean(right) - mean(left) : null,
    qualityFlags,
  };
}

export function summarizeGoNoGo(
  trials: readonly TrialRecord[],
  options: ReactionTimeOptions = {},
): GoNoGoSummary {
  const scopedTrials = options.includePractice ? trials : trials.filter((trial) => !trial.isPractice);
  const goTrials = scopedTrials.filter((trial) => (trial.labels?.goNoGoType ?? trial.metadata?.goNoGoType) === "go");
  const noGoTrials = scopedTrials.filter((trial) => (trial.labels?.goNoGoType ?? trial.metadata?.goNoGoType) === "no-go");
  const stopTrials = scopedTrials.filter((trial) => (trial.labels?.stopSignalType ?? trial.metadata?.stopSignalType) === "stop");
  const goSummary = goTrials.length ? makeConditionSummary("go", goTrials, options) : undefined;
  const noGoSummary = noGoTrials.length ? makeConditionSummary("no-go", noGoTrials, options) : undefined;
  const stopSummary = stopTrials.length ? makeConditionSummary("stop", stopTrials, options) : undefined;
  const commissionErrors = noGoTrials.filter((trial) => trial.response !== null && trial.response !== undefined && !trial.isCorrect).length;
  const omissionErrors = goTrials.filter((trial) => classifyReactionTimeTrial(trial, options).isOmission).length;
  const latencyValues = [...goTrials, ...noGoTrials].map((trial) => getTrialLatency(trial)).filter((value): value is number => value !== null);
  const rates = {
    accuracy: scopedTrials.length ? scopedTrials.filter((trial) => classifyReactionTimeTrial(trial, options).isCorrect).length / scopedTrials.length : 0,
    error: scopedTrials.length ? scopedTrials.filter((trial) => !classifyReactionTimeTrial(trial, options).isCorrect).length / scopedTrials.length : 0,
    omission: scopedTrials.length ? scopedTrials.filter((trial) => classifyReactionTimeTrial(trial, options).isOmission).length / scopedTrials.length : 0,
    anticipation: scopedTrials.length ? scopedTrials.filter((trial) => classifyReactionTimeTrial(trial, options).isAnticipation).length / scopedTrials.length : 0,
    commissionError: noGoTrials.length ? commissionErrors / noGoTrials.length : 0,
  };
  const contrasts: ConditionContrastResult[] = [];
  if (goSummary && noGoSummary) {
    contrasts.push(computeConditionContrast(goSummary.rates.accuracy, noGoSummary.rates.accuracy, {
      leftLabel: "go",
      rightLabel: "no-go",
      metric: "accuracy",
    }));
  }

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
    timing: summarizeLatencyValues(latencyValues),
    conditionSummaries: {
      ...(goSummary ? { go: goSummary } : {}),
      ...(noGoSummary ? { "no-go": noGoSummary } : {}),
      ...(stopSummary ? { stop: stopSummary } : {}),
    },
    contrasts,
    qualityFlags,
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
  const scopedTrials = options.includePractice ? trials : trials.filter((trial) => !trial.isPractice);
  const congruentTrials = scopedTrials.filter((trial) => trial.labels?.congruency === "congruent");
  const incongruentTrials = scopedTrials.filter((trial) => trial.labels?.congruency === "incongruent");
  const switchTrials = scopedTrials.filter((trial) => trial.labels?.switchType === "switch");
  const repeatTrials = scopedTrials.filter((trial) => trial.labels?.switchType === "repeat");
  const validCueTrials = scopedTrials.filter((trial) => trial.labels?.cueValidity === "valid");
  const invalidCueTrials = scopedTrials.filter((trial) => trial.labels?.cueValidity === "invalid");
  const congruentSummary = congruentTrials.length ? makeConditionSummary("congruent", congruentTrials, options) : undefined;
  const incongruentSummary = incongruentTrials.length ? makeConditionSummary("incongruent", incongruentTrials, options) : undefined;
  const switchSummary = switchTrials.length ? makeConditionSummary("switch", switchTrials, options) : undefined;
  const repeatSummary = repeatTrials.length ? makeConditionSummary("repeat", repeatTrials, options) : undefined;
  const validCueSummary = validCueTrials.length ? makeConditionSummary("valid-cue", validCueTrials, options) : undefined;
  const invalidCueSummary = invalidCueTrials.length ? makeConditionSummary("invalid-cue", invalidCueTrials, options) : undefined;
  const validLatencyValues = scopedTrials.map((trial) => getTrialLatency(trial)).filter((value): value is number => value !== null);
  const timing = summarizeLatencyValues(validLatencyValues);
  const contrasts: ConditionContrastResult[] = [];
  if (congruentSummary && incongruentSummary) {
    contrasts.push(computeConditionContrast(incongruentSummary.timing.meanMs, congruentSummary.timing.meanMs, {
      leftLabel: "incongruent",
      rightLabel: "congruent",
      metric: "meanCorrectRtMs",
      standardizer: timing.standardDeviationMs,
    }));
  }
  if (switchSummary && repeatSummary) {
    contrasts.push(computeConditionContrast(switchSummary.timing.meanMs, repeatSummary.timing.meanMs, {
      leftLabel: "switch",
      rightLabel: "repeat",
      metric: "meanCorrectRtMs",
      standardizer: timing.standardDeviationMs,
    }));
  }
  if (validCueSummary && invalidCueSummary) {
    contrasts.push(computeConditionContrast(invalidCueSummary.timing.meanMs, validCueSummary.timing.meanMs, {
      leftLabel: "invalid-cue",
      rightLabel: "valid-cue",
      metric: "meanCorrectRtMs",
      standardizer: timing.standardDeviationMs,
    }));
  }

  return {
    summaryType: "interference-task",
    counts: {
      total: scopedTrials.length,
      valid: scopedTrials.filter((trial) => classifyReactionTimeTrial(trial, options).isValid).length,
      invalid: scopedTrials.filter((trial) => !classifyReactionTimeTrial(trial, options).isValid).length,
      correct: scopedTrials.filter((trial) => classifyReactionTimeTrial(trial, options).isCorrect).length,
      incorrect: scopedTrials.filter((trial) => !classifyReactionTimeTrial(trial, options).isCorrect).length,
      omissions: scopedTrials.filter((trial) => classifyReactionTimeTrial(trial, options).isOmission).length,
      anticipations: scopedTrials.filter((trial) => classifyReactionTimeTrial(trial, options).isAnticipation).length,
    },
    rates: {
      accuracy: scopedTrials.length ? scopedTrials.filter((trial) => classifyReactionTimeTrial(trial, options).isCorrect).length / scopedTrials.length : 0,
      error: scopedTrials.length ? scopedTrials.filter((trial) => !classifyReactionTimeTrial(trial, options).isCorrect).length / scopedTrials.length : 0,
      omission: scopedTrials.length ? scopedTrials.filter((trial) => classifyReactionTimeTrial(trial, options).isOmission).length / scopedTrials.length : 0,
      anticipation: scopedTrials.length ? scopedTrials.filter((trial) => classifyReactionTimeTrial(trial, options).isAnticipation).length / scopedTrials.length : 0,
    },
    timing,
    conditionSummaries: {
      ...(congruentSummary ? { congruent: congruentSummary } : {}),
      ...(incongruentSummary ? { incongruent: incongruentSummary } : {}),
      ...(switchSummary ? { switch: switchSummary } : {}),
      ...(repeatSummary ? { repeat: repeatSummary } : {}),
      ...(validCueSummary ? { "valid-cue": validCueSummary } : {}),
      ...(invalidCueSummary ? { "invalid-cue": invalidCueSummary } : {}),
    },
    contrasts,
    qualityFlags: [],
    congruentSummary,
    incongruentSummary,
    switchSummary,
    repeatSummary,
    interferenceEffectMs: contrasts.find((contrast) => contrast.leftLabel === "incongruent")?.rawDifference ?? null,
    switchingCostMs: contrasts.find((contrast) => contrast.leftLabel === "switch")?.rawDifference ?? null,
    mixingCostMs: null,
    cueingBenefitMs: contrasts.find((contrast) => contrast.leftLabel === "invalid-cue")?.rawDifference ?? null,
  };
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

export function separatePracticeTrials<T extends TrialRecord>(trials: readonly T[]): PracticeSplit<T> & {
  practiceTrials: T[];
  scoredTrials: T[];
} {
  return {
    practice: trials.filter((trial) => trial.isPractice),
    scored: trials.filter((trial) => !trial.isPractice),
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
    trial.isCorrect ?? JSON.stringify(trial.expectedSequence ?? trial.presentedSequence ?? []) === JSON.stringify(trial.responseSequence ?? trial.recalledSequence ?? []),
  );
  const spanLevels = [...new Set(scopedTrials.map((trial) => trial.spanLevel).filter((value): value is number => typeof value === "number"))];
  const sequenceLengths = [...new Set(scopedTrials.map((trial) => trial.sequenceLength ?? trial.expectedSequence?.length ?? trial.presentedSequence?.length).filter((value): value is number => typeof value === "number"))];
  const accuracyBySpanLevel = Object.fromEntries(
    spanLevels.map((spanLevel) => {
      const levelTrials = scopedTrials.filter((trial) => trial.spanLevel === spanLevel);
      const levelCorrect = levelTrials.filter((trial) =>
        trial.isCorrect ?? JSON.stringify(trial.expectedSequence ?? trial.presentedSequence ?? []) === JSON.stringify(trial.responseSequence ?? trial.recalledSequence ?? []),
      );
      return [String(spanLevel), levelTrials.length ? levelCorrect.length / levelTrials.length : 0];
    }),
  );
  const accuracyBySequenceLength = Object.fromEntries(
    sequenceLengths.map((length) => {
      const levelTrials = scopedTrials.filter((trial) => (trial.sequenceLength ?? trial.expectedSequence?.length ?? trial.presentedSequence?.length) === length);
      const levelCorrect = levelTrials.filter((trial) =>
        trial.isCorrect ?? JSON.stringify(trial.expectedSequence ?? trial.presentedSequence ?? []) === JSON.stringify(trial.responseSequence ?? trial.recalledSequence ?? []),
      );
      return [String(length), levelTrials.length ? levelCorrect.length / levelTrials.length : 0];
    }),
  );

  const latencies = scopedTrials.map((trial) => trial.latencyMs).filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  const durations = scopedTrials.map((trial) => trial.durationMs).filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  const interResponseIntervals = scopedTrials
    .map((trial) => {
      const responses = trial.responses ?? trial.recalledSequence ?? [];
      if (responses.length < 2 || !trial.durationMs) {
        return null;
      }
      return trial.durationMs / (responses.length - 1);
    })
    .filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  const forward = correctTrials.filter((trial) => `${trial.metadata?.direction ?? "forward"}` === "forward");
  const backward = correctTrials.filter((trial) => `${trial.metadata?.direction ?? "forward"}` === "backward");

  return {
    summaryType: "span-task",
    practiceIncluded: Boolean(options.includePractice),
    counts: {
      total: scopedTrials.length,
      correct: correctTrials.length,
      incorrect: scopedTrials.length - correctTrials.length,
    },
    timing: {
      firstResponseLatencyMeanMs: latencies.length ? mean(latencies) : null,
      interResponseIntervalMeanMs: interResponseIntervals.length ? mean(interResponseIntervals) : null,
      totalSequenceResponseTimeMeanMs: durations.length ? mean(durations) : null,
    },
    totalTrials: scopedTrials.length,
    totalCorrectTrials: correctTrials.length,
    longestSpan: Math.max(0, ...correctTrials.map((trial) => trial.spanLevel ?? trial.sequenceLength ?? 0)),
    accuracyBySpanLevel,
    accuracyBySequenceLength,
    firstResponseLatencyMean: latencies.length ? mean(latencies) : null,
    interResponseIntervalMean: interResponseIntervals.length ? mean(interResponseIntervals) : null,
    totalSequenceResponseTimeMean: durations.length ? mean(durations) : null,
    forwardBackwardDelta: forward.length && backward.length
      ? mean(forward.map((trial) => trial.spanLevel ?? trial.sequenceLength ?? 0)) - mean(backward.map((trial) => trial.spanLevel ?? trial.sequenceLength ?? 0))
      : null,
    manipulationCost: forward.length && backward.length
      ? mean(backward.map((trial) => getTrialLatency(trial) ?? 0)) - mean(forward.map((trial) => getTrialLatency(trial) ?? 0))
      : null,
    errors: scopedTrials.map((trial) =>
      classifySequenceErrors(
        (trial.expectedSequence ?? trial.presentedSequence ?? []) as readonly (string | number)[],
        (trial.responseSequence ?? trial.recalledSequence ?? []) as readonly (string | number)[],
      ),
    ),
  };
}

export function summarizeRecognitionMemory(
  trials: readonly TrialRecord[],
  options: ReactionTimeOptions = {},
): RecognitionMemorySummary {
  const scopedTrials = options.includePractice ? trials : trials.filter((trial) => !trial.isPractice);
  const classified = scopedTrials.map((trial) => {
    const actualOld = Boolean(trial.wasPreviouslySeen);
    const respondedOld = trial.response === true || trial.response === "old" || trial.response === "seen";
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
          timing: summarizeLatencyValues(phaseTrials.map((trial) => getTrialLatency(trial.trial)).filter((value): value is number => value !== null)),
        },
      ]),
    )
    : undefined;
  const immediateSummary = phaseSummaries?.immediate;
  const delayedSummary = phaseSummaries?.delayed;
  return {
    summaryType: "recognition-memory",
    counts: {
      total: scopedTrials.length,
      hits: classified.filter((trial) => trial.hit).length,
      falseAlarms: classified.filter((trial) => trial.falseAlarm).length,
      misses: classified.filter((trial) => trial.miss).length,
      correctRejections: classified.filter((trial) => trial.correctRejection).length,
    },
    rates: {
      accuracy: scopedTrials.length ? (classified.filter((trial) => trial.hit || trial.correctRejection).length / scopedTrials.length) : 0,
      hitRate,
      falseAlarmRate,
      correctedRecognition: hitRate - falseAlarmRate,
    },
    timing: summarizeLatencyValues(scopedTrials.map((trial) => getTrialLatency(trial)).filter((value): value is number => value !== null)),
    conditionSummaries: phaseSummaries,
    learningCurve: undefined,
    contrasts: immediateSummary && delayedSummary ? [
      computeConditionContrast(delayedSummary.rates.accuracy, immediateSummary.rates.accuracy, {
        leftLabel: "delayed",
        rightLabel: "immediate",
        metric: "accuracy",
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
  const scopedTrials = options.includePractice ? trials : trials.filter((trial) => !trial.isPractice);
  const correct = scopedTrials.filter((trial) => trial.isCorrect).length;
  const byBlock = buildSummaryMap(scopedTrials, (trial) => trial.blockId, options);
  const orderedBlocks = Object.keys(byBlock ?? {});
  const firstBlock = orderedBlocks.length ? byBlock?.[orderedBlocks[0]] : undefined;
  const lastBlock = orderedBlocks.length ? byBlock?.[orderedBlocks[orderedBlocks.length - 1]] : undefined;
  return {
    summaryType: "paired-associates",
    counts: {
      total: scopedTrials.length,
      correct,
      incorrect: scopedTrials.length - correct,
    },
    rates: {
      accuracy: scopedTrials.length ? correct / scopedTrials.length : 0,
    },
    timing: summarizeLatencyValues(scopedTrials.map((trial) => getTrialLatency(trial)).filter((value): value is number => value !== null)),
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
  const attempted = trials.filter((trial) => trial.response !== null && trial.response !== undefined || trial.isCorrect !== undefined);
  const totalCorrect = trials.filter((trial) => trial.isCorrect).length;
  const durationMinutes = options.durationMinutes ?? (() => {
    const durations = trials.map((trial) => trial.durationMs).filter((value): value is number => typeof value === "number" && Number.isFinite(value));
    return durations.length ? mean(durations) / 60000 : null;
  })();
  const selector = options.timeWindowSelector ?? ((trial: TrialRecord) => trial.blockId);
  const grouped = new Map<string, TrialRecord[]>();
  trials.forEach((trial) => {
    const key = selector(trial);
    if (!key) {
      return;
    }
    grouped.set(key, [...(grouped.get(key) ?? []), trial]);
  });
  const blockSummaries = grouped.size
    ? Object.fromEntries([...grouped.entries()].map(([key, groupedTrials]) => {
      const correct = groupedTrials.filter((trial) => trial.isCorrect).length;
      const attemptedCount = groupedTrials.filter((trial) => trial.response !== null && trial.response !== undefined || trial.isCorrect !== undefined).length;
      const duration = groupedTrials.map((trial) => trial.durationMs).filter((value): value is number => typeof value === "number" && Number.isFinite(value));
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
