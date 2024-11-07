/**
 * Calculate the standard error of the mean (SEM).
 * Optionally accepts a pre-calculated standard deviation and sample size.
 * @param values - (Optional) Array of numbers. Required if stdDev is not provided.
 * @param stdDev - (Optional) Pre-calculated standard deviation of the dataset.
 * @param n - (Optional) Sample size. Required if stdDev is provided.
 * @returns Standard error of the mean.
 * @throws Error if insufficient data is provided to calculate the standard error.
 */
export declare function standardErrorMean(values?: number[], stdDev?: number, n?: number): number;
