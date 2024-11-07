import { standardDeviation, mean } from '../Statistics';
import { zScore } from './zScore';

/**
 * Calculate the T-score for a given raw score.
 * Optionally accepts pre-calculated mean and standard deviation.
 * @param value - The raw score.
 * @param meanValue - (Optional) Mean of the distribution. Required if stdDev is provided.
 * @param stdDev - (Optional) Standard deviation of the distribution.
 * @returns T-score.
 * @throws Error if insufficient data is provided to calculate the T-score.
 */
export function tScore(value: number, meanValue?: number, stdDev?: number): number {
    if (meanValue === undefined || stdDev === undefined) {
        throw new Error("Mean and standard deviation must be provided for T-score calculation.");
    }
    const z = zScore(value, meanValue, stdDev);
    return 50 + 10 * z;
}

/**
 * Calculate the T-scores for each value in an array relative to the dataset.
 * Optionally accepts pre-calculated mean and standard deviation.
 * @param values - Array of raw scores.
 * @param meanValue - (Optional) Mean of the distribution.
 * @param stdDev - (Optional) Standard deviation of the distribution.
 * @returns Array of T-scores corresponding to each value in the dataset.
 */
export function tScores(values: number[], meanValue?: number, stdDev?: number): number[] {
    const calculatedMean = meanValue ?? mean.arithmetic(values);
    const calculatedStdDev = stdDev ?? standardDeviation(values);

    return values.map(value => tScore(value, calculatedMean, calculatedStdDev));
}

