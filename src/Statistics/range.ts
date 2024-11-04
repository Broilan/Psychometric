/**
 * Calculate the range of an array of numbers.
 * @param values - Array of numbers.
 * @returns Range of the array (difference between max and min values).
 */
export function range(values: number[]): number {
    const min = Math.min(...values);
    const max = Math.max(...values);
    return max - min;
}