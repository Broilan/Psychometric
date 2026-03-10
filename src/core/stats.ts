import { assertSameLength, clamp, ensureFiniteNumbers, numericSort, sum } from "./math";

export interface DescriptiveStats {
  count: number;
  mean: number;
  median: number;
  variance: number;
  standardDeviation: number;
  min: number;
  max: number;
  q1: number;
  q3: number;
  iqr: number;
  mad: number;
}

export interface ConfidenceIntervalResult {
  level: number;
  estimate: number;
  margin: number;
  lower: number;
  upper: number;
}

export interface BootstrapResult {
  observed: number;
  replicates: number[];
  confidenceInterval?: ConfidenceIntervalResult;
}

export interface PermutationResult {
  observed: number;
  nullDistribution: number[];
  pValue: number;
}

export function mean(values: readonly number[]): number {
  const numbers = ensureFiniteNumbers(values);
  return sum(numbers) / numbers.length;
}

export function median(values: readonly number[]): number {
  return quantile(values, 0.5);
}

export function variance(values: readonly number[], sample = true): number {
  const numbers = ensureFiniteNumbers(values);
  if (numbers.length < 2) {
    return 0;
  }

  const average = mean(numbers);
  const denominator = sample ? numbers.length - 1 : numbers.length;
  return sum(numbers.map((value) => (value - average) ** 2)) / denominator;
}

export function standardDeviation(values: readonly number[], sample = true): number {
  return Math.sqrt(variance(values, sample));
}

export function min(values: readonly number[]): number {
  return Math.min(...ensureFiniteNumbers(values));
}

export function max(values: readonly number[]): number {
  return Math.max(...ensureFiniteNumbers(values));
}

export function quantile(values: readonly number[], p: number): number {
  const numbers = numericSort(ensureFiniteNumbers(values));
  const bounded = clamp(p, 0, 1);
  const index = (numbers.length - 1) * bounded;
  const lowerIndex = Math.floor(index);
  const upperIndex = Math.ceil(index);
  if (lowerIndex === upperIndex) {
    return numbers[lowerIndex];
  }

  const weight = index - lowerIndex;
  return numbers[lowerIndex] * (1 - weight) + numbers[upperIndex] * weight;
}

export function iqr(values: readonly number[]): number {
  return quantile(values, 0.75) - quantile(values, 0.25);
}

export function mad(values: readonly number[]): number {
  const med = median(values);
  return median(values.map((value) => Math.abs(value - med)));
}

export function summarize(values: readonly number[]): DescriptiveStats {
  const numbers = ensureFiniteNumbers(values);
  const q1 = quantile(numbers, 0.25);
  const q3 = quantile(numbers, 0.75);
  return {
    count: numbers.length,
    mean: mean(numbers),
    median: median(numbers),
    variance: variance(numbers),
    standardDeviation: standardDeviation(numbers),
    min: min(numbers),
    max: max(numbers),
    q1,
    q3,
    iqr: q3 - q1,
    mad: mad(numbers),
  };
}

export function zScores(values: readonly number[]): number[] {
  const numbers = ensureFiniteNumbers(values);
  const average = mean(numbers);
  const sd = standardDeviation(numbers);
  if (!sd) {
    return numbers.map(() => 0);
  }
  return numbers.map((value) => (value - average) / sd);
}

export function rank(values: readonly number[]): number[] {
  const numbers = ensureFiniteNumbers(values);
  const sorted = numbers
    .map((value, index) => ({ value, index }))
    .sort((a, b) => a.value - b.value);

  const ranks = Array.from({ length: numbers.length }, () => 0);
  let cursor = 0;
  while (cursor < sorted.length) {
    let end = cursor;
    while (end + 1 < sorted.length && sorted[end + 1].value === sorted[cursor].value) {
      end += 1;
    }
    const averageRank = (cursor + end + 2) / 2;
    for (let i = cursor; i <= end; i += 1) {
      ranks[sorted[i].index] = averageRank;
    }
    cursor = end + 1;
  }

  return ranks;
}

export function percentileOfScore(values: readonly number[], score: number): number {
  const numbers = numericSort(ensureFiniteNumbers(values));
  const below = numbers.filter((value) => value < score).length;
  const equal = numbers.filter((value) => value === score).length;
  return ((below + 0.5 * equal) / numbers.length) * 100;
}

export function trim(values: readonly number[], proportion = 0.1): number[] {
  const numbers = numericSort(ensureFiniteNumbers(values));
  const trimCount = Math.floor(numbers.length * clamp(proportion, 0, 0.49));
  return numbers.slice(trimCount, numbers.length - trimCount);
}

