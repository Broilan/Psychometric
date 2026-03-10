import { describe, expect, it } from "vitest";

import {
  buildQualityFlags,
  classifyReactionTimeTrial,
  scoreSpanTask,
  separatePracticeTrials,
  summarizeReactionTime,
} from "../src";
import {
  choiceReactionTimeTrials,
  simpleReactionTimeTrials,
  spanTaskTrials,
} from "./fixtures/workflows";

describe("behavioral workflows", () => {
  it("summarizes a choice reaction time session with realistic counts, rates, and comparisons", () => {
    const summary = summarizeReactionTime(choiceReactionTimeTrials, {
      minimumValidTrials: 8,
    });

    expect(classifyReactionTimeTrial(choiceReactionTimeTrials[7]).isCorrect).toBe(true);
    expect(summary.summaryType).toBe("reaction-time");
    expect(summary.practiceIncluded).toBe(false);
    expect(summary.counts).toMatchObject({
      total: 10,
      valid: 7,
      invalid: 3,
      correct: 5,
      incorrect: 3,
      omissions: 2,
      anticipations: 1,
      lapses: 0,
    });
    expect(summary.rates.accuracy).toBeCloseTo(0.5, 6);
    expect(summary.rates.error).toBeCloseTo(0.3, 6);
    expect(summary.rates.omission).toBeCloseTo(0.2, 6);
    expect(summary.rates.anticipation).toBeCloseTo(0.1, 6);
    expect(summary.timing.medianCorrectRtMs).toBe(390);
    expect(summary.timing.meanCorrectRtMs).toBeCloseTo(378, 6);
    expect(summary.timing.rtSdMs).toBeCloseTo(46.583259, 6);
    expect(summary.timing.coefficientOfVariation).toBeCloseTo(0.123236, 6);
    expect(summary.comparisons.earlyLateDifferenceMs).toBeCloseTo(77.5, 6);
    expect(summary.comparisons.leftRightAsymmetryMs).toBeCloseTo(48.333333, 6);
    expect(summary.qualityFlags).toHaveLength(1);
    expect(summary.qualityFlags[0]?.code).toBe("insufficient-valid-trials");
  });

  it("summarizes a simple reaction time session and exposes lapse/anticipation counts cleanly", () => {
    const summary = summarizeReactionTime(simpleReactionTimeTrials, {
      minimumValidTrials: 7,
      lapseThresholdMs: 2000,
    });
    const qcFlags = buildQualityFlags({
      reactionTimeSummary: summary,
      minimumValidTrials: 7,
      maxAnticipationRate: 0.1,
      maxOmissionRate: 0.1,
    });

    expect(summary.counts).toMatchObject({
      total: 8,
      valid: 6,
      invalid: 2,
      correct: 6,
      incorrect: 1,
      omissions: 1,
      anticipations: 1,
      lapses: 1,
    });
    expect(summary.timing.medianCorrectRtMs).toBe(315);
    expect(summary.timing.meanCorrectRtMs).toBeCloseTo(650.833333, 6);
    expect(summary.timing.rtSdMs).toBeCloseTo(763.206503, 6);
    expect(summary.comparisons.earlyLateDifferenceMs).toBeCloseTo(711.666667, 6);
    expect(summary.qualityFlags.map((flag) => flag.code)).toContain("insufficient-valid-trials");
    expect(qcFlags.map((flag) => flag.code)).toEqual([
      "insufficient-valid-trials",
      "excessive-omissions",
      "excessive-anticipations",
    ]);
  });

  it("scores a block tapping/span workflow and preserves practice separation", () => {
    const split = separatePracticeTrials(spanTaskTrials);
    const summary = scoreSpanTask(spanTaskTrials);

    expect(split.practice).toHaveLength(1);
    expect(split.scored).toHaveLength(6);
    expect(split.practiceTrials).toHaveLength(1);
    expect(split.scoredTrials).toHaveLength(6);

    expect(summary.summaryType).toBe("span-task");
    expect(summary.counts).toEqual({
      total: 6,
      correct: 4,
      incorrect: 2,
    });
    expect(summary.longestSpan).toBe(5);
    expect(summary.totalCorrectTrials).toBe(4);
    expect(summary.accuracyBySpanLevel).toEqual({
      "2": 1,
      "3": 0.5,
      "4": 0.5,
      "5": 1,
    });
    expect(summary.timing.firstResponseLatencyMeanMs).toBeCloseTo(675, 6);
    expect(summary.timing.interResponseIntervalMeanMs).toBeCloseTo(1002.777778, 6);
    expect(summary.timing.totalSequenceResponseTimeMeanMs).toBeCloseTo(2333.333333, 6);
    expect(summary.forwardBackwardDelta).toBeCloseTo(-2, 6);
    expect(summary.errors[1]).toMatchObject({
      orderErrors: 2,
      substitutions: 0,
      repetitions: 0,
      prematureResponses: 0,
    });
    expect(summary.errors[4]).toMatchObject({
      orderErrors: 1,
      substitutions: 0,
      repetitions: 1,
      prematureResponses: 0,
    });
  });
});
