import { mean } from "./mean";

/**
 * Calculate the covariance between two arrays of numbers.
 * Optionally accepts pre-calculated means.
 * @param x - First array of numbers.
 * @param y - Second array of numbers.
 * @param meanX - (Optional) Pre-calculated mean of the first array.
 * @param meanY - (Optional) Pre-calculated mean of the second array.
 * @returns Covariance between x and y.
 * @throws Error if insufficient data is provided to calculate the covariance.
 */
export function covariance(x: number[], y: number[], meanX?: number, meanY?: number): number {
    if (x.length !== y.length) throw new Error("Arrays must be of the same length");

    const calculatedMeanX = meanX ?? mean.arithmetic(x);
    const calculatedMeanY = meanY ?? mean.arithmetic(y);

    return x.reduce((acc, xi, i) => acc + (xi - calculatedMeanX) * (y[i] - calculatedMeanY), 0) / x.length;
}
