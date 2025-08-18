import { PartialType } from '@nestjs/mapped-types';
import { CreateStockDto } from './create-stock.dto';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Exchange } from '../model/finance.types';

export class UpdateStockDto extends PartialType(CreateStockDto) {
    @ApiPropertyOptional({ enum: Exchange })
    @IsOptional()
    @IsEnum(Exchange)
    exchange?: Exchange;

    @ApiPropertyOptional({ example: 2800.0 })
    @IsOptional()
    @IsNumber()
    @Min(0)
    purchasePrice?: number;

    @ApiPropertyOptional({ example: 12 })
    @IsOptional()
    @IsInt()
    @Min(1)
    quantity?: number;

    @ApiPropertyOptional({ example: 'Trim after Q2 results' })
    @IsOptional()
    @IsString()
    @MaxLength(240)
    note?: string;
}