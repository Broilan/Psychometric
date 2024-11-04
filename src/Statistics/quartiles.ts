import { percentile } from "./percentiles";

/**
 * Calculate the quartiles (Q1, Q2, Q3) of an array of numbers.
 * @param values - Array of numbers.
 * @returns An object with Q1, median (Q2), and Q3.
 */
export function quartiles(values: number[]): { Q1: number; Q2: number; Q3: number } {
    return {
        Q1: percentile(values, 0.25),
        Q2: percentile(values, 0.5),
        Q3: percentile(values, 0.75),
    };
}
