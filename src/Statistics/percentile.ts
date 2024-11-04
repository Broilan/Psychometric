/**
 * Calculate the percentile rank of a value within a dataset.
 * @param values - Array of numbers.
 * @param percentile - Percentile to calculate (e.g., 0.5 for the 50th percentile).
 * @returns The value at the given percentile.
 */
export function percentile(values: number[], percentile: number): number {
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil(percentile * sorted.length) - 1;
    return sorted[Math.max(0, index)];
}
