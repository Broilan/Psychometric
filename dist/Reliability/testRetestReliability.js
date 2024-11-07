"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRetestReliability = testRetestReliability;
/**
 * Calculate Test-Retest Reliability.
 * @param time1 - Scores from the first administration of the test.
 * @param time2 - Scores from the second administration of the test.
 * @param correlationFunc - Correlation function specified by the user.
 * @returns Test-Retest Reliability coefficient.
 * @throws Error if no correlation function is provided.
 */
function testRetestReliability(time1, time2, correlationFunc) {
    if (!correlationFunc)
        throw new Error("A correlation function must be provided.");
    if (time1.length !== time2.length)
        throw new Error("Both test administrations must have the same number of scores.");
    return correlationFunc(time1, time2);
}
