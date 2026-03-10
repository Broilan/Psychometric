import { bootstrap, permutationTest } from './core';
import { omegaTotal } from './Reliability';
import { convergentDiscriminantSummary, criterionCorrelation, incrementalValidity, knownGroupsComparison, rocCurve, screeningAssociation } from './Validity';
/**
 * Experimental helpers are shipped for evaluation but are not part of the
 * package's strongest long-term API guarantees yet.
 */
export declare const experimental: {
    bootstrap: typeof bootstrap;
    permutationTest: typeof permutationTest;
    omegaTotal: typeof omegaTotal;
    convergentDiscriminantSummary: typeof convergentDiscriminantSummary;
    criterionCorrelation: typeof criterionCorrelation;
    knownGroupsComparison: typeof knownGroupsComparison;
    incrementalValidity: typeof incrementalValidity;
    rocCurve: typeof rocCurve;
    screeningAssociation: typeof screeningAssociation;
};
export type ExperimentalNamespace = typeof experimental;
