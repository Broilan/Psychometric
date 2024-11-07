import { marginOfError } from './marginOfError';

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
export function confidenceInterval(
    meanValue: number, 
    stdDev?: number, 
    sampleSize?: number, 
    zScore: number = 1.96, 
    moe?: number
): { lower: number; upper: number } {
    // If margin of error is not provided, calculate it
    const calculatedMoE = moe ?? (stdDev !== undefined && sampleSize !== undefined 
        ? marginOfError(stdDev, sampleSize, zScore) 
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

