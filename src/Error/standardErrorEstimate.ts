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
export function standardErrorOfEstimate(
    observed?: number[], 
    predicted?: number[], 
    rss?: number, 
    n?: number
): number {
    // If observed and predicted are provided, calculate RSS and n
    if (!rss && (!observed || !predicted)) {
        throw new Error("Provide either observed and predicted arrays or a pre-calculated rss with the number of observations.");
    }
    
    if (observed && predicted && observed.length !== predicted.length) {
        throw new Error("Observed and predicted arrays must be of the same length.");
    }

    const calculatedRSS = rss ?? (observed && predicted
        ? observed.reduce((sum, obs, i) => sum + (obs - predicted[i]) ** 2, 0)
        : undefined);
    
    const calculatedN = n ?? observed?.length;

    // Ensure we have RSS and n to proceed
    if (calculatedRSS === undefined || calculatedN === undefined) {
        throw new Error("Insufficient data to calculate standard error of estimate.");
    }

    return Math.sqrt(calculatedRSS / (calculatedN - 2));
}

