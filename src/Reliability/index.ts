import { assertSameLength, ensureFiniteNumbers, sum, transposeMatrix } from "../core/math";
import { correlation, covariance, mean, variance } from "../core/stats";

export interface ReliabilityEstimate {
  estimate: number;
  method: string;
  itemCount?: number;
}

export interface ItemStatistic {
  itemIndex: number;
  correlation: number;
}

export function cronbachAlpha(matrix: readonly (readonly number[])[]): number {
  const respondents = matrix.map((row) => ensureFiniteNumbers(row, "row"));
  if (respondents.length < 2 || respondents[0].length < 2) {
    return 0;
  }

  const itemCount = respondents[0].length;
  const itemColumns = transposeMatrix(respondents);
  const itemVarianceSum = sum(itemColumns.map((item) => variance(item)));
  const totalScores = respondents.map((row) => sum(row));
  const totalVariance = variance(totalScores);
  if (!totalVariance) {
    return 0;
  }
  return (itemCount / (itemCount - 1)) * (1 - itemVarianceSum / totalVariance);
}

export function splitHalfReliability(
  matrix: readonly (readonly number[])[],
  split: "odd-even" | "first-second" = "odd-even",
): number {
  const respondents = matrix.map((row) => ensureFiniteNumbers(row, "row"));
  const leftScores = respondents.map((row) =>
    row.filter((_, index) => split === "odd-even" ? index % 2 === 0 : index < row.length / 2).reduce((total, value) => total + value, 0),
  );
  const rightScores = respondents.map((row) =>
    row.filter((_, index) => split === "odd-even" ? index % 2 === 1 : index >= row.length / 2).reduce((total, value) => total + value, 0),
  );
  return spearmanBrown(correlation(leftScores, rightScores), 2);
}

export function spearmanBrown(reliability: number, newLengthFactor = 2): number {
  if (reliability <= -1 || newLengthFactor <= 0) {
    return 0;
  }
  return (newLengthFactor * reliability) / (1 + (newLengthFactor - 1) * reliability);
}

export function testRetestReliability(time1: readonly number[], time2: readonly number[]): number {
  return correlation(time1, time2);
}

export function alternateFormsReliability(formA: readonly number[], formB: readonly number[]): number {
  return correlation(formA, formB);
}

export function interRaterAgreement(raterA: readonly number[], raterB: readonly number[]): number {
  return correlation(raterA, raterB);
}

export function cohensKappa(raterA: readonly string[], raterB: readonly string[]): number {
  assertSameLength(raterA, raterB, "raterA and raterB");
  const categories = [...new Set([...raterA, ...raterB])];
  const observed = raterA.filter((value, index) => value === raterB[index]).length / raterA.length;
  const expected = categories.reduce((total, category) => {
    const pA = raterA.filter((value) => value === category).length / raterA.length;
    const pB = raterB.filter((value) => value === category).length / raterB.length;
    return total + pA * pB;
  }, 0);
  return expected === 1 ? 1 : (observed - expected) / (1 - expected);
}

export function itemTotalCorrelations(matrix: readonly (readonly number[])[]): ItemStatistic[] {
  const respondents = matrix.map((row) => ensureFiniteNumbers(row, "row"));
  const itemCount = respondents[0]?.length ?? 0;
  return Array.from({ length: itemCount }, (_, itemIndex) => {
    const itemScores = respondents.map((row) => row[itemIndex]);
    const totalWithoutItem = respondents.map((row) => sum(row) - row[itemIndex]);
    return {
      itemIndex,
      correlation: correlation(itemScores, totalWithoutItem),
    };
  });
}

export function alphaIfItemDeleted(matrix: readonly (readonly number[])[]): ItemStatistic[] {
  const respondents = matrix.map((row) => ensureFiniteNumbers(row, "row"));
  const itemCount = respondents[0]?.length ?? 0;
  return Array.from({ length: itemCount }, (_, itemIndex) => ({
    itemIndex,
    correlation: cronbachAlpha(respondents.map((row) => row.filter((_, index) => index !== itemIndex))),
  }));
}

export function standardErrorOfMeasurement(standardDeviationValue: number, reliability: number): number {
  if (standardDeviationValue < 0 || reliability < 0 || reliability > 1) {
    return 0;
  }
  return standardDeviationValue * Math.sqrt(1 - reliability);
}

export function scoreConfidenceIntervalFromSem(
  observedScore: number,
  sem: number,
  z = 1.96,
): { lower: number; upper: number } {
  return {
    lower: observedScore - z * sem,
    upper: observedScore + z * sem,
  };
}

export interface OmegaTotalInput {
  loadings: readonly number[];
  errorVariances: readonly number[];
}

export function omegaTotal(input: OmegaTotalInput): number | null {
  const loadings = ensureFiniteNumbers(input.loadings, "loadings");
  const errorVariances = ensureFiniteNumbers(input.errorVariances, "errorVariances");
  assertSameLength(loadings, errorVariances, "loadings and errorVariances");
  const numerator = sum(loadings) ** 2;
  const denominator = numerator + sum(errorVariances);
  return denominator ? numerator / denominator : null;
}

export function averageInterItemCovariance(matrix: readonly (readonly number[])[]): number {
  const itemColumns = transposeMatrix(matrix.map((row) => ensureFiniteNumbers(row, "row")));
  const covariances: number[] = [];
  for (let i = 0; i < itemColumns.length; i += 1) {
    for (let j = i + 1; j < itemColumns.length; j += 1) {
      covariances.push(covariance(itemColumns[i], itemColumns[j]));
    }
  }
  return covariances.length ? mean(covariances) : 0;
}
