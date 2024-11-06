import { mean } from "./mean";
import { standardDeviation } from "./standardDeviation";

/**
 * Calculate the skewness of an array of numbers.
 * @param values - Array of numbers.
 * @returns Skewness of the data.
 */
export function skewness(values: number[]): number {
    const meanValue = mean.arithmetic(values);
    const n = values.length;
    const stdDev = standardDeviation(values);
    return (
        (n / ((n - 1) * (n - 2))) *
        values.reduce((acc, value) => acc + ((value - meanValue) / stdDev) ** 3, 0)
    );
}
