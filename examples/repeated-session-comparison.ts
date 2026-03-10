import {
  compareSessions,
  createSessionComparisonExport,
  summarizeFlanker,
  summarizeTaskSwitching,
  type TrialRecord,
} from "psychometric";

const flankerBaseline: TrialRecord[] = [
  { id: "fb-1", reactionTimeMs: 410, response: "left", responseSide: "left", isCorrect: true, labels: { congruency: "congruent", condition: "congruent" } },
  { id: "fb-2", reactionTimeMs: 420, response: "right", responseSide: "right", isCorrect: true, labels: { congruency: "congruent", condition: "congruent" } },
  { id: "fb-3", reactionTimeMs: 510, response: "left", responseSide: "left", isCorrect: true, labels: { congruency: "incongruent", condition: "incongruent" } },
  { id: "fb-4", reactionTimeMs: 530, response: "right", responseSide: "right", isCorrect: true, labels: { congruency: "incongruent", condition: "incongruent" } },
];

const flankerFollowUp = flankerBaseline.map((trial) => ({
  ...trial,
  reactionTimeMs:
    trial.labels?.congruency === "incongruent" && typeof trial.reactionTimeMs === "number"
      ? trial.reactionTimeMs - 35
      : trial.reactionTimeMs,
}));

const switchingTrials: TrialRecord[] = [
  { id: "ts-1", blockId: "single", cue: "color", reactionTimeMs: 460, response: "left", responseSide: "left", isCorrect: true, labels: { switchType: "repeat", condition: "single", cueType: "color" }, metadata: { taskContext: "single" } },
  { id: "ts-2", blockId: "mixed", cue: "color", reactionTimeMs: 520, response: "left", responseSide: "left", isCorrect: true, labels: { switchType: "repeat", condition: "repeat", cueType: "color" } },
  { id: "ts-3", blockId: "mixed", cue: "shape", reactionTimeMs: 615, response: "right", responseSide: "right", isCorrect: true, labels: { switchType: "switch", condition: "switch", cueType: "shape" } },
];

const switchingFollowUp = switchingTrials.map((trial) => ({
  ...trial,
  reactionTimeMs:
    trial.labels?.switchType === "switch" && typeof trial.reactionTimeMs === "number"
      ? trial.reactionTimeMs - 50
      : trial.reactionTimeMs,
}));

const baselineFlanker = summarizeFlanker(flankerBaseline);
const followUpFlanker = summarizeFlanker(flankerFollowUp);
const baselineSwitching = summarizeTaskSwitching(switchingTrials);
const followUpSwitching = summarizeTaskSwitching(switchingFollowUp);

const comparison = compareSessions(
  {
    sessionId: "baseline",
    protocolId: "executive-control",
    protocolVersion: "1.0.0",
    metrics: {
      flankerCongruencyEffectMs: baselineFlanker.congruencyEffect?.rawDifference ?? null,
      switchingCostMs: baselineSwitching.switchCost?.rawDifference ?? null,
    },
  },
  {
    sessionId: "follow-up",
    protocolId: "executive-control",
    protocolVersion: "1.0.0",
    metrics: {
      flankerCongruencyEffectMs: followUpFlanker.congruencyEffect?.rawDifference ?? null,
      switchingCostMs: followUpSwitching.switchCost?.rawDifference ?? null,
    },
  },
);

console.log(createSessionComparisonExport(comparison, "2.0.1"));
