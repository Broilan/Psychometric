import { mean } from "./mean";

/**
 * Calculate the sample variance of an array of numbers.
 * @param values - Array of numbers.
 * @returns Sample variance of the array.
 */
function sampleVariance(values: number[]): number {
    if (values.length < 2) throw new Error("Sample variance requires at least two data points");
    const meanValue = mean.arithmetic(values);
    return values.reduce((acc, value) => acc + (value - meanValue) ** 2, 0) / (values.length - 1);
}

/**
 * Calculate the population variance of an array of numbers.
 * @param values - Array of numbers.
 * @returns Population variance of the array.
 */
function populationVariance(values: number[]): number {
    if (values.length === 0) throw new Error("Population variance requires at least one data point");
    const meanValue = mean.arithmetic(values);
    return values.reduce((acc, value) => acc + (value - meanValue) ** 2, 0) / values.length;
}

export const variance = {
    sample: sampleVariance,
    population: populationVariance
};


