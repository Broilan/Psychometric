/**
 * Calculate the Margin of Error (MoE) for a given confidence level.
 * Optionally accepts a pre-calculated standard error.
 * @param stdDev - (Optional) Standard deviation of the sample, required if standardError is not provided.
 * @param sampleSize - (Optional) Sample size (n), required if standardError is not provided.
 * @param zScore - Z-score corresponding to the desired confidence level (default is 1.96 for 95% confidence).
 * @param standardError - (Optional) Pre-calculated standard error.
 * @returns Margin of Error.
 * @throws Error if insufficient data is provided to calculate the margin of error.
 */
export declare function marginOfError(stdDev?: number, sampleSize?: number, zScore?: number, standardError?: number): number;
