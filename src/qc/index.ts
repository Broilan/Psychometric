import type { DeviceMetadata, QualityFlag, SessionMetadata } from "../schemas";
import { missingRate } from "../core/missing";

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

export function buildQualityFlags(input: BuildQualityFlagsInput): QualityFlag[] {
  const flags: QualityFlag[] = [];
  const minimumValidTrials = input.minimumValidTrials ?? 10;
  const maxMissing = input.maxMissingRate ?? 0.2;
  const maxOmissions = input.maxOmissionRate ?? 0.15;
  const maxAnticipations = input.maxAnticipationRate ?? 0.1;
  const minimumConditionTrials = input.minimumConditionTrials ?? 3;
  const maxCommissionErrors = input.maxCommissionErrorRate ?? 0.3;
  const maxBlockInstability = input.maxBlockInstability ?? 0.3;

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

  if (input.commissionErrorRate !== undefined && input.commissionErrorRate > maxCommissionErrors) {
    flags.push({
      code: "excessive-commission-errors",
      severity: "warning",
      message: "Commission error rate exceeds threshold.",
      observed: input.commissionErrorRate,
      threshold: maxCommissionErrors,
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

  if (input.expectedProtocolId && input.actualProtocolId && input.expectedProtocolId !== input.actualProtocolId) {
    flags.push({
      code: "protocol-mismatch",
      severity: "error",
      message: "Observed protocol identifier does not match the expected protocol identifier.",
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

  if (input.conditionCounts) {
    if (input.requiredConditions?.length) {
      const missingConditions = input.requiredConditions.filter((condition) => !input.conditionCounts?.[condition]);
      if (missingConditions.length) {
        flags.push({
          code: "missing-key-conditions",
          severity: "warning",
          message: "One or more expected conditions were not observed.",
          source: "qc",
          metadata: { conditions: missingConditions },
        });
      }
    }
    Object.entries(input.conditionCounts).forEach(([condition, count]) => {
      if (count < minimumConditionTrials) {
        flags.push({
          code: "insufficient-trials-per-condition",
          severity: "warning",
          message: `Condition ${condition} has too few trials.`,
          observed: count,
          threshold: minimumConditionTrials,
          source: "qc",
          metadata: { condition },
        });
      }
    });
    input.requiredConditionGroups?.forEach((group) => {
      const threshold = group.minimumTrials ?? minimumConditionTrials;
      const insufficient = group.conditions.filter((condition) => (input.conditionCounts?.[condition] ?? 0) < threshold);
      if (insufficient.length) {
        flags.push({
          code: group.code,
          severity: "warning",
          message: `${group.label} coverage is insufficient.`,
          threshold,
          source: "qc",
          metadata: { conditions: insufficient },
        });
      }
    });
    if (!Object.keys(input.conditionCounts).length) {
      flags.push({
        code: "missing-condition-coverage",
        severity: "warning",
        message: "No condition coverage metadata was supplied.",
        source: "qc",
      });
    }
  }

  if (input.blockMetricValues && input.blockMetricValues.length > 1) {
    const minValue = Math.min(...input.blockMetricValues);
    const maxValue = Math.max(...input.blockMetricValues);
    const instability = maxValue === 0 ? 0 : (maxValue - minValue) / Math.abs(maxValue);
    if (instability > maxBlockInstability) {
      flags.push({
        code: "unstable-block-performance",
        severity: "warning",
        message: "Block-to-block variability exceeds threshold.",
        observed: instability,
        threshold: maxBlockInstability,
        source: "qc",
      });
    }
  }

  if (input.observedLatenciesMs?.length) {
    const minLatencyMs = input.minLatencyMs;
    const maxLatencyMs = input.maxLatencyMs;
    const tooFast = minLatencyMs !== undefined && input.observedLatenciesMs.some((latency) => latency < minLatencyMs);
    const tooSlow = maxLatencyMs !== undefined && input.observedLatenciesMs.some((latency) => latency > maxLatencyMs);
    if (tooFast || tooSlow) {
      flags.push({
        code: "implausible-latency-values",
        severity: "warning",
        message: "Observed latencies fall outside configured plausibility bounds.",
        source: "qc",
      });
    }
  }

  if (input.requiredDelayedPhase && input.hasDelayedPhase === false) {
    flags.push({
      code: "incomplete-delayed-memory-phase",
      severity: "warning",
      message: "A delayed-memory phase was expected but not completed.",
      source: "qc",
    });
  }

  if (input.requiredSpanLevels?.length) {
    const missingLevels = input.requiredSpanLevels.filter((level) => {
      const key = String(level);
      return !input.spanLevelCounts?.[key];
    });
    if (missingLevels.length) {
      flags.push({
        code: "incomplete-span-level-coverage",
        severity: "warning",
        message: "One or more required span levels were not observed.",
        source: "qc",
        metadata: { spanLevels: missingLevels.map(String) },
      });
    }
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
