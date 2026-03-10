import { ConditionContrastResult, ConditionSummary, InhibitionTaskSummary, LatencySummary, MemoryTaskSummary, PracticeSplit, ProcessingSpeedSummary, QualityFlag, TrialRecord } from '../schemas';
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
export declare function computeConditionContrast(leftValue: number | null, rightValue: number | null, options: ContrastOptions): ConditionContrastResult;
export declare function classifyReactionTimeTrial(trial: TrialRecord, options?: ReactionTimeOptions): ReactionTimeTrialClassification;
export declare function summarizeConditionedReactionTime(trials: readonly TrialRecord[], selector: (trial: TrialRecord) => string | undefined, options?: ReactionTimeOptions): Record<string, ConditionSummary> | undefined;
export declare function summarizeReactionTime(trials: readonly TrialRecord[], options?: ReactionTimeOptions): ReactionTimeSummary;
export declare function summarizeGoNoGo(trials: readonly TrialRecord[], options?: ReactionTimeOptions): GoNoGoSummary;
export declare function summarizeInterferenceTask(trials: readonly TrialRecord[], options?: ReactionTimeOptions): InterferenceTaskSummary;
export declare function classifySequenceErrors<T>(expected: readonly T[], observed: readonly T[]): SequenceErrorSummary<T>;
export declare function separatePracticeTrials<T extends TrialRecord>(trials: readonly T[]): PracticeSplit<T> & {
    practiceTrials: T[];
    scoredTrials: T[];
};
export declare function scoreSpanTask(trials: readonly TrialRecord[], options?: {
    includePractice?: boolean;
}): SpanTaskSummary;
export declare function summarizeRecognitionMemory(trials: readonly TrialRecord[], options?: ReactionTimeOptions): RecognitionMemorySummary;
export declare function summarizePairedAssociates(trials: readonly TrialRecord[], options?: ReactionTimeOptions): PairedAssociatesSummary;
export declare function summarizeProcessingSpeed(trials: readonly TrialRecord[], options?: ProcessingSpeedOptions): ProcessingSpeedSummary;
export declare function summarizeLatency(values: readonly number[]): {
    mean: number;
    median: number;
    standardDeviation: number;
};
