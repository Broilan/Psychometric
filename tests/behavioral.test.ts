import { describe, expect, it } from "vitest";

import {
  buildQualityFlags,
  classifyReactionTimeTrial,
  computeConditionContrast,
  scoreSpanTask,
  separatePracticeTrials,
  summarizeFlanker,
  summarizeGoNoGo,
  summarizeProcessingSpeed,
  summarizeRecognitionMemory,
  summarizeReactionTime,
  summarizeTaskSwitching,
} from "../src";
import {
  choiceReactionTimeTrials,
  flankerTrials,
  goNoGoTrials,
  processingSpeedTrials,
  recognitionMemoryTrials,
  simpleReactionTimeTrials,
  spanTaskTrials,
  taskSwitchingTrials,
} from "./fixtures/workflows";

describe("behavioral workflows", () => {
  it("summarizes a choice reaction time session with phase, side, and block breakdowns", () => {
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
    expect(summary.phaseSummaries?.scored?.counts.total).toBe(10);
    expect(summary.practiceSummary?.counts.total).toBe(2);
    expect(summary.responseSideSummaries?.left?.counts.total).toBe(5);
    expect(summary.responseSideSummaries?.right?.counts.total).toBe(5);
    expect(summary.timing.medianCorrectRtMs).toBe(390);
    expect(summary.timing.meanCorrectRtMs).toBeCloseTo(378, 6);
    expect(summary.timing.rtSdMs).toBeCloseTo(46.583259, 6);
    expect(summary.timing.coefficientOfVariation).toBeCloseTo(0.123236, 6);
    expect(summary.comparisons.earlyLateDifferenceMs).toBeCloseTo(77.5, 6);
    expect(summary.comparisons.leftRightAsymmetryMs).toBeCloseTo(48.333333, 6);
    expect(summary.qualityFlags).toHaveLength(1);
    expect(summary.qualityFlags[0]?.code).toBe("insufficient-valid-trials");
  });

  it("summarizes a simple reaction time session and exposes omissions, anticipations, and block drift", () => {
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
    expect(summary.blockSummaries?.late?.timing.meanMs).toBeCloseTo(1006.666667, 6);
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

  it("scores a span workflow with forward/backward contrasts and error taxonomy rollups", () => {
    const split = separatePracticeTrials(spanTaskTrials);
    const summary = scoreSpanTask(spanTaskTrials);

    expect(split.practice).toHaveLength(1);
    expect(split.scored).toHaveLength(6);
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
    expect(summary.directionSummaries?.forward?.accuracy).toBeCloseTo(2 / 3, 6);
    expect(summary.directionSummaries?.backward?.accuracy).toBeCloseTo(2 / 3, 6);
    expect(summary.timing.firstResponseLatencyMeanMs).toBeCloseTo(675, 6);
    expect(summary.timing.interResponseIntervalMeanMs).toBeCloseTo(1002.777778, 6);
    expect(summary.timing.totalSequenceResponseTimeMeanMs).toBeCloseTo(2333.333333, 6);
    expect(summary.forwardBackwardDelta).toBeCloseTo(2, 6);
    expect(summary.forwardBackwardContrast?.rawDifference).toBeCloseTo(2, 6);
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
    expect(summary.errorBreakdown.taxonomy).toMatchObject({
      "order-error": 1,
      repetition: 1,
    });
  });

  it("summarizes flanker condition effects with congruency and cue contrasts", () => {
    const summary = summarizeFlanker(flankerTrials);

    expect(summary.congruentSummary?.timing.meanMs).toBeCloseTo(415, 6);
    expect(summary.incongruentSummary?.timing.meanMs).toBeCloseTo(520, 6);
    expect(summary.congruencyEffect?.rawDifference).toBeCloseTo(105, 6);
    expect(summary.cueSummaries?.valid?.timing.meanMs).toBeCloseTo(415, 6);
    expect(summary.cueSummaries?.invalid?.timing.meanMs).toBeCloseTo(520, 6);
    expect(summary.contrastSummaries?.["cue-validity-cost"]?.rawDifference).toBeCloseTo(105, 6);
    expect(
      computeConditionContrast(530, 420, {
        leftLabel: "incongruent",
        rightLabel: "congruent",
        metric: "rt",
        standardizer: 50,
        contrastType: "congruency-effect",
      }),
    ).toMatchObject({
      rawDifference: 110,
      proportionalDifference: 110 / 420,
      standardizedDifference: 2.2,
    });
  });

  it("summarizes task switching with switch and mixing costs", () => {
    const summary = summarizeTaskSwitching(taskSwitchingTrials);

    expect(summary.switchSummary?.timing.meanMs).toBeCloseTo(620, 6);
    expect(summary.repeatSummary?.timing.meanMs).toBeCloseTo(530, 6);
    expect(summary.singleTaskSummary?.timing.meanMs).toBeCloseTo(460, 6);
    expect(summary.switchCost?.rawDifference).toBeCloseTo(90, 6);
    expect(summary.mixingCost?.rawDifference).toBeCloseTo(70, 6);
    expect(summary.cueSummaries?.color?.counts.total).toBe(3);
    expect(summary.cueSummaries?.shape?.counts.total).toBe(3);
  });

  it("summarizes go/no-go, recognition memory, and processing speed workflows", () => {
    const goNoGo = summarizeGoNoGo(goNoGoTrials);
    const recognition = summarizeRecognitionMemory(recognitionMemoryTrials);
    const speed = summarizeProcessingSpeed(processingSpeedTrials, { durationMinutes: 2 });

    expect(goNoGo.commissionErrors).toBe(1);
    expect(goNoGo.omissionErrors).toBe(1);
    expect(goNoGo.inhibitionSuccessRate).toBeCloseTo(0.5, 6);
    expect(goNoGo.falseAlarmRate).toBeCloseTo(0.5, 6);
    expect(goNoGo.goSummary?.timing.meanMs).toBeCloseTo(330, 6);

    expect(recognition.hitRate).toBeCloseTo(2 / 3, 6);
    expect(recognition.falseAlarmRate).toBeCloseTo(1 / 3, 6);
    expect(recognition.correctedRecognition).toBeCloseTo(1 / 3, 6);
    expect(recognition.delayedChange).toBeCloseTo(0.5, 6);

    expect(speed.counts).toEqual({
      totalAttempted: 5,
      totalCorrect: 4,
      totalIncorrect: 1,
    });
    expect(speed.rates.accuracy).toBeCloseTo(0.8, 6);
    expect(speed.rates.throughputPerMinute).toBeCloseTo(2, 6);
    expect(speed.blockSummaries?.["minute-1"]?.rates?.accuracy).toBeCloseTo(2 / 3, 6);
  });
});
