/**
 * Calculate the median of an array of numbers.
 * @param values - Array of numbers.
 * @returns Median of the array.
 */
export function median(values: number[]): number {
    if (values.length === 0) throw new Error("Cannot calculate median of an empty array.");

    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    return sorted.length % 2 !== 0
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2;
}