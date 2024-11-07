/**
 * Calculate the Spearman correlation between two arrays of numbers.
 * Optionally accepts pre-calculated ranks.
 * @param x - (Optional) First array of numbers. Required if rankX and rankY are not provided.
 * @param y - (Optional) Second array of numbers. Required if rankX and rankY are not provided.
 * @param rankX - (Optional) Pre-calculated ranks for the first dataset.
 * @param rankY - (Optional) Pre-calculated ranks for the second dataset.
 * @returns Spearman correlation coefficient (rs).
 * @throws Error if insufficient data is provided to calculate the Spearman correlation.
 */
export function spearmanCorrelation(
    x?: number[], 
    y?: number[], 
    rankX?: number[], 
    rankY?: number[]
): number {
    if ((!x || !y) && (!rankX || !rankY)) {
        throw new Error("Either provide datasets x and y, or provide rankX and rankY.");
    }

    // If raw data is provided, calculate the ranks
    const calculateRanks = (arr: number[]): number[] => {
        return arr
            .map((val, i) => ({ val, index: i }))
            .sort((a, b) => a.val - b.val)
            .map((item, rank) => ({ ...item, rank: rank + 1 }))
            .sort((a, b) => a.index - b.index)
            .map(item => item.rank);
    };

    const calculatedRankX = rankX ?? (x ? calculateRanks(x) : undefined);
    const calculatedRankY = rankY ?? (y ? calculateRanks(y) : undefined);

    // Ensure ranks are available for calculation
    if (!calculatedRankX || !calculatedRankY) {
        throw new Error("Insufficient data to calculate Spearman correlation coefficient.");
    }

    // Calculate the difference in ranks and sum of squared differences
    const dSquaredSum = calculatedRankX.reduce((sum, rX, i) => sum + (rX - calculatedRankY[i]) ** 2, 0);
    const n = calculatedRankX.length;

    return 1 - (6 * dSquaredSum) / (n * (n ** 2 - 1));
}

