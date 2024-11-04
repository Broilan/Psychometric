import { quartiles } from "./quartiles";

/**
 * Calculate the interquartile range (IQR) of an array of numbers.
 * @param values - Array of numbers.
 * @returns The interquartile range.
 */
export function interquartileRange(values: number[]): number {
    const { Q1, Q3 } = quartiles(values);
    return Q3 - Q1;
}
