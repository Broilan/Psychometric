import type { QualityFlag, SessionComparisonResult } from "../schemas";
import { reliableChangeIndex } from "../scores";

export interface SessionComparisonInput {
  sessionId?: string;
  protocolId?: string;
  protocolVersion?: string;
  metrics: Record<string, number | null | undefined>;
}

export interface CompareSessionsOptions {
  standardDeviation?: number;
  reliability?: number;
  practiceMetricKey?: string;
  fatigueMetricKey?: string;
}

export function compareSessions(
  baseline: SessionComparisonInput,
  followUp: SessionComparisonInput,
  options: CompareSessionsOptions = {},
): SessionComparisonResult {
  const keys = [...new Set([...Object.keys(baseline.metrics), ...Object.keys(followUp.metrics)])];
  const protocolCompatible =
    baseline.protocolId === undefined ||
    followUp.protocolId === undefined ||
    (baseline.protocolId === followUp.protocolId &&
      (baseline.protocolVersion === undefined ||
        followUp.protocolVersion === undefined ||
        baseline.protocolVersion === followUp.protocolVersion));
  const protocolMessages = protocolCompatible
    ? []
    : ["Protocol identifiers or versions do not match across sessions."];
  const qualityFlags: QualityFlag[] = [];
  if (!protocolCompatible) {
    qualityFlags.push({
      code: "protocol-mismatch",
      severity: "warning",
      message: "Sessions use incompatible protocol metadata.",
      source: "longitudinal",
    });
  }

  const metrics = keys.map((key) => {
    const baselineValue = baseline.metrics[key] ?? null;
    const followUpValue = followUp.metrics[key] ?? null;
    const change = baselineValue === null || followUpValue === null ? null : followUpValue - baselineValue;
    const percentChange =
      change === null || baselineValue === null || baselineValue === 0 ? null : change / baselineValue;
    const rci =
      change === null || options.standardDeviation === undefined || options.reliability === undefined
        ? null
        : reliableChangeIndex(baselineValue as number, followUpValue as number, options.standardDeviation, options.reliability);
    return {
      key,
      baseline: baselineValue,
      followUp: followUpValue,
      change,
      percentChange,
      reliableChangeIndex: rci,
    };
  });

  return {
    summaryType: "session-comparison",
    baselineSessionId: baseline.sessionId,
    followUpSessionId: followUp.sessionId,
    protocolCompatible,
    protocolMessages,
    metrics,
    practiceEffect: options.practiceMetricKey ? metrics.find((metric) => metric.key === options.practiceMetricKey)?.change ?? null : null,
    fatigueEffect: options.fatigueMetricKey ? metrics.find((metric) => metric.key === options.fatigueMetricKey)?.change ?? null : null,
    qualityFlags,
  };
}
