import {
  buildQualityFlags,
  createSessionSummaryExport,
  summarizeGoNoGo,
  type SessionSummary,
  type TrialRecord,
} from "psychometric";

const trials: TrialRecord<string>[] = [
  { id: "g1", reactionTimeMs: 320, response: "space", isCorrect: true, labels: { goNoGoType: "go", condition: "go" } },
  { id: "g2", reactionTimeMs: 340, response: "space", isCorrect: true, labels: { goNoGoType: "go", condition: "go" } },
  { id: "g3", reactionTimeMs: null, response: null, isCorrect: false, isOmission: true, labels: { goNoGoType: "go", condition: "go" } },
  { id: "g4", reactionTimeMs: 360, response: "space", isCorrect: false, labels: { goNoGoType: "no-go", condition: "no-go" } },
  { id: "g5", reactionTimeMs: null, response: null, isCorrect: true, labels: { goNoGoType: "no-go", condition: "no-go" } },
];

const inhibition = summarizeGoNoGo(trials);
const qualityFlags = buildQualityFlags({
  commissionErrorRate: inhibition.falseAlarmRate,
  conditionCounts: {
    go: inhibition.goSummary?.counts.total ?? 0,
    noGo: inhibition.noGoSummary?.counts.total ?? 0,
  },
  minimumConditionTrials: 2,
});

const sessionSummary: SessionSummary = {
  summaryType: "session-summary",
  session: { sessionId: "gng-001", participantId: "p-101" },
  summaries: { inhibition },
  qualityFlags,
};

console.log(createSessionSummaryExport(sessionSummary, "2.0.0"));
