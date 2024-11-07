/**
 * Calculate the Confidence Interval (CI) for a given confidence level.
 * Optionally accepts a pre-calculated margin of error.
 * @param meanValue - Sample mean.
 * @param stdDev - (Optional) Standard deviation of the sample, required if moe is not provided.
 * @param sampleSize - (Optional) Sample size (n), required if moe is not provided.
 * @param zScore - (Optional) Z-score corresponding to the desired confidence level (default is 1.96 for 95% confidence).
 * @param moe - (Optional) Pre-calculated margin of error.
 * @returns Object containing lower and upper bounds of the confidence interval.
 * @throws Error if insufficient data is provided to calculate the confidence interval.
 */
export declare function confidenceInterval(meanValue: number, stdDev?: number, sampleSize?: number, zScore?: number, moe?: number): {
    lower: number;
    upper: number;
};
