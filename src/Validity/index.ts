/**
 * Experimental validity helpers. These are useful building blocks, but they
 * are intentionally not exposed as first-class stable top-level exports yet.
 */
import { cohensD } from "../core/effects";
import { assertSameLength, ensureFiniteNumbers, sum } from "../core/math";
import { correlation, mean, pointBiserial } from "../core/stats";

export function convergentDiscriminantSummary(
  convergent: readonly number[],
  discriminant: readonly number[],
): {
  averageConvergent: number;
  averageDiscriminant: number;
  contrast: number;
} {
  const convergentValues = ensureFiniteNumbers(convergent, "convergent");
  const discriminantValues = ensureFiniteNumbers(discriminant, "discriminant");
  const averageConvergent = mean(convergentValues);
  const averageDiscriminant = mean(discriminantValues);
  return {
    averageConvergent,
    averageDiscriminant,
    contrast: averageConvergent - averageDiscriminant,
  };
}

export function criterionCorrelation(scores: readonly number[], criterion: readonly number[]): number {
  return correlation(scores, criterion);
}

export function knownGroupsComparison(
  groupA: readonly number[],
  groupB: readonly number[],
): {
  meanDifference: number;
  effectSizeD: number;
} {
  const a = ensureFiniteNumbers(groupA, "groupA");
  const b = ensureFiniteNumbers(groupB, "groupB");
  return {
    meanDifference: mean(a) - mean(b),
    effectSizeD: cohensD(a, b),
  };
}

function solveLinearSystem(matrix: number[][], vector: number[]): number[] {
  const size = vector.length;
  const augmented = matrix.map((row, index) => [...row, vector[index]]);
  for (let pivot = 0; pivot < size; pivot += 1) {
    let maxRow = pivot;
    for (let row = pivot + 1; row < size; row += 1) {
      if (Math.abs(augmented[row][pivot]) > Math.abs(augmented[maxRow][pivot])) {
        maxRow = row;
      }
    }
    [augmented[pivot], augmented[maxRow]] = [augmented[maxRow], augmented[pivot]];
    const divisor = augmented[pivot][pivot];
    if (!divisor) {
      return Array.from({ length: size }, () => 0);
    }
    for (let column = pivot; column <= size; column += 1) {
      augmented[pivot][column] /= divisor;
    }
    for (let row = 0; row < size; row += 1) {
      if (row === pivot) {
        continue;
      }
      const factor = augmented[row][pivot];
      for (let column = pivot; column <= size; column += 1) {
        augmented[row][column] -= factor * augmented[pivot][column];
      }
    }
  }
  return augmented.map((row) => row[size]);
}

function ols(outcome: readonly number[], predictors: readonly (readonly number[])[]): { r2: number; coefficients: number[] } {
  const y = ensureFiniteNumbers(outcome, "outcome");
  const x = predictors.map((predictor) => ensureFiniteNumbers(predictor, "predictor"));
  x.forEach((predictor) => assertSameLength(y, predictor, "outcome and predictor"));
  const design = y.map((_, rowIndex) => [1, ...x.map((predictor) => predictor[rowIndex])]);
  const xtx = Array.from({ length: design[0].length }, (_, row) =>
    Array.from({ length: design[0].length }, (_, column) =>
      sum(design.map((designRow) => designRow[row] * designRow[column])),
    ),
  );
  const xty = Array.from({ length: design[0].length }, (_, row) =>
    sum(design.map((designRow, index) => designRow[row] * y[index])),
  );
  const coefficients = solveLinearSystem(xtx, xty);
  const predictions = design.map((row) => sum(row.map((value, index) => value * coefficients[index])));
  const yMean = mean(y);
  const ssTotal = sum(y.map((value) => (value - yMean) ** 2));
  const ssError = sum(y.map((value, index) => (value - predictions[index]) ** 2));
  return {
    r2: ssTotal ? 1 - ssError / ssTotal : 0,
    coefficients,
  };
}

export function incrementalValidity(
  outcome: readonly number[],
  baselinePredictors: readonly (readonly number[])[],
  addedPredictors: readonly (readonly number[])[],
): {
  baselineR2: number;
  fullModelR2: number;
  deltaR2: number;
} {
  const baseline = ols(outcome, baselinePredictors);
  const full = ols(outcome, [...baselinePredictors, ...addedPredictors]);
  return {
    baselineR2: baseline.r2,
    fullModelR2: full.r2,
    deltaR2: full.r2 - baseline.r2,
  };
}

export function rocCurve(
  scores: readonly number[],
  labels: readonly number[],
): {
  points: Array<{ threshold: number; sensitivity: number; specificity: number }>;
  auc: number;
} {
  const numericScores = ensureFiniteNumbers(scores, "scores");
  const numericLabels = ensureFiniteNumbers(labels, "labels");
  assertSameLength(numericScores, numericLabels, "scores and labels");
  const thresholds = [...new Set(numericScores)].sort((a, b) => b - a);
  const positives = numericLabels.filter((label) => label === 1).length;
  const negatives = numericLabels.filter((label) => label === 0).length;
  const points = thresholds.map((threshold) => {
    let tp = 0;
    let tn = 0;
    numericScores.forEach((score, index) => {
      const predictedPositive = score >= threshold;
      const actualPositive = numericLabels[index] === 1;
      if (predictedPositive && actualPositive) tp += 1;
      if (!predictedPositive && !actualPositive) tn += 1;
    });
    return {
      threshold,
      sensitivity: positives ? tp / positives : 0,
      specificity: negatives ? tn / negatives : 0,
    };
  });
  const sorted = [...points].sort((a, b) => (1 - a.specificity) - (1 - b.specificity));
  let auc = 0;
  for (let i = 1; i < sorted.length; i += 1) {
    const x1 = 1 - sorted[i - 1].specificity;
    const x2 = 1 - sorted[i].specificity;
    const y1 = sorted[i - 1].sensitivity;
    const y2 = sorted[i].sensitivity;
    auc += ((y1 + y2) / 2) * (x2 - x1);
  }
  return { points, auc };
}

export function screeningAssociation(scores: readonly number[], labels: readonly number[]): number {
  return pointBiserial(labels, scores);
}
