import { describe, expect, it } from "vitest";

import {
  buildQualityFlags,
  compareSessions,
  createQualityFlagsExport,
  createSessionComparisonExport,
} from "../src";

describe("longitudinal and qc workflows", () => {
  it("compares repeated sessions and computes change metrics", () => {
    const comparison = compareSessions(
      {
        sessionId: "baseline",
        protocolId: "task-a",
        protocolVersion: "1.0.0",
        metrics: {
          meanCorrectRtMs: 420,
          accuracy: 0.82,
          throughputPerMinute: 18,
        },
      },
      {
        sessionId: "follow-up",
        protocolId: "task-a",
        protocolVersion: "1.0.0",
        metrics: {
          meanCorrectRtMs: 390,
          accuracy: 0.9,
          throughputPerMinute: 20,
        },
      },
      {
        standardDeviation: 50,
        reliability: 0.85,
        practiceMetricKey: "meanCorrectRtMs",
        fatigueMetricKey: "throughputPerMinute",
      },
    );

    expect(comparison.protocolCompatible).toBe(true);
    expect(comparison.metrics.find((metric) => metric.key === "meanCorrectRtMs")).toMatchObject({
      baseline: 420,
      followUp: 390,
      change: -30,
    });
    expect(comparison.practiceEffect).toBe(-30);
    expect(comparison.fatigueEffect).toBe(2);
    expect(createSessionComparisonExport(comparison, "2.0.0").metadata.kind).toBe("session-comparison");
  });

  it("builds targeted QC flags for condition coverage, latency plausibility, and delayed phase gaps", () => {
    const flags = buildQualityFlags({
      conditionCounts: {
        congruent: 2,
        incongruent: 1,
      },
      minimumConditionTrials: 2,
      blockMetricValues: [0.9, 0.55, 0.88],
      maxBlockInstability: 0.25,
      observedLatenciesMs: [120, 800, 5200],
      minLatencyMs: 150,
      maxLatencyMs: 4000,
      requiredDelayedPhase: true,
      hasDelayedPhase: false,
    });

    const exportEnvelope = createQualityFlagsExport({ flags }, "2.0.0");

    expect(flags.map((flag) => flag.code)).toEqual([
      "insufficient-trials-per-condition",
      "unstable-block-performance",
      "implausible-latency-values",
      "incomplete-delayed-memory-phase",
    ]);
    expect(exportEnvelope.metadata.kind).toBe("quality-flags");
  });
});
