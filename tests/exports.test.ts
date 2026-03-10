import { describe, expect, it } from "vitest";

import {
  createNormLookupExport,
  createScaleScoresExport,
  createSessionSummaryExport,
  createTrialRecordsExport,
  lookupNorm,
  scoreLikertScale,
  summarizeReactionTime,
} from "../src";
import {
  choiceReactionTimeTrials,
  wellbeingNorms,
  wellbeingResponses,
  wellbeingScale,
} from "./fixtures/workflows";

describe("export envelopes", () => {
  it("creates versioned session, trial, score, and norm export envelopes", () => {
    const rtSummary = summarizeReactionTime(choiceReactionTimeTrials, { minimumValidTrials: 8 });
    const score = scoreLikertScale(wellbeingScale, wellbeingResponses, {
      minAnswered: 2,
      prorate: true,
      mean: 18,
      standardDeviation: 4,
    });
    const norm = lookupNorm(wellbeingNorms, 24, { age: 25, education: 16 });

    const sessionExport = createSessionSummaryExport(
      {
        summaryType: "session-summary",
        session: { sessionId: "session-1", participantId: "p-1" },
        summaries: {
          reactionTime: rtSummary,
        },
        scores: [score],
        qualityFlags: rtSummary.qualityFlags,
      },
      "2.0.0",
    );
    const trialExport = createTrialRecordsExport(choiceReactionTimeTrials, "2.0.0");
    const scoreExport = createScaleScoresExport([score], "2.0.0");
    const normExport = createNormLookupExport(norm, "2.0.0");

    expect(sessionExport.metadata).toMatchObject({
      kind: "session-summary",
      exportVersion: "1.0.0",
      schemaVersion: "1.0.0",
      packageName: "psychometric",
      packageVersion: "2.0.0",
    });
    expect(trialExport.metadata.kind).toBe("trial-records");
    expect(scoreExport.metadata.kind).toBe("scale-scores");
    expect(normExport.metadata.kind).toBe("norm-lookup");
    expect(normExport.payload.schemaVersion).toBe("1.0.0");
  });
});
