import {
  scoreSpanTask,
  type TrialRecord,
} from "psychometric";

const digitSpanTrials: TrialRecord<number>[] = [
  { id: "practice-1", isPractice: true, spanLevel: 2, expectedSequence: [1, 4], responseSequence: [1, 4], responses: [1, 4], latencyMs: 650, durationMs: 1500, labels: { direction: "forward", scoringPhase: "practice" } },
  { id: "span-1", spanLevel: 3, expectedSequence: [2, 6, 1], responseSequence: [2, 6, 1], responses: [2, 6, 1], latencyMs: 640, durationMs: 1900, labels: { direction: "forward", scoringPhase: "scored" } },
  { id: "span-2", spanLevel: 4, expectedSequence: [3, 1, 7, 4], responseSequence: [3, 7, 1, 4], responses: [3, 7, 1, 4], latencyMs: 690, durationMs: 2500, errorTaxonomy: { primary: "order-error" }, labels: { direction: "forward", scoringPhase: "scored" } },
  { id: "span-3", spanLevel: 4, expectedSequence: [8, 2, 5, 9], responseSequence: [9, 5, 2, 8], responses: [9, 5, 2, 8], latencyMs: 720, durationMs: 2800, labels: { direction: "backward", scoringPhase: "scored" } },
];

const summary = scoreSpanTask(digitSpanTrials);

console.log({
  longestSpan: summary.longestSpan,
  accuracyBySpanLevel: summary.accuracyBySpanLevel,
  directionSummaries: summary.directionSummaries,
  forwardBackwardContrast: summary.forwardBackwardContrast,
  errorBreakdown: summary.errorBreakdown,
});
