import { describe, expect, it } from "vitest";

import {
  cronbachAlpha,
  lookupNorm,
  scoreConfidenceIntervalFromSem,
  scoreLikertScale,
  splitHalfReliability,
  standardErrorOfMeasurement,
} from "../src";
import {
  reliabilityMatrix,
  wellbeingNorms,
  wellbeingResponses,
  wellbeingScale,
} from "./fixtures/workflows";

describe("scoring, norms, and reliability workflows", () => {
  it("scores a questionnaire with reverse scoring, subscales, prorating, transforms, and QC flags", () => {
    const result = scoreLikertScale(wellbeingScale, wellbeingResponses, {
      minAnswered: 2,
      prorate: true,
      mean: 18,
      standardDeviation: 4,
    });

    expect(result.raw).toBe(24);
    expect(result.transforms).toEqual({
      z: 1.5,
      t: 65,
      scaled: 14.5,
      percentile: 100,
      stanine: 8,
    });
    expect(result.subscales?.map((subscale) => ({ id: subscale.id, raw: subscale.raw }))).toEqual([
      { id: "mood", raw: 13 },
      { id: "energy", raw: 10.5 },
    ]);
    expect(result.composites?.map((composite) => ({ id: composite.id, raw: composite.raw }))).toEqual([
      { id: "wellbeingComposite", raw: 23.5 },
    ]);
    expect(result.qualityFlags?.map((flag) => flag.code)).toEqual(["too-much-missing-item-data"]);
  });

  it("looks up matching and non-matching norm rows cleanly", () => {
    const matched = lookupNorm(wellbeingNorms, 24, { age: 25, education: 16 });
    const missing = lookupNorm(wellbeingNorms, 24, { age: 55, education: 16 });

    expect(matched.matched).toBe(true);
    expect(matched.schemaVersion).toBe("1.0.0");
    expect(matched.normed).toMatchObject({
      z: 0.5,
      t: 55,
      scaled: 11,
      percentile: 69,
      stanine: 6,
    });
    expect(matched.interpretation?.label).toBe("Average");

    expect(missing.matched).toBe(false);
    expect(missing.qualityFlags?.[0]?.code).toBe("norm-mismatch");
  });

  it("provides realistic reliability and precision estimates", () => {
    const alpha = cronbachAlpha(reliabilityMatrix);
    const splitHalf = splitHalfReliability(reliabilityMatrix);
    const sem = standardErrorOfMeasurement(4, 0.84);
    const interval = scoreConfidenceIntervalFromSem(24, sem);

    expect(alpha).toBeCloseTo(0.994128, 6);
    expect(splitHalf).toBeCloseTo(0.986159, 6);
    expect(sem).toBeCloseTo(1.6, 6);
    expect(interval).toEqual({
      lower: 20.864,
      upper: 27.136,
    });
  });
});
