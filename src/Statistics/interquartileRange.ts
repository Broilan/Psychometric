import { quartiles } from "./quartiles";

/**
 * Calculate the interquartile range (IQR) of an array of numbers.
 * Optionally accepts pre-calculated quartiles.
 * @param values - (Optional) Array of numbers, required if Q1 and Q3 are not provided.
 * @param Q1 - (Optional) First quartile of the dataset.
 * @param Q3 - (Optional) Third quartile of the dataset.
 * @returns The interquartile range.
 * @throws Error if insufficient data is provided to calculate the IQR.
 */
export function interquartileRange(values?: number[], Q1?: number, Q3?: number): number {
    // Calculate quartiles if values are provided
    const calculatedQuartiles = values ? quartiles(values) : undefined;
    const calculatedQ1 = Q1 ?? calculatedQuartiles?.Q1;
    const calculatedQ3 = Q3 ?? calculatedQuartiles?.Q3;

    // Ensure Q1 and Q3 are defined
    if (calculatedQ1 === undefined || calculatedQ3 === undefined) {
        throw new Error("Insufficient data to calculate interquartile range. Provide either values or both Q1 and Q3.");
    }

    return calculatedQ3 - calculatedQ1;
}

