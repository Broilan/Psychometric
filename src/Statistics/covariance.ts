import { mean } from "./mean";

/**
 * Calculate the covariance between two arrays of numbers.
 * @param x - First array of numbers.
 * @param y - Second array of numbers.
 * @returns Covariance between x and y.
 */
export function covariance(x: number[], y: number[]): number {
    if (x.length !== y.length) throw new Error("Arrays must be of the same length");

    const meanX = mean(x);
    const meanY = mean(y);
    return x.reduce((acc, xi, i) => acc + (xi - meanX) * (y[i] - meanY), 0) / x.length;
}
