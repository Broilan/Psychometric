# psychometric

`psychometric` is a TypeScript-first toolkit for psychometric scoring, behavioral task summaries, reliability workflows, norms lookup, and exportable measurement results.

It is designed for:

- questionnaire and scale scoring
- reaction-time and cognitive task summaries
- repeated-session and battery workflows
- psychometric and assessment tooling in JavaScript/TypeScript

The public API is generic. It is suitable for internal instrument pipelines and external JS/TS consumers without exposing product-specific naming.

## Installation

```bash
npm install psychometric
```

## What is included

- `core`: descriptive statistics, missing-data helpers, rank/z transforms, percentile helpers, confidence intervals, bootstrap/permutation scaffolding, and effect sizes
- `schemas`: shared interfaces for items, scales, trials, sessions, scores, norms, QC flags, and exports
- `scores`: reverse scoring, sum/weighted/prorated scores, subscales, composites, change/discrepancy scores, and common score transforms
- `reliability`: Cronbach's alpha, split-half reliability, Spearman-Brown, test-retest, alternate forms, item-total correlations, alpha-if-item-deleted, SEM, and omega-total input-based support
- `behavioral`: reaction-time trial classification, RT summaries, practice/scored separation, span scoring, and sequence error taxonomy helpers
- `norms`: norm table schemas, contextual lookup helpers, and raw-to-normed conversions
- `qc`: schema-driven quality flags for timing, missingness, protocol mismatch, completion, and reliability warnings
- `validity`: convergent/discriminant summaries, criterion correlations, known-groups comparisons, incremental validity summaries, and ROC/AUC helpers
- `exports`: JSON/CSV serialization helpers with versioned export metadata

## Example

```ts
import {
  summarizeReactionTime,
  classifyReactionTimeTrial,
  scoreSpanTask,
  scoreLikertScale,
  cronbachAlpha,
  splitHalfReliability,
  standardErrorOfMeasurement,
  scoreSubscales,
  standardizeZ,
  toTScore,
  lookupNorm,
  buildQualityFlags,
  type ScaleDefinition,
  type TrialRecord,
} from "psychometric";

const trials: TrialRecord[] = [
  { id: "t1", reactionTimeMs: 420, isCorrect: true, stimulusSide: "left" },
  { id: "t2", reactionTimeMs: 390, isCorrect: true, stimulusSide: "right" },
];

const rtSummary = summarizeReactionTime(trials);
const firstTrial = classifyReactionTimeTrial(trials[0]);

const scale: ScaleDefinition<number> = {
  id: "wellbeing",
  items: [
    { id: "i1", min: 1, max: 5 },
    { id: "i2", min: 1, max: 5, reverse: true },
    { id: "i3", min: 1, max: 5 },
  ],
  subscales: {
    positive: ["i1", "i3"],
  },
  scoring: {
    allowProrating: true,
    minAnswered: 2,
    maxMissingRate: 0.34,
  },
};

const score = scoreLikertScale(scale, {
  i1: 4,
  i2: 2,
  i3: 5,
});

const alpha = cronbachAlpha([
  [4, 2, 5],
  [3, 4, 4],
  [5, 1, 5],
]);

const z = standardizeZ(score.raw ?? 0, 10, 3);
const t = toTScore(z);
```

## Design notes

- The package is workflow-oriented rather than a bucket of isolated formulas.
- Result objects are standardized so they compose across scoring, QC, norms, and exports.
- Behavioral support is generic and data-driven rather than tied to named tasks.
- Norm utilities provide infrastructure only. No normative datasets are bundled.
- Advanced estimates are only implemented where the assumptions are explicit. Functions such as omega total require direct factor inputs instead of pretending to estimate a latent model from arbitrary raw data.

## Imports

Top-level imports are the supported runtime entrypoint:

```ts
import { scoreLikertScale, summarizeReactionTime } from "psychometric";
```

## Development

```bash
npm run build
```
