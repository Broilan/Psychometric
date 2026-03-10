import {
  summarizeTaskSwitching,
  type TrialRecord,
} from "psychometric";

const switchingTrials: TrialRecord[] = [
  { id: "ts1", blockId: "single", cue: "color", reactionTimeMs: 450, response: "left", responseSide: "left", isCorrect: true, labels: { switchType: "repeat", condition: "single", cueType: "color", taskSet: "color" }, metadata: { taskContext: "single" } },
  { id: "ts2", blockId: "single", cue: "shape", reactionTimeMs: 470, response: "right", responseSide: "right", isCorrect: true, labels: { switchType: "repeat", condition: "single", cueType: "shape", taskSet: "shape" }, metadata: { taskContext: "single" } },
  { id: "ts3", blockId: "mixed", cue: "color", reactionTimeMs: 520, response: "left", responseSide: "left", isCorrect: true, labels: { switchType: "repeat", condition: "repeat", cueType: "color", taskSet: "color" } },
  { id: "ts4", blockId: "mixed", cue: "shape", reactionTimeMs: 540, response: "right", responseSide: "right", isCorrect: true, labels: { switchType: "repeat", condition: "repeat", cueType: "shape", taskSet: "shape" } },
  { id: "ts5", blockId: "mixed", cue: "color", reactionTimeMs: 610, response: "left", responseSide: "left", isCorrect: true, labels: { switchType: "switch", condition: "switch", cueType: "color", taskSet: "color" } },
  { id: "ts6", blockId: "mixed", cue: "shape", reactionTimeMs: 630, response: "right", responseSide: "right", isCorrect: true, labels: { switchType: "switch", condition: "switch", cueType: "shape", taskSet: "shape" } },
];

const summary = summarizeTaskSwitching(switchingTrials);

console.log({
  repeat: summary.repeatSummary,
  switch: summary.switchSummary,
  singleTask: summary.singleTaskSummary,
  switchCost: summary.switchCost,
  mixingCost: summary.mixingCost,
});
