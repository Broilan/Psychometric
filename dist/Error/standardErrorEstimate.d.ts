/**
 * Calculate the Standard Error of Estimate (SEE).
 * Optionally accepts a pre-calculated residual sum of squares (RSS).
 * @param observed - (Optional) Array of observed values. Required if rss is not provided.
 * @param predicted - (Optional) Array of predicted values. Required if rss is not provided.
 * @param rss - (Optional) Pre-calculated residual sum of squares.
 * @param n - (Optional) Number of observations, required if rss is provided.
 * @returns Standard Error of Estimate.
 * @throws Error if insufficient data is provided to calculate the standard error of estimate.
 */
export declare function standardErrorOfEstimate(observed?: number[], predicted?: number[], rss?: number, n?: number): number;
