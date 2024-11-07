import { mean } from "./mean";
import { standardDeviation } from "./standardDeviation";

/**
 * Calculate the skewness of an array of numbers.
 * @param values - Array of numbers.
 * @returns Skewness of the data.
 * @throws Error if the array is empty or has a standard deviation of zero.
 */
export function skewness(values: number[]): number {
    if (values.length === 0) throw new Error("Cannot calculate skewness of an empty array.");

    const meanValue = mean.arithmetic(values);
    const n = values.length;
    const stdDev = standardDeviation(values);

    if (stdDev === 0) return 0; // No skewness if all values are identical

    return (
        (n / ((n - 1) * (n - 2))) *
        values.reduce((acc, value) => acc + ((value - meanValue) / stdDev) ** 3, 0)
    );
}

