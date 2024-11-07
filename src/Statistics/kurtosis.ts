import { mean } from "./mean";
import { standardDeviation } from "./standardDeviation";

/**
 * Calculate the kurtosis of an array of numbers.
 * Optionally accepts pre-calculated mean and standard deviation.
 * @param values - (Optional) Array of numbers, required if meanValue and stdDev are not provided.
 * @param meanValue - (Optional) Mean of the dataset.
 * @param stdDev - (Optional) Standard deviation of the dataset.
 * @returns Kurtosis of the data.
 * @throws Error if insufficient data is provided to calculate kurtosis.
 */
export function kurtosis(values?: number[], meanValue?: number, stdDev?: number): number {
    if (!values && (meanValue === undefined || stdDev === undefined)) {
        throw new Error("Provide either an array of values or both meanValue and stdDev.");
    }

    const n = values?.length ?? 0;

    if (values && n < 4) {
        throw new Error("Kurtosis calculation requires at least four values.");
    }

    // Calculate mean and standard deviation if values are provided
    const calculatedMean = meanValue ?? mean.arithmetic(values!);
    const calculatedStdDev = stdDev ?? standardDeviation(values!);

    // Calculate kurtosis
    return (
        ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) *
            values!.reduce((acc, value) => acc + ((value - calculatedMean) / calculatedStdDev) ** 4, 0) -
        (3 * (n - 1) ** 2) / ((n - 2) * (n - 3))
    );
}

