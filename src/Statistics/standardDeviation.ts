import { variance } from "./variance";

/**
 * Calculate the standard deviation of an array of numbers.
 * @param values - Array of numbers.
 * @returns Standard deviation of the array.
 */
export function standardDeviation(values: number[]): number {
    return Math.sqrt(variance(values));
}