import { Controller, Get, Query } from '@nestjs/common';
import { PortfolioService } from '../service/portfolio.service';

@Controller('portfolio')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService) { }

    @Get('stock-price')
    async getStockPrice(@Query('symbol') symbol?: string) {
        return this.portfolioService.getStockPrice(symbol);
    }
}