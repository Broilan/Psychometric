import { standardDeviation } from "../Statistics";

/**
 * Calculate the standard error of the mean (SEM) for an array of numbers.
 * @param values - Array of numbers.
 * @returns Standard error of the mean.
 */
export function standardError(values: number[]): number {
    return standardDeviation(values) / Math.sqrt(values.length);
}
