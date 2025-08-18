import { Injectable } from '@nestjs/common';
import yahooFinance from 'yahoo-finance2';
import { QuoteOptions } from 'yahoo-finance2/dist/esm/src/modules/quote';

@Injectable()
// export class PortfolioService {
//     private defaultStocks = ['TCS.NS', 'RELIANCE.NS', 'INFY.NS']; // default NSE stocks

//     async getDefaultStockPrices() {
//         try {
//             const queryOptions: QuoteOptions = {
//                 fields: [
//                     'symbol',
//                     'shortName',
//                     'regularMarketPrice',
//                     'currency',
//                     'regularMarketChange',
//                     'regularMarketChangePercent',
//                 ] as const,
//                 return: 'object',
//             };

//             const results = await Promise.all(
//                 this.defaultStocks.map(stock => yahooFinance.quote(stock, queryOptions))
//             );

//             return results;
//         } catch (error) {
//             console.error('Yahoo Finance API error:', error);
//             throw error;
//         }
//     }

export class PortfolioService {
    private defaultStocks = ['TCS.NS', 'RELIANCE.NS', 'INFY.NS']; // default NSE stocks

    async getStockPrice(symbol?: string) {
        try {
            const queryOptions: QuoteOptions = {
                fields: [
                    'symbol',
                    'shortName',
                    'regularMarketPrice',
                    'currency',
                    'regularMarketChange',
                    'regularMarketChangePercent',
                ] as const,
                return: 'object',
            };

            if (symbol) {
                // Append .NS if not already present
                const formattedSymbol = symbol.includes('.NS') ? symbol : symbol + '.NS';
                const result = await yahooFinance.quote(formattedSymbol, queryOptions);
                return [result]; // return as array for consistency
            }

            // No symbol provided, return default stocks
            const results = await Promise.all(
                this.defaultStocks.map(stock => yahooFinance.quote(stock, queryOptions))
            );
            return results;

        } catch (error) {
            console.error('Yahoo Finance API error:', error);
            throw error;
        }
    }
}