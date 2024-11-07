/**
 * Calculate the Spearman correlation between two arrays of numbers.
 * Optionally accepts pre-calculated ranks.
 * @param x - (Optional) First array of numbers. Required if rankX and rankY are not provided.
 * @param y - (Optional) Second array of numbers. Required if rankX and rankY are not provided.
 * @param rankX - (Optional) Pre-calculated ranks for the first dataset.
 * @param rankY - (Optional) Pre-calculated ranks for the second dataset.
 * @returns Spearman correlation coefficient (rs).
 * @throws Error if insufficient data is provided to calculate the Spearman correlation.
 */
export declare function spearmanRankCorrelationCoefficient(x?: number[], y?: number[], rankX?: number[], rankY?: number[]): number;
