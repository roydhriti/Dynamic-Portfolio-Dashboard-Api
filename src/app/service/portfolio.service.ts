import { Injectable } from '@nestjs/common';
import yahooFinance from 'yahoo-finance2';

@Injectable()
export class PortfolioService {
    private defaultStocks = ['TCS.NS', 'RELIANCE.NS', 'INFY.NS'];
    private usStocks = ['MSFT', 'AAPL', 'GOOGL', 'AMZN', 'TSLA', 'NFLX', 'NVDA', 'META', 'INTC', 'ORCL', 'IBM'];

    async getStockPrice(symbol?: string) {
        try {

            const fetchStock = async (s: string) => {
                let formattedSymbol = s;
                if (!s.includes('.') && !this.usStocks.includes(s)) {
                    formattedSymbol = s + '.NS';
                }

                const result = await yahooFinance.quote(formattedSymbol);

                if (!result) {
                    return {
                        symbol: formattedSymbol,
                        name: 'N/A',
                        cmp: 0,
                        change: 0,
                        changePercent: 0,
                        currency: 'N/A',
                        peRatio: null,
                        earnings: null,
                        sector: 'Unknown Sector',
                        exchangeTimezone: 'Unknown',
                        marketTimeIST: null,
                    };
                }


                let marketTimeIST: string | null = null;
                if (result?.regularMarketTime) {
                    const timeZone = formattedSymbol.endsWith('.NS') ? 'Asia/Kolkata' : 'America/New_York';
                    marketTimeIST = new Date(result.regularMarketTime).toLocaleString('en-IN', { timeZone });
                }

                const cmp = Number(
                    result.regularMarketPrice ??
                    result.postMarketPrice ??
                    result.preMarketPrice ??
                    result.regularMarketPreviousClose ??
                    0
                );


                // PE & Earnings
                let peRatio: number | null = null;
                let earnings: number | null = null;
                try {

                    const summary: any = await yahooFinance.quoteSummary(formattedSymbol, { modules: ['summaryDetail', 'financialData', 'defaultKeyStatistics'] });

                    peRatio = summary.summaryDetail?.trailingPE ?? summary.defaultKeyStatistics?.trailingPE ?? null;
                    earnings = summary.defaultKeyStatistics?.trailingEps ?? summary.financialData?.epsTrailingTwelveMonths ?? null;

                } catch { }

                // Sector
                let sector = 'Unknown Sector';
                try {
                    const profile: any = await yahooFinance.quoteSummary(formattedSymbol, { modules: ['assetProfile'] });
                    sector = profile.assetProfile?.sector ?? 'Unknown Sector';
                } catch { }

                return {
                    symbol: result.symbol,
                    name: result.shortName,
                    cmp,
                    change: result.regularMarketChange,
                    changePercent: result.regularMarketChangePercent,
                    currency: result.currency,
                    peRatio,
                    earnings,
                    sector,
                    exchangeTimezone: result.exchangeTimezoneName ??
                        result.fullExchangeName ??
                        result.exchange ??
                        'Unknown Timezone',
                    marketTimeIST,
                };
            };

            if (symbol) return await fetchStock(symbol);
            return Promise.all(this.defaultStocks.map(fetchStock));
        } catch (error) {
            console.error('Yahoo Finance API error:', error);
            throw error;
        }
    }
}


