import {
  summarizeFlanker,
  type TrialRecord,
} from "psychometric";

const flankerTrials: TrialRecord[] = [
  { id: "f1", blockId: "block-1", reactionTimeMs: 410, response: "left", responseSide: "left", isCorrect: true, labels: { congruency: "congruent", condition: "congruent", cueValidity: "valid" } },
  { id: "f2", blockId: "block-1", reactionTimeMs: 420, response: "right", responseSide: "right", isCorrect: true, labels: { congruency: "congruent", condition: "congruent", cueValidity: "valid" } },
  { id: "f3", blockId: "block-1", reactionTimeMs: 515, response: "left", responseSide: "left", isCorrect: true, labels: { congruency: "incongruent", condition: "incongruent", cueValidity: "invalid" } },
  { id: "f4", blockId: "block-1", reactionTimeMs: 540, response: "right", responseSide: "right", isCorrect: true, labels: { congruency: "incongruent", condition: "incongruent", cueValidity: "invalid" } },
];

const summary = summarizeFlanker(flankerTrials);

console.log({
  congruent: summary.congruentSummary,
  incongruent: summary.incongruentSummary,
  congruencyEffect: summary.congruencyEffect,
  cueContrasts: summary.contrastSummaries,
});
