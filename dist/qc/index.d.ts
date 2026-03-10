import { DeviceMetadata, QualityFlag, SessionMetadata } from '../schemas';
export interface BuildQualityFlagsInput {
    session?: SessionMetadata;
    reactionTimeSummary?: {
        validTrialCount: number;
        omissionRate: number;
        anticipationRate: number;
    };
    responses?: readonly (number | null | undefined)[];
    expectedProtocolVersion?: string;
    actualProtocolVersion?: string;
    device?: DeviceMetadata;
    completed?: boolean;
    focusInterruptions?: number;
    minimumValidTrials?: number;
    maxMissingRate?: number;
    maxOmissionRate?: number;
    maxAnticipationRate?: number;
}
export declare function buildQualityFlags(input: BuildQualityFlagsInput): QualityFlag[];
export declare function reliabilityWarning(reliability: number, threshold?: number): QualityFlag | null;
