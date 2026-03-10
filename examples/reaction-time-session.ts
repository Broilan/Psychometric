import {
  buildQualityFlags,
  createSessionSummaryExport,
  summarizeReactionTime,
  type TrialRecord,
} from "psychometric";

const trials: TrialRecord[] = [
  { id: "t1", blockId: "early", stimulusSide: "left", reactionTimeMs: 320, isCorrect: true },
  { id: "t2", blockId: "early", stimulusSide: "right", reactionTimeMs: 340, isCorrect: true },
  { id: "t3", blockId: "late", stimulusSide: "left", reactionTimeMs: 390, isCorrect: true },
  { id: "t4", blockId: "late", stimulusSide: "right", reactionTimeMs: null, isCorrect: false },
];

const reactionTime = summarizeReactionTime(trials, { minimumValidTrials: 3 });
const qualityFlags = buildQualityFlags({
  reactionTimeSummary: reactionTime,
  minimumValidTrials: 3,
});

const exportEnvelope = createSessionSummaryExport(
  {
    summaryType: "session-summary",
    session: { sessionId: "rt-001", participantId: "p-001" },
    summaries: { reactionTime },
    qualityFlags,
  },
  "2.0.0",
);

console.log(exportEnvelope);
