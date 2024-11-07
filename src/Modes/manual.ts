class Manual {
    public pearsonCC(stdDevX: number, stdDevY: number, cov: number): number {
        return cov / (stdDevX * stdDevY);
    }

    public stdev(stdDev: number): number {
        return stdDev;
    }

    public cov(cov: number): number {
        return cov;
    }
}

export const manual = new Manual();
