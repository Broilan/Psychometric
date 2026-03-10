import {
  scoreLikertScale,
  type ScaleDefinition,
} from "psychometric";

const scale: ScaleDefinition<number> = {
  id: "focus-check",
  items: [
    { id: "i1", min: 1, max: 5, subscale: "focus" },
    { id: "i2", min: 1, max: 5, subscale: "focus", reverse: true },
    { id: "i3", min: 1, max: 5, subscale: "focus" },
    { id: "i4", min: 1, max: 5, subscale: "fatigue" },
    { id: "i5", min: 1, max: 5, subscale: "fatigue", reverse: true },
    { id: "i6", min: 1, max: 5, subscale: "fatigue" },
  ],
  subscales: {
    focus: ["i1", "i2", "i3"],
    fatigue: ["i4", "i5", "i6"],
  },
  composites: {
    total: ["focus", "fatigue"],
  },
  scoring: {
    allowProrating: true,
    minAnswered: 4,
    maxMissingRate: 0.1,
  },
};

const result = scoreLikertScale(
  scale,
  { i1: 4, i2: 2, i3: 5, i4: 3, i5: null, i6: 4 },
  { minAnswered: 2, prorate: true, mean: 18, standardDeviation: 4 },
);

console.log(result);
