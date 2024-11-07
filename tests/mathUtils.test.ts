import { mean, median, mode, range, variance, standardDeviation } from '../src/Statistics/index';

describe("Statistical functions", () => {
    const data = [1, 2, 3, 4, 5];

    test("mean calculates the average correctly", () => {
        expect(mean.arithmetic(data)).toBe(3);
    });

    test("median finds the middle value correctly", () => {
        expect(median(data)).toBe(3);
    });

    test("mode finds the most frequent value", () => {
        expect(mode([1, 1, 2, 3, 4])).toBe(1);
        expect(mode([1, 2, 2, 3, 3])).toEqual([2, 3]); // Test for multiple modes
    });

    test("range calculates the difference between max and min values", () => {
        expect(range(data)).toBe(4);
    });

    test("variance calculates the spread of the data", () => {
        expect(variance.sample(data)).toBeCloseTo(2.5); // Use toBeCloseTo for potential floating-point precision
    });

    test("standard deviation calculates the spread of the data", () => {
        expect(standardDeviation(data)).toBeCloseTo(Math.sqrt(2.5));
    });
});
