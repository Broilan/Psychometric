import { standardDeviation, covariance } from '../Statistics';

class Auto {
    public pearsonCC(x: number[], y: number[]): number {
        const stdDevX = standardDeviation(x);
        const stdDevY = standardDeviation(y);
        const cov = covariance(x, y);
        return cov / (stdDevX * stdDevY);
    }

    public stdev(values: number[]): number {
        return standardDeviation(values);
    }

    public cov(x: number[], y: number[]): number {
        return covariance(x, y);
    }
}

export const auto = new Auto();
