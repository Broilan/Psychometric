import { bootstrap, permutationTest } from "./core";
import { omegaTotal } from "./Reliability";
import {
  convergentDiscriminantSummary,
  criterionCorrelation,
  incrementalValidity,
  knownGroupsComparison,
  rocCurve,
  screeningAssociation,
} from "./Validity";

/**
 * Experimental helpers are shipped for evaluation but are not part of the
 * package's strongest long-term API guarantees yet.
 */
export const experimental = {
  bootstrap,
  permutationTest,
  omegaTotal,
  convergentDiscriminantSummary,
  criterionCorrelation,
  knownGroupsComparison,
  incrementalValidity,
  rocCurve,
  screeningAssociation,
};

export type ExperimentalNamespace = typeof experimental;
