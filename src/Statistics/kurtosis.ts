import { mean } from "./mean";
import { standardDeviation } from "./standardDeviation";

/**
 * Calculate the kurtosis of an array of numbers.
 * @param values - Array of numbers.
 * @returns Kurtosis of the data.
 */
export function kurtosis(values: number[]): number {
    const meanValue = mean(values);
    const n = values.length;
    const stdDev = standardDeviation(values);
    return (
        ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) *
            values.reduce((acc, value) => acc + ((value - meanValue) / stdDev) ** 4, 0) -
        (3 * (n - 1) ** 2) / ((n - 2) * (n - 3))
    );
}

