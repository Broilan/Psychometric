/**
 * Calculate the percentile rank of a value within a dataset.
 * @param values - Array of numbers.
 * @param percentile - Percentile to calculate (e.g., 0.5 for the 50th percentile).
 * @returns The value at the given percentile.
 * @throws Error if the percentile is not between 0 and 1 or if the array is empty.
 */
export function percentile(values: number[], percentile: number): number {
    if (values.length === 0) throw new Error("Cannot calculate percentile of an empty array.");
    if (percentile < 0 || percentile > 1) throw new Error("Percentile must be between 0 and 1.");

    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil(percentile * sorted.length) - 1;

    return sorted[Math.max(0, index)];
}

