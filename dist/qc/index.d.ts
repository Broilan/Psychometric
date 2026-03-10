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
    requiredConditions?: readonly string[];
    requiredConditionGroups?: ReadonlyArray<{
        code: string;
        label: string;
        conditions: readonly string[];
        minimumTrials?: number;
    }>;
    responses?: readonly (number | null | undefined)[];
    expectedProtocolVersion?: string;
    actualProtocolVersion?: string;
    expectedProtocolId?: string;
    actualProtocolId?: string;
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
    spanLevelCounts?: Record<string, number>;
    requiredSpanLevels?: readonly (string | number)[];
}
export declare function buildQualityFlags(input: BuildQualityFlagsInput): QualityFlag[];
export declare function reliabilityWarning(reliability: number, threshold?: number): QualityFlag | null;
