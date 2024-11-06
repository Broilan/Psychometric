/**
 * Calculate the phi coefficient for a 2x2 contingency table.
 * @param a - Frequency of (1, 1).
 * @param b - Frequency of (1, 0).
 * @param c - Frequency of (0, 1).
 * @param d - Frequency of (0, 0).
 * @returns Phi coefficient.
 */
export function phiCoefficient(a: number, b: number, c: number, d: number): number {
    const numerator = (a * d) - (b * c);
    const denominator = Math.sqrt((a + b) * (a + c) * (b + d) * (c + d));
    if (denominator === 0) throw new Error("Denominator is zero, cannot calculate phi coefficient");

    return numerator / denominator;
}
