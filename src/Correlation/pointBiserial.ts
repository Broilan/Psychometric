import { mean } from '../Statistics/mean';
import { standardDeviation } from '../Statistics/standardDeviation';

/**
 * Calculate the point-biserial correlation between a binary and continuous variable.
 * @param binary - Array of binary values (0 or 1).
 * @param continuous - Array of continuous values.
 * @returns Point-biserial correlation coefficient.
 */
export function pointBiserialCorrelation(binary: number[], continuous: number[]): number {
    if (binary.length !== continuous.length) throw new Error("Arrays must be of the same length");

    const n = binary.length;
    const n1 = binary.filter(val => val === 1).length;
    const n0 = n - n1;

    const mean1 = mean.arithmetic(continuous.filter((_, i) => binary[i] === 1));
    const mean0 = mean.arithmetic(continuous.filter((_, i) => binary[i] === 0));
    const overallSD = standardDeviation(continuous);

    return ((mean1 - mean0) / overallSD) * Math.sqrt((n1 * n0) / n ** 2);
}
