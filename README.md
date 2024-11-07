# Psychometric

A TypeScript-compatible package offering a comprehensive suite of psychometric functions. This library includes methods for **correlation coefficients**, **error calculations**, **reliability estimates**, and **validity measures**, making it ideal for psychometricians and data scientists working with psychological and educational assessments.

## Installation

Install the package via npm:

```bash
npm install psychometrics
```

## Usage

Import specific functions based on your needs. Below is an overview of the modules available in this package:

### Modules

#### Correlation

Functions to calculate various correlation coefficients.

- **`pearsonCorrelationCoefficient`**: Calculates the Pearson correlation coefficient.
- **`phiCoefficient`**: Calculates the phi coefficient for binary data.
- **`pointBiserialCorrelation`**: Calculates the point-biserial correlation between a binary and a continuous variable.
- **`spearmanRankCorrelationCoefficient`**: Calculates the Spearman rank correlation coefficient.

Example:
```typescript
import { pearsonCorrelationCoefficient } from 'psychometrics/correlation';
const correlation = pearsonCorrelationCoefficient([1, 2, 3], [4, 5, 6]);
console.log(correlation);
```

#### Error

Functions to compute various error estimates, including confidence intervals and margin of error.

- **`confidenceInterval`**: Calculates confidence intervals for a dataset.
- **`marginOfError`**: Computes the margin of error given a standard deviation, sample size, and z-score.
- **`standardErrorEstimate`**: Calculates the Standard Error of Estimate (SEE).
- **`standardErrorMean`**: Calculates the Standard Error of the Mean (SEM).

Example:
```typescript
import { marginOfError } from 'psychometrics/error';
const moe = marginOfError(10, 100);
console.log(moe);
```

#### Reliability

Functions for assessing the reliability of measurements.

- **`alternateFormsReliability`**: Calculates reliability for alternate forms of a test.
- **`cronbachsAlpha`**: Computes Cronbach's Alpha for internal consistency.
- **`interRaterReliability`**: Measures reliability between different raters.
- **`parallelFormsReliability`**: Calculates reliability for parallel test forms.
- **`splitHalfReliability`**: Estimates reliability using split-half method.
- **`testRetestReliability`**: Measures reliability over time (test-retest reliability).

Example:
```typescript
import { cronbachsAlpha } from 'psychometrics/reliability';
const alpha = cronbachsAlpha([/* your data */]);
console.log(alpha);
```

#### Validity

Functions to assess the validity of test measures.

- **`constructValidity`**: Assesses construct validity.
- **`criterionRelatedValidity`**: Evaluates criterion-related validity.

Example:
```typescript
import { constructValidity } from 'psychometrics/validity';
const validity = constructValidity([/* your data */]);
console.log(validity);
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License.