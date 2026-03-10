import { assertSameLength, ensureFiniteNumbers } from "./math";
import { correlation, mean, standardDeviation, variance } from "./stats";

export function cohensD(
  left: readonly number[],
  right: readonly number[],
  pooled = true,
): number {
  const a = ensureFiniteNumbers(left, "left");
  const b = ensureFiniteNumbers(right, "right");
  if (!a.length || !b.length) {
    return 0;
  }

  const denominator = pooled
    ? Math.sqrt((((a.length - 1) * variance(a) + (b.length - 1) * variance(b)) / (a.length + b.length - 2)) || 0)
    : Math.sqrt((variance(a) + variance(b)) / 2);

  if (!denominator) {
    return 0;
  }

  return (mean(a) - mean(b)) / denominator;
}

export function hedgesG(left: readonly number[], right: readonly number[]): number {
  const d = cohensD(left, right);
  const n = left.length + right.length;
  if (n <= 3) {
    return d;
  }
  return d * (1 - 3 / (4 * n - 9));
}

export function pointBiserialFromGroups(binary: readonly number[], continuous: readonly number[]): number {
  assertSameLength(binary, continuous, "binary and continuous");
  return correlation(binary, continuous);
}

export function standardizedMeanDifference(
  baseline: readonly number[],
  followUp: readonly number[],
): number {
  const left = ensureFiniteNumbers(baseline, "baseline");
  const right = ensureFiniteNumbers(followUp, "followUp");
  assertSameLength(left, right, "baseline and followUp");
  const diffs = right.map((value, index) => value - left[index]);
  const sd = standardDeviation(diffs);
  return sd ? mean(diffs) / sd : 0;
}
