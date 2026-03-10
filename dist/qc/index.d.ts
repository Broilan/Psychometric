import { DeviceMetadata, QualityFlag, SessionMetadata } from '../schemas';
export interface BuildQualityFlagsInput {
    session?: SessionMetadata;
    reactionTimeSummary?: {
        validTrialCount: number;
        omissionRate: number;
        anticipationRate: number;
        invalidTrialCount?: number;
        errorRate?: number;
    };
    conditionCounts?: Record<string, number>;
    responses?: readonly (number | null | undefined)[];
    expectedProtocolVersion?: string;
    actualProtocolVersion?: string;
    device?: DeviceMetadata;
    completed?: boolean;
    focusInterruptions?: number;
    minimumValidTrials?: number;
    minimumConditionTrials?: number;
    maxMissingRate?: number;
    maxOmissionRate?: number;
    maxAnticipationRate?: number;
    maxCommissionErrorRate?: number;
    commissionErrorRate?: number;
    blockMetricValues?: readonly number[];
    maxBlockInstability?: number;
    minLatencyMs?: number;
    maxLatencyMs?: number;
    observedLatenciesMs?: readonly number[];
    hasDelayedPhase?: boolean;
    requiredDelayedPhase?: boolean;
}
export declare function buildQualityFlags(input: BuildQualityFlagsInput): QualityFlag[];
export declare function reliabilityWarning(reliability: number, threshold?: number): QualityFlag | null;
