export enum Exchange {
    NSE = 'NSE',
    BSE = 'BSE',
}

export interface CalculatedFields {
    investment: number;
    presentValue: number;
    gainLoss: number
    portfolioPercent?: number
}