import { standardDeviation, mean } from '../Statistics';

/**
 * Calculate the Z-score (standard score) for a given raw score.
 * Optionally accepts pre-calculated mean and standard deviation.
 * @param value - The raw score.
 * @param meanValue - (Optional) Mean of the distribution.
 * @param stdDev - (Optional) Standard deviation of the distribution.
 * @returns Z-score.
 * @throws Error if insufficient data is provided to calculate the Z-score.
 */
export function zScore(value: number, meanValue?: number, stdDev?: number): number {
    if (meanValue === undefined || stdDev === undefined) {
        throw new Error("Mean and standard deviation must be provided for Z-score calculation.");
    }
    return (value - meanValue) / stdDev;
}

/**
 * Calculate the Z-scores for each value in an array relative to the dataset.
 * Optionally accepts pre-calculated mean and standard deviation.
 * @param values - Array of raw scores.
 * @param meanValue - (Optional) Mean of the distribution.
 * @param stdDev - (Optional) Standard deviation of the distribution.
 * @returns Array of Z-scores corresponding to each value in the dataset.
 */
export function zScores(values: number[], meanValue?: number, stdDev?: number): number[] {
    const calculatedMean = meanValue ?? mean.arithmetic(values);
    const calculatedStdDev = stdDev ?? standardDeviation(values);

    return values.map(value => zScore(value, calculatedMean, calculatedStdDev));
}



