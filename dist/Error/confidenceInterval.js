"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confidenceInterval = confidenceInterval;
const marginOfError_1 = require("./marginOfError");
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
function confidenceInterval(meanValue, stdDev, sampleSize, zScore = 1.96, moe) {
    // If margin of error is not provided, calculate it
    const calculatedMoE = moe !== null && moe !== void 0 ? moe : (stdDev !== undefined && sampleSize !== undefined
        ? (0, marginOfError_1.marginOfError)(stdDev, sampleSize, zScore)
        : undefined);
    // Ensure we have margin of error for the calculation
    if (calculatedMoE === undefined) {
        throw new Error("Insufficient data to calculate confidence interval. Provide either stdDev, sampleSize, and zScore or a pre-calculated moe.");
    }
    return {
        lower: meanValue - calculatedMoE,
        upper: meanValue + calculatedMoE
    };
}
