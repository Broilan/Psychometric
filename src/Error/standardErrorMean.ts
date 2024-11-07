import { standardDeviation } from "simple-statistics";

/**
 * Calculate the standard error of the mean (SEM).
 * Optionally accepts a pre-calculated standard deviation and sample size.
 * @param values - (Optional) Array of numbers. Required if stdDev is not provided.
 * @param stdDev - (Optional) Pre-calculated standard deviation of the dataset.
 * @param n - (Optional) Sample size. Required if stdDev is provided.
 * @returns Standard error of the mean.
 * @throws Error if insufficient data is provided to calculate the standard error.
 */
export function standardErrorMean(values?: number[], stdDev?: number, n?: number): number {
    // Calculate standard deviation if not provided and sample size if values are provided
    const calculatedSD = stdDev ?? (values ? standardDeviation(values) : undefined);
    const calculatedN = n ?? values?.length;

    // Ensure we have both a standard deviation and sample size
    if (calculatedSD === undefined || calculatedN === undefined || calculatedN === 0) {
        throw new Error("Insufficient data to calculate standard error. Provide either values or both stdDev and n.");
    }

    return calculatedSD / Math.sqrt(calculatedN);
}


