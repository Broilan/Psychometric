import { mean, variance } from '../Statistics';

/**
 * Calculate Cronbach's Alpha.
 * @param items - Array of item arrays, where each inner array represents scores for an item across respondents.
 * @returns Cronbach's Alpha for internal consistency.
 */
function cronbachsAlpha(items: number[][]): number {
    const itemCount = items.length;
    const respondentCount = items[0].length;

    const itemVariances = items.map(item => variance.sample(item));
    const totalVariance = variance.sample(
        items[0].map((_, i) => mean.arithmetic(items.map(item => item[i])))
    );

    const sumOfItemVariances = itemVariances.reduce((acc, v) => acc + v, 0);
    return (itemCount / (itemCount - 1)) * (1 - (sumOfItemVariances / totalVariance));
}
