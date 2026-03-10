import {
  buildQualityFlags,
  createSessionSummaryExport,
  summarizeReactionTime,
  type SessionSummary,
  type TrialRecord,
} from "psychometric";

const trials: TrialRecord[] = [
  { id: "rt-1", phase: "practice", isPractice: true, trialIndex: 1, blockIndex: 0, blockId: "practice", stimulusSide: "left", responseSide: "left", reactionTimeMs: 340, isCorrect: true, labels: { scoringPhase: "practice", condition: "left" } },
  { id: "rt-2", phase: "scored", trialIndex: 2, blockIndex: 1, blockId: "early", stimulusSide: "left", responseSide: "left", reactionTimeMs: 315, isCorrect: true, labels: { scoringPhase: "scored", condition: "left" } },
  { id: "rt-3", phase: "scored", trialIndex: 3, blockIndex: 1, blockId: "early", stimulusSide: "right", responseSide: "right", reactionTimeMs: 335, isCorrect: true, labels: { scoringPhase: "scored", condition: "right" } },
  { id: "rt-4", phase: "scored", trialIndex: 4, blockIndex: 2, blockId: "late", stimulusSide: "left", responseSide: "left", reactionTimeMs: 390, isCorrect: true, labels: { scoringPhase: "scored", condition: "left" } },
  { id: "rt-5", phase: "scored", trialIndex: 5, blockIndex: 2, blockId: "late", stimulusSide: "right", responseSide: "right", reactionTimeMs: null, isCorrect: false, isOmission: true, labels: { scoringPhase: "scored", condition: "right" } },
];

const reactionTime = summarizeReactionTime(trials, { minimumValidTrials: 4 });
const qualityFlags = buildQualityFlags({
  reactionTimeSummary: reactionTime,
  conditionCounts: {
    left: reactionTime.conditionSummaries?.left?.counts.total ?? 0,
    right: reactionTime.conditionSummaries?.right?.counts.total ?? 0,
  },
  minimumValidTrials: 4,
  requiredConditions: ["left", "right"],
});

const sessionSummary: SessionSummary = {
  summaryType: "session-summary",
  session: { sessionId: "choice-rt-001", participantId: "p-001", focusInterruptions: 0 },
  protocol: { protocolId: "choice-rt", protocolVersion: "1.0.0", taskFamily: "choice-reaction-time" },
  device: { deviceType: "desktop", inputMethod: "keyboard", timingPrecision: "high" },
  summaries: { reactionTime },
  qualityFlags,
};

console.log(createSessionSummaryExport(sessionSummary, "2.0.1"));
