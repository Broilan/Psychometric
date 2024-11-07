/**
 * Calculate the Standard Error of Estimate (SEE).
 * @param observed - Array of observed values.
 * @param predicted - Array of predicted values.
 * @returns Standard Error of Estimate.
 */
export function standardErrorOfEstimate(observed: number[], predicted: number[]): number {
    if (observed.length !== predicted.length) throw new Error("Arrays must be of the same length");
    
    const n = observed.length;
    const residualSumOfSquares = observed.reduce((sum, obs, i) => sum + (obs - predicted[i]) ** 2, 0);
    
    return Math.sqrt(residualSumOfSquares / (n - 2));
}
