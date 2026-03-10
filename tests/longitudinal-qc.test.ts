import { describe, expect, it } from "vitest";

import {
  buildQualityFlags,
  compareSessions,
  createQualityFlagsExport,
  createSessionComparisonExport,
  scoreSpanTask,
  summarizeFlanker,
  summarizeReactionTime,
  summarizeTaskSwitching,
} from "../src";
import {
  choiceReactionTimeTrials,
  flankerTrials,
  spanTaskTrials,
  taskSwitchingTrials,
} from "./fixtures/workflows";

describe("longitudinal and qc workflows", () => {
  it("compares repeated RT-family sessions and preserves direction metadata", () => {
    const baseline = summarizeReactionTime(choiceReactionTimeTrials, { minimumValidTrials: 8 });
    const followUp = summarizeReactionTime(
      choiceReactionTimeTrials.map((trial) =>
        trial.isPractice
          ? trial
          : {
            ...trial,
            reactionTimeMs: typeof trial.reactionTimeMs === "number" ? trial.reactionTimeMs - 20 : trial.reactionTimeMs,
          },
      ),
      { minimumValidTrials: 8 },
    );

    const comparison = compareSessions(
      {
        sessionId: "baseline",
        protocolId: "choice-rt",
        protocolVersion: "1.0.0",
        metrics: {
          meanCorrectRtMs: baseline.meanCorrectRt,
          omissionRate: baseline.omissionRate,
          accuracy: baseline.accuracy,
        },
      },
      {
        sessionId: "follow-up",
        protocolId: "choice-rt",
        protocolVersion: "1.0.0",
        metrics: {
          meanCorrectRtMs: followUp.meanCorrectRt,
          omissionRate: followUp.omissionRate,
          accuracy: followUp.accuracy,
        },
      },
      {
        standardDeviation: 50,
        reliability: 0.85,
        practiceMetricKey: "meanCorrectRtMs",
      },
    );

    expect(comparison.protocolCompatible).toBe(true);
    expect(comparison.metrics.find((metric) => metric.key === "meanCorrectRtMs")).toMatchObject({
      direction: "decrease",
    });
    expect(comparison.practiceEffect).toBeCloseTo(-20, 6);
    expect(createSessionComparisonExport(comparison, "2.0.0").metadata.kind).toBe("session-comparison");
  });

  it("compares flanker effects, task-switching costs, and span summaries across sessions", () => {
    const flankerBaseline = summarizeFlanker(flankerTrials);
    const flankerFollowUp = summarizeFlanker(
      flankerTrials.map((trial) => ({
        ...trial,
        reactionTimeMs:
          trial.labels?.congruency === "incongruent" && typeof trial.reactionTimeMs === "number"
            ? trial.reactionTimeMs - 40
            : trial.reactionTimeMs,
      })),
    );
    const switchingBaseline = summarizeTaskSwitching(taskSwitchingTrials);
    const switchingFollowUp = summarizeTaskSwitching(
      taskSwitchingTrials.map((trial) => ({
        ...trial,
        reactionTimeMs:
          trial.labels?.switchType === "switch" && typeof trial.reactionTimeMs === "number"
            ? trial.reactionTimeMs - 60
            : trial.reactionTimeMs,
      })),
    );
    const spanBaseline = scoreSpanTask(spanTaskTrials);
    const spanFollowUp = scoreSpanTask(
      spanTaskTrials.map((trial) =>
        trial.spanLevel === 4 && !trial.isPractice
          ? { ...trial, isCorrect: true, responseSequence: trial.expectedSequence }
          : trial,
      ),
    );

    const comparison = compareSessions(
      {
        sessionId: "session-a",
        protocolId: "executive-control",
        protocolVersion: "1.0.0",
        metrics: {
          flankerCongruencyEffectMs: flankerBaseline.congruencyEffect?.rawDifference ?? null,
          switchingCostMs: switchingBaseline.switchCost?.rawDifference ?? null,
          spanLongest: spanBaseline.longestSpan,
          forwardBackwardDelta: spanBaseline.forwardBackwardDelta,
        },
      },
      {
        sessionId: "session-b",
        protocolId: "executive-control",
        protocolVersion: "1.0.0",
        metrics: {
          flankerCongruencyEffectMs: flankerFollowUp.congruencyEffect?.rawDifference ?? null,
          switchingCostMs: switchingFollowUp.switchCost?.rawDifference ?? null,
          spanLongest: spanFollowUp.longestSpan,
          forwardBackwardDelta: spanFollowUp.forwardBackwardDelta,
        },
      },
    );

    expect(comparison.metrics.find((metric) => metric.key === "flankerCongruencyEffectMs")?.change).toBeCloseTo(-40, 6);
    expect(comparison.metrics.find((metric) => metric.key === "switchingCostMs")?.change).toBeCloseTo(-60, 6);
    expect(comparison.metrics.find((metric) => metric.key === "spanLongest")?.change).toBeCloseTo(0, 6);
    expect(comparison.metrics.find((metric) => metric.key === "forwardBackwardDelta")?.baseline).toBeCloseTo(2, 6);
  });

  it("builds targeted QC flags for condition coverage, span coverage, latency plausibility, and protocol mismatch", () => {
    const flags = buildQualityFlags({
      conditionCounts: {
        congruent: 2,
        incongruent: 1,
        switch: 1,
        repeat: 3,
      },
      requiredConditions: ["congruent", "incongruent", "switch", "repeat"],
      requiredConditionGroups: [
        {
          code: "insufficient-congruency-coverage",
          label: "Congruency",
          conditions: ["congruent", "incongruent"],
          minimumTrials: 2,
        },
        {
          code: "insufficient-switch-repeat-coverage",
          label: "Switch/repeat",
          conditions: ["switch", "repeat"],
          minimumTrials: 2,
        },
      ],
      minimumConditionTrials: 2,
      blockMetricValues: [0.9, 0.55, 0.88],
      maxBlockInstability: 0.25,
      observedLatenciesMs: [120, 800, 5200],
      minLatencyMs: 150,
      maxLatencyMs: 4000,
      focusInterruptions: 4,
      requiredSpanLevels: [2, 3, 4],
      spanLevelCounts: { "2": 2, "4": 1 },
      expectedProtocolId: "task-battery-a",
      actualProtocolId: "task-battery-b",
      expectedProtocolVersion: "1.0.0",
      actualProtocolVersion: "2.0.0",
    });

    const exportEnvelope = createQualityFlagsExport({ flags }, "2.0.0");

    expect(flags.map((flag) => flag.code)).toEqual([
      "excessive-focus-interruptions",
      "protocol-mismatch",
      "protocol-mismatch",
      "insufficient-trials-per-condition",
      "insufficient-trials-per-condition",
      "insufficient-congruency-coverage",
      "insufficient-switch-repeat-coverage",
      "unstable-block-performance",
      "implausible-latency-values",
      "incomplete-span-level-coverage",
    ]);
    expect(exportEnvelope.metadata.kind).toBe("quality-flags");
  });

  it("flags repeated-session protocol mismatches", () => {
    const comparison = compareSessions(
      {
        sessionId: "baseline",
        protocolId: "flanker-a",
        protocolVersion: "1.0.0",
        metrics: { meanCorrectRtMs: 430 },
      },
      {
        sessionId: "follow-up",
        protocolId: "flanker-b",
        protocolVersion: "1.1.0",
        metrics: { meanCorrectRtMs: 420 },
      },
    );

    expect(comparison.protocolCompatible).toBe(false);
    expect(comparison.qualityFlags?.[0]?.code).toBe("protocol-mismatch");
  });
});
