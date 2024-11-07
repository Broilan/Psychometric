"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronbachsAlpha = cronbachsAlpha;
const simple_statistics_1 = require("simple-statistics");
/**
 * Calculate Cronbach's Alpha.
 * @param items - Array of item arrays, where each inner array represents scores for an item across respondents.
 * @returns Cronbach's Alpha for internal consistency.
 */
function cronbachsAlpha(items) {
    const itemCount = items.length;
    const respondentCount = items[0].length;
    const itemVariances = items.map(item => (0, simple_statistics_1.variance)(item));
    const totalVariance = (0, simple_statistics_1.variance)(items[0].map((_, i) => (0, simple_statistics_1.mean)(items.map(item => item[i]))));
    const sumOfItemVariances = itemVariances.reduce((acc, v) => acc + v, 0);
    return (itemCount / (itemCount - 1)) * (1 - (sumOfItemVariances / totalVariance));
}
