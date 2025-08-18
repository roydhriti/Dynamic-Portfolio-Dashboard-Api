import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PortfolioModule } from './app/module/portfolio.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),

        PortfolioModule,
    ],

})
export class AppModule { }
