import { mean } from "./mean";

/**
 * Calculate the variance of an array of numbers.
 * @param values - Array of numbers.
 * @returns Variance of the array.
 */
export function variance(values: number[]): number {
    const meanValue = mean(values);
    return values.reduce((acc, value) => acc + (value - meanValue) ** 2, 0) / (values.length - 1);
}

