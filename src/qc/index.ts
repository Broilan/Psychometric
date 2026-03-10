import type { DeviceMetadata, QualityFlag, SessionMetadata } from "../schemas";
import { missingRate } from "../core/missing";

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

export function buildQualityFlags(input: BuildQualityFlagsInput): QualityFlag[] {
  const flags: QualityFlag[] = [];
  const minimumValidTrials = input.minimumValidTrials ?? 10;
  const maxMissing = input.maxMissingRate ?? 0.2;
  const maxOmissions = input.maxOmissionRate ?? 0.15;
  const maxAnticipations = input.maxAnticipationRate ?? 0.1;

  if (input.reactionTimeSummary && input.reactionTimeSummary.validTrialCount < minimumValidTrials) {
    flags.push({
      code: "insufficient-valid-trials",
      severity: "warning",
      message: "Valid trial count is below threshold.",
      observed: input.reactionTimeSummary.validTrialCount,
      threshold: minimumValidTrials,
      source: "qc",
    });
  }

  if (input.reactionTimeSummary && input.reactionTimeSummary.omissionRate > maxOmissions) {
    flags.push({
      code: "excessive-omissions",
      severity: "warning",
      message: "Omission rate exceeds threshold.",
      observed: input.reactionTimeSummary.omissionRate,
      threshold: maxOmissions,
      source: "qc",
    });
  }

  if (input.reactionTimeSummary && input.reactionTimeSummary.anticipationRate > maxAnticipations) {
    flags.push({
      code: "excessive-anticipations",
      severity: "warning",
      message: "Anticipation rate exceeds threshold.",
      observed: input.reactionTimeSummary.anticipationRate,
      threshold: maxAnticipations,
      source: "qc",
    });
  }

  if (input.focusInterruptions && input.focusInterruptions > 0) {
    flags.push({
      code: "excessive-focus-interruptions",
      severity: input.focusInterruptions > 3 ? "warning" : "info",
      message: "Focus interruptions were recorded during the session.",
      observed: input.focusInterruptions,
      source: "qc",
    });
  }

  if (input.expectedProtocolVersion && input.actualProtocolVersion && input.expectedProtocolVersion !== input.actualProtocolVersion) {
    flags.push({
      code: "protocol-mismatch",
      severity: "error",
      message: "Observed protocol version does not match the expected version.",
      source: "qc",
    });
  }

  if (input.completed === false) {
    flags.push({
      code: "incomplete-session",
      severity: "warning",
      message: "Session did not complete normally.",
      source: "qc",
    });
  }

  if (input.responses && missingRate(input.responses) > maxMissing) {
    flags.push({
      code: "too-much-missing-item-data",
      severity: "warning",
      message: "Missing item rate exceeds threshold.",
      observed: missingRate(input.responses),
      threshold: maxMissing,
      source: "qc",
    });
  }

  if (input.device?.deviceType === "mobile") {
    flags.push({
      code: "unsupported-device-metadata",
      severity: "info",
      message: "Mobile device usage may affect timing precision for some tasks.",
      source: "qc",
    });
  }

  return flags;
}

export function reliabilityWarning(reliability: number, threshold = 0.7): QualityFlag | null {
  if (reliability >= threshold) {
    return null;
  }
  return {
    code: "unusually-low-reliability",
    severity: "warning",
    message: "Reliability estimate falls below the configured threshold.",
    observed: reliability,
    threshold,
    source: "qc",
  };
}
