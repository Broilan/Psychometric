# psychometric

`psychometric` is a TypeScript-first toolkit for psychometric scoring, behavioral task summaries, quality-control flags, norm lookup plumbing, and versioned measurement exports.

It is designed for practical assessment workflows in JavaScript and TypeScript, especially:

- choice reaction time
- simple reaction time
- span / block tapping / sequence tasks
- questionnaire and scale scoring
- repeated-session and exportable scoring pipelines

## Stable scope

The stable package surface is focused on first-production workflows:

- reaction-time session summaries from `TrialRecord[]`
- go/no-go and condition-based inhibition summaries
- congruency, cueing, and switching contrasts for interference-style tasks
- span / sequence task summaries
- recognition-memory and paired-associate summaries
- processing-speed summaries
- questionnaire scoring with reverse scoring, subscales, composites, prorating, and transforms
- practical reliability and score-precision helpers
- norm lookup, QC bundles, and versioned export envelopes
- repeated-session comparison summaries

## Experimental scope

Some utilities remain intentionally isolated under `experimental` rather than treated as part of the strongest API guarantees:

- bootstrap and permutation scaffolding
- omega total from externally supplied factor parameters
- advanced validity helpers such as incremental validity and ROC/AUC summaries

## Installation

```bash
npm install psychometric
```

## Stable modules

- `behavioral`: reaction-time classification and summary helpers, span/sequence summaries, practice vs scored separation
- `scores`: reverse scoring, prorating, subscales, composites, transformed scores, and change/discrepancy helpers
- `reliability`: Cronbach's alpha, split-half reliability, Spearman-Brown, item-total correlations, SEM, and score confidence intervals
- `norms`: generic norm-table lookup and raw-to-normed score conversion infrastructure
- `qc`: reusable quality-flag generation for timing, missingness, protocol mismatch, and session completeness
- `exports`: versioned metadata envelopes for session summaries, trial exports, scale-score exports, and norm lookup exports
- `schemas`: reusable TS types for trials, scales, scores, sessions, norms, and export envelopes
- `core`: lower-level statistical utilities for library-style consumers who want direct access to primitives

## Example: Reaction-Time Summary

```ts
import {
  buildQualityFlags,
  summarizeReactionTime,
  type TrialRecord,
} from "psychometric";

const trials: TrialRecord[] = [
  { id: "t1", blockId: "early", stimulusSide: "left", reactionTimeMs: 320, isCorrect: true },
  { id: "t2", blockId: "early", stimulusSide: "right", reactionTimeMs: 340, isCorrect: true },
  { id: "t3", blockId: "late", stimulusSide: "left", reactionTimeMs: 390, isCorrect: true },
  { id: "t4", blockId: "late", stimulusSide: "right", reactionTimeMs: null, isCorrect: false },
];

const reactionTime = summarizeReactionTime(trials, {
  minimumValidTrials: 3,
});

const qualityFlags = buildQualityFlags({
  reactionTimeSummary: reactionTime,
  minimumValidTrials: 3,
});

const workflow = {
  reactionTime,
  qualityFlags,
};

console.log(workflow);
```

## Example: Scale And Subscale Scoring

```ts
import {
  scoreLikertScale,
  type ScaleDefinition,
} from "psychometric";

const scale: ScaleDefinition<number> = {
  id: "wellbeing",
  items: [
    { id: "i1", min: 1, max: 5, subscale: "mood" },
    { id: "i2", min: 1, max: 5, subscale: "mood", reverse: true },
    { id: "i3", min: 1, max: 5, subscale: "mood" },
    { id: "i4", min: 1, max: 5, subscale: "energy" },
    { id: "i5", min: 1, max: 5, subscale: "energy", reverse: true },
    { id: "i6", min: 1, max: 5, subscale: "energy" },
  ],
  subscales: {
    mood: ["i1", "i2", "i3"],
    energy: ["i4", "i5", "i6"],
  },
  composites: {
    wellbeingComposite: ["mood", "energy"],
  },
  scoring: {
    allowProrating: true,
    minAnswered: 4,
    maxMissingRate: 0.1,
  },
};

const score = scoreLikertScale(
  scale,
  { i1: 4, i2: 2, i3: 5, i4: 3, i5: null, i6: 4 },
  { minAnswered: 2, prorate: true, mean: 18, standardDeviation: 4 },
);

const questionnaireWorkflow = {
  score,
  subscales: score.subscales,
  transforms: score.transforms,
  qualityFlags: score.qualityFlags,
};

console.log(questionnaireWorkflow);
```

## Example: Norm Lookup, QC, And Versioned Export

```ts
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

const score = scoreLikertScale(scale, { i1: 4, i2: 2, i3: 5, i4: 3 });
if (score.raw === null) {
  throw new Error("A raw score is required before norm lookup can run.");
}

const qualityFlags = buildQualityFlags({ responses: [4, 2, 5, 3] });
const normLookup = lookupNorm(norms, score.raw, { age: 24 });

const workflow = {
  score,
  qualityFlags,
  normLookup,
  scoreExport: createScaleScoresExport([score], "2.0.0"),
  normExport: createNormLookupExport(normLookup, "2.0.0"),
};

console.log(workflow);
```

## Public API shape

Stable workflow functions are exported directly:

```ts
import {
  summarizeReactionTime,
  scoreSpanTask,
  scoreLikertScale,
  cronbachAlpha,
  splitHalfReliability,
  standardErrorOfMeasurement,
  lookupNorm,
  buildQualityFlags,
  createSessionSummaryExport,
} from "psychometric";
```

Stable groups are also available as namespaces:

```ts
import { behavioral, core, scores, reliability, norms, qc, exports } from "psychometric";
```

Experimental helpers remain explicitly isolated:

```ts
import { experimental } from "psychometric";
```

## Output discipline

Versioned exports use explicit metadata envelopes with:

- `kind`
- `exportVersion`
- `schemaVersion`
- `packageName`
- `packageVersion`
- `generatedAt`

## Examples folder

Additional integration-oriented examples live in:

- `examples/reaction-time-session.ts`
- `examples/go-no-go-session.ts`
- `examples/scale-scoring.ts`
- `examples/norms-qc-export.ts`
- `examples/repeated-session-comparison.ts`

## Development

```bash
npm test
npm run typecheck
npm run build
```
