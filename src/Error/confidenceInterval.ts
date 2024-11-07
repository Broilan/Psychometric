import { marginOfError } from './marginOfError';

/**
 * Calculate the Confidence Interval (CI) for a given confidence level.
 * @param meanValue - Sample mean.
 * @param stdDev - Standard deviation of the sample.
 * @param sampleSize - Sample size (n).
 * @param zScore - Z-score corresponding to the desired confidence level (default is 1.96 for 95% confidence).
 * @returns Object containing lower and upper bounds of the confidence interval.
 */
export function confidenceInterval(meanValue: number, stdDev: number, sampleSize: number, zScore: number = 1.96): { lower: number; upper: number } {
    const moe = marginOfError(stdDev, sampleSize, zScore);
    
    return {
        lower: meanValue - moe,
        upper: meanValue + moe
    };
}
