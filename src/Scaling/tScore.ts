import { standardDeviation, mean } from '../Statistics';
import { zScore } from './zScore';

/**
 * Calculate the T-score for a given raw score.
 * @param value - The raw score.
 * @param meanValue - Mean of the distribution.
 * @param stdDev - Standard deviation of the distribution.
 * @returns T-score.
 */
export function tScore(value: number, meanValue: number, stdDev: number): number {
    const z = zScore(value, meanValue, stdDev);
    return 50 + 10 * z;
}

/**
 * Calculate the T-scores for each value in an array relative to the dataset.
 * @param values - Array of raw scores.
 * @returns Array of T-scores corresponding to each value in the dataset.
 */
export function tScores(values: number[]): number[] {
    const meanValue = mean.arithmetic(values);
    const stdDev = standardDeviation(values);

    return values.map(value => tScore(value, meanValue, stdDev));
}