export function winsorize(values: readonly number[], proportion = 0.1): number[] {
  const numbers = numericSort(ensureFiniteNumbers(values));
  const trimCount = Math.floor(numbers.length * clamp(proportion, 0, 0.49));
  if (!trimCount) {
    return numbers;
  }

  const lower = numbers[trimCount];
  const upper = numbers[numbers.length - trimCount - 1];
  return numbers.map((value, index) => {
    if (index < trimCount) {
      return lower;
    }
    if (index >= numbers.length - trimCount) {
      return upper;
    }
    return value;
  });
}

function inverseStandardNormal(probability: number): number {
  const p = clamp(probability, 1e-10, 1 - 1e-10);
  const a = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924];
  const b = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857];
  const c = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878];
  const d = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742];
  const plow = 0.02425;
  const phigh = 1 - plow;

  if (p < plow) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }

  if (p > phigh) {
    const q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }

  const q = p - 0.5;
  const r = q * q;
  return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
    (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}

export function confidenceIntervalMean(
  values: readonly number[],
  level = 0.95,
): ConfidenceIntervalResult {
  const numbers = ensureFiniteNumbers(values);
  const estimate = mean(numbers);
  const se = standardDeviation(numbers) / Math.sqrt(numbers.length);
  const z = inverseStandardNormal(0.5 + level / 2);
  const margin = z * se;
  return {
    level,
    estimate,
    margin,
    lower: estimate - margin,
    upper: estimate + margin,
  };
}

export function bootstrap(
  values: readonly number[],
  estimator: (sample: readonly number[]) => number,
  iterations = 1000,
  level = 0.95,
): BootstrapResult {
  const numbers = ensureFiniteNumbers(values);
  const observed = estimator(numbers);
  const replicates = Array.from({ length: iterations }, () => {
    const sample = Array.from({ length: numbers.length }, () => numbers[Math.floor(Math.random() * numbers.length)]);
    return estimator(sample);
  });

  return {
    observed,
    replicates,
    confidenceInterval: {
      level,
      estimate: observed,
      margin: 0,
      lower: quantile(replicates, (1 - level) / 2),
      upper: quantile(replicates, 1 - (1 - level) / 2),
    },
  };
}

export function permutationTest(
  left: readonly number[],
  right: readonly number[],
  statistic: (a: readonly number[], b: readonly number[]) => number,
  iterations = 1000,
): PermutationResult {
  const leftValues = ensureFiniteNumbers(left, "left");
  const rightValues = ensureFiniteNumbers(right, "right");
  const observed = statistic(leftValues, rightValues);
  const pool = [...leftValues, ...rightValues];
  const nullDistribution = Array.from({ length: iterations }, () => {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const a = shuffled.slice(0, leftValues.length);
    const b = shuffled.slice(leftValues.length);
    return statistic(a, b);
  });
  const extreme = nullDistribution.filter((value) => Math.abs(value) >= Math.abs(observed)).length;
  return {
    observed,
    nullDistribution,
    pValue: (extreme + 1) / (iterations + 1),
  };
}

export function covariance(left: readonly number[], right: readonly number[], sample = true): number {
  const a = ensureFiniteNumbers(left, "left");
  const b = ensureFiniteNumbers(right, "right");
  assertSameLength(a, b, "left and right");
  const leftMean = mean(a);
  const rightMean = mean(b);
  const denominator = sample ? a.length - 1 : a.length;
  if (denominator <= 0) {
    return 0;
  }
  return sum(a.map((value, index) => (value - leftMean) * (b[index] - rightMean))) / denominator;
}

export function correlation(left: readonly number[], right: readonly number[]): number {
  const sdLeft = standardDeviation(left);
  const sdRight = standardDeviation(right);
  if (!sdLeft || !sdRight) {
    return 0;
  }
  return covariance(left, right) / (sdLeft * sdRight);
}

export function pointBiserial(binary: readonly number[], continuous: readonly number[]): number {
  const labels = ensureFiniteNumbers(binary, "binary");
  const values = ensureFiniteNumbers(continuous, "continuous");
  assertSameLength(labels, values, "binary and continuous");
  const ones = values.filter((_, index) => labels[index] === 1);
  const zeros = values.filter((_, index) => labels[index] === 0);
  if (!ones.length || !zeros.length) {
    return 0;
  }
  const p = ones.length / labels.length;
  const q = 1 - p;
  const sd = standardDeviation(values);
  if (!sd) {
    return 0;
  }
  return ((mean(ones) - mean(zeros)) / sd) * Math.sqrt(p * q);
}
