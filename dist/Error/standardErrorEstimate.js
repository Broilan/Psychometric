"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardErrorOfEstimate = standardErrorOfEstimate;
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
function standardErrorOfEstimate(observed, predicted, rss, n) {
    // Ensure that either observed/predicted pairs or rss and n are provided
    if (!rss && (!observed || !predicted)) {
        throw new Error("Provide either observed and predicted arrays or a pre-calculated rss with the number of observations.");
    }
    // Check if observed and predicted arrays are the same length
    if (observed && predicted && observed.length !== predicted.length) {
        throw new Error("Observed and predicted arrays must be of the same length.");
    }
    // Calculate RSS if not provided
    const residualSumOfSquares = rss !== null && rss !== void 0 ? rss : (observed && predicted
        ? observed.reduce((sum, obs, i) => sum + Math.pow((obs - predicted[i]), 2), 0)
        : undefined);
    // Calculate sample size if not provided
    const sampleSize = n !== null && n !== void 0 ? n : observed === null || observed === void 0 ? void 0 : observed.length;
    // Ensure both RSS and sample size are available for the calculation
    if (residualSumOfSquares === undefined || sampleSize === undefined) {
        throw new Error("Insufficient data to calculate standard error of estimate. Provide complete data or calculated values.");
    }
    return Math.sqrt(residualSumOfSquares / (sampleSize - 2));
}