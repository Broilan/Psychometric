import {
  buildQualityFlags,
  createNormLookupExport,
  createScaleScoresExport,
  lookupNorm,
  scoreLikertScale,
  type NormTable,
  type ScaleDefinition,
  type SessionSummary,
} from "psychometric";

const scale: ScaleDefinition<number> = {
  id: "wellbeing",
  items: [
    { id: "i1", min: 1, max: 5 },
    { id: "i2", min: 1, max: 5, reverse: true },
    { id: "i3", min: 1, max: 5 },
    { id: "i4", min: 1, max: 5 },
  ],
  scoring: {
    allowProrating: true,
    minAnswered: 3,
    maxMissingRate: 0.25,
  },
};

const norms: NormTable = {
  id: "wellbeing-v1",
  scaleId: "wellbeing",
  version: "2026.1",
  rows: [
    {
      rawMin: 14,
      rawMax: 18,
      ageBand: { label: "18-29", min: 18, max: 29 },
      z: 0.5,
      t: 55,
      percentile: 69,
      stanine: 6,
    },
  ],
};

const score = scoreLikertScale(
  scale,
  { i1: 4, i2: 2, i3: 5, i4: 3 },
  { mean: 12, standardDeviation: 3 },
);

if (score.raw === null) {
  throw new Error("A raw score is required before norm lookup can run.");
}

const qualityFlags = buildQualityFlags({
  responses: [4, 2, 5, 3],
});
const normLookup = lookupNorm(norms, score.raw, { age: 24 });

const workflow: SessionSummary = {
  summaryType: "session-summary",
  session: { sessionId: "wellbeing-001", participantId: "p-003" },
  scores: [score],
  qualityFlags,
  summaries: {
    normLookup,
  },
};

const scoreExport = createScaleScoresExport([score], "2.0.0");
const normExport = createNormLookupExport(normLookup, "2.0.0");

console.log(workflow);
console.log(scoreExport);
console.log(normExport);
