import { QualityFlag, TrialRecord } from '../schemas';
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
export declare function classifyReactionTimeTrial(trial: TrialRecord, options?: ReactionTimeOptions): ReactionTimeTrialClassification;
export declare function summarizeReactionTime(trials: readonly TrialRecord[], options?: ReactionTimeOptions): ReactionTimeSummary;
export interface SequenceErrorSummary<T = string | number> {
    orderErrors: number;
    substitutions: number;
    repetitions: number;
    prematureResponses: number;
    expectedLength: number;
    observedLength: number;
}
export declare function classifySequenceErrors<T>(expected: readonly T[], observed: readonly T[]): SequenceErrorSummary<T>;
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
export declare function separatePracticeTrials<T extends TrialRecord>(trials: readonly T[]): {
    practiceTrials: T[];
    scoredTrials: T[];
};
export declare function scoreSpanTask(trials: readonly TrialRecord[], options?: {
    includePractice?: boolean;
}): SpanTaskSummary;
export declare function summarizeLatency(values: readonly number[]): {
    mean: number;
    median: number;
    standardDeviation: number;
};
