/**
 * Calculate the mean (average) of an array of numbers.
 * @param values - Array of numbers.
 * @returns Mean of the array.
 */
export function mean(values: number[]): number {
    const sum = values.reduce((acc, value) => acc + value, 0);
    return sum / values.length;
}