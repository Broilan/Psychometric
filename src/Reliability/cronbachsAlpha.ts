import { mean, variance } from 'simple-statistics';

/**
 * Calculate Cronbach's Alpha.
 * @param items - Array of item arrays, where each inner array represents scores for an item across respondents.
 * @returns Cronbach's Alpha for internal consistency.
 */
export function cronbachsAlpha(items: number[][]): number {
    const itemCount = items.length;
    const respondentCount = items[0].length;

    const itemVariances = items.map(item => variance(item));
    const totalVariance = variance(
        items[0].map((_, i) => mean(items.map(item => item[i])))
    );

    const sumOfItemVariances = itemVariances.reduce((acc, v) => acc + v, 0);
    return (itemCount / (itemCount - 1)) * (1 - (sumOfItemVariances / totalVariance));
}
