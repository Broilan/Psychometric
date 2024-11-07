import { variance } from "./variance";

/**
 * Calculate the standard deviation of an array of numbers.
 * @param values - Array of numbers.
 * @param isSample - Boolean indicating if the standard deviation should be for a sample (default: true).
 * @returns Standard deviation of the array.
 */
export function standardDeviation(values: number[], isSample: boolean = true): number {
    const varianceValue = isSample ? variance.sample(values) : variance.population(values);
    return Math.sqrt(varianceValue);
}
