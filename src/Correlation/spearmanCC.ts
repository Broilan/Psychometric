/**
 * Calculate the Spearman correlation between two arrays of numbers.
 * @param x - First array of numbers.
 * @param y - Second array of numbers.
 * @returns Spearman correlation coefficient (rs).
 */
export function spearmanCorrelation(x: number[], y: number[]): number {
    if (x.length !== y.length) throw new Error("Arrays must be of the same length");

    // Rank each array
    const rank = (arr: number[]): number[] => {
        return arr
            .map((val, i) => ({ val, index: i }))
            .sort((a, b) => a.val - b.val)
            .map((item, rank) => ({ ...item, rank: rank + 1 }))
            .sort((a, b) => a.index - b.index)
            .map(item => item.rank);
    };

    const rankX = rank(x);
    const rankY = rank(y);

    // Calculate the difference in ranks and sum of squared differences
    const dSquaredSum = rankX.reduce((sum, rX, i) => sum + (rX - rankY[i]) ** 2, 0);
    const n = x.length;

    return 1 - (6 * dSquaredSum) / (n * (n ** 2 - 1));
}
