/**
 * Calculate the Margin of Error (MoE) for a given confidence level.
 * @param stdDev - Standard deviation of the sample.
 * @param sampleSize - Sample size (n).
 * @param zScore - Z-score corresponding to the desired confidence level (default is 1.96 for 95% confidence).
 * @returns Margin of Error.
 */
function marginOfError(stdDev: number, sampleSize: number, zScore: number = 1.96): number {
    return zScore * (stdDev / Math.sqrt(sampleSize));
}
