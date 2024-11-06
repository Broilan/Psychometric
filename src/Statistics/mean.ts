/**
 * Arithmetic mean (average).
 */
function arithmeticMean(values: number[]): number {
    return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/**
 * Geometric mean.
 */
function geometricMean(values: number[]): number {
    return Math.pow(values.reduce((product, value) => product * value, 1), 1 / values.length);
}

/**
 * Harmonic mean.
 */
function harmonicMean(values: number[]): number {
    return values.length / values.reduce((sum, value) => sum + 1 / value, 0);
}

/**
 * Calculate the quadratic mean (root mean square) of an array of numbers.
 * @param values - Array of numbers.
 * @returns Quadratic mean (RMS) of the array.
 */
function quadraticMean(values: number[]): number {
    const sumOfSquares = values.reduce((sum, value) => sum + value ** 2, 0);
    return Math.sqrt(sumOfSquares / values.length);
}

export const mean = {
    arithmetic: arithmeticMean,
    geometric: geometricMean,
    harmonic: harmonicMean,
    quadratic: quadraticMean
};
