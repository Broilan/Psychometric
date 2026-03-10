import { assertSameLength, ensureFiniteNumbers, sum } from "../core/math";
import type { OmegaTotalInput } from "./index";

/**
 * Experimental: omega total is only supported from explicit factor loadings
 * and error variances. This package does not estimate those latent parameters.
 */
export function omegaTotal(input: OmegaTotalInput): number | null {
  const loadings = ensureFiniteNumbers(input.loadings, "loadings");
  const errorVariances = ensureFiniteNumbers(input.errorVariances, "errorVariances");
  assertSameLength(loadings, errorVariances, "loadings and errorVariances");
  const numerator = sum(loadings) ** 2;
  const denominator = numerator + sum(errorVariances);
  return denominator ? numerator / denominator : null;
}
