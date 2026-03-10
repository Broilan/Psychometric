import {
  buildQualityFlags,
  createNormLookupExport,
  createScaleScoresExport,
  lookupNorm,
  scoreLikertScale,
  type NormTable,
  type ScaleDefinition,
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

const score = scoreLikertScale(scale, { i1: 4, i2: 2, i3: 5, i4: 3 }, { mean: 12, standardDeviation: 3 });
const flags = buildQualityFlags({
  responses: [4, 2, 5, 3],
});
const norm = lookupNorm(norms, score.raw ?? 0, { age: 24 });

console.log(createScaleScoresExport([score], "2.0.0"));
console.log(createNormLookupExport(norm, "2.0.0"));
console.log(flags);
