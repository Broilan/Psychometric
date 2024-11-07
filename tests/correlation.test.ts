// import { pearsonC } from '../src/Correlation';
import { stdDev } from "../src/Statistics";

// describe('Pearson Correlation with Pre-calculated Values', () => {
//     test('calculates correctly with pre-calculated std deviations and covariance', () => {
//         const x = [1, 2, 3, 4, 5]; // hypothetical standard deviation for x
//         const y = [2, 4, 6, 8, 10]; // hypothetical standard deviation for y
//         expect(pearsonC(x, y)).toBeCloseTo(1);
//     });
// });


describe("Standard Deviation", () => {
    test("calculates standard deviation for a sample", () => {
        const values = [1, 2, 3, 4, 5];
        expect(stdDev(values)).toBeCloseTo(1.58, 2);
    });

    test("calculates standard deviation for a population", () => {
        const values = [1, 2, 3, 4, 5];
        expect(stdDev(values, false)).toBeCloseTo(1.414, 3);
    });

    test("returns 0 for a single-value array", () => {
        const values = [3];
        expect(stdDev(values)).toBe(0);
    });

    test("returns NaN for an empty array", () => {
        const values: number[] = [];
        expect(stdDev(values)).toBeNaN();
    });
});
