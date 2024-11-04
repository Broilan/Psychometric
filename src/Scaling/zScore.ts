import { standardDeviation, mean } from '../Statistics';

/**
 * Calculate the Z-score (standard score) for a given raw score.
 * @param value - The raw score.
 * @param meanValue - Mean of the distribution.
 * @param stdDev - Standard deviation of the distribution.
 * @returns Z-score.
 */
export function zScore(value: number, meanValue: number, stdDev: number): number {
    return (value - meanValue) / stdDev;
}

/**
 * Calculate the Z-scores for each value in an array relative to the dataset.
 * @param values - Array of raw scores.
 * @returns Array of Z-scores corresponding to each value in the dataset.
 */
export function zScores(values: number[]): number[] {
    const meanValue = mean(values);
    const stdDev = standardDeviation(values);

    return values.map(value => zScore(value, meanValue, stdDev));
}


