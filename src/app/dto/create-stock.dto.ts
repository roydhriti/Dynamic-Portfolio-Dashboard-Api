import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min } from "class-validator";
import { Exchange } from "../model/finance.types";

export class CreateStockDto {
    @ApiProperty({ example: 'Reliance Industries' })
    @IsString()
    @MaxLength(160)
    name!: string;

    @ApiProperty({ example: 'RELIANCE' })
    @IsString()
    @MaxLength(64)
    symbol!: string;

    @ApiProperty({ enum: Exchange, example: Exchange.NSE })
    @IsEnum(Exchange)
    exchange!: Exchange;

    @ApiProperty({ example: 'Energy' })
    @IsString()
    @MaxLength(120)
    sector!: string;

    @ApiProperty({ example: 2750.5 })
    @IsNumber()
    @IsPositive()
    purchasePrice!: number;

    @ApiProperty({ example: 10 })
    @IsInt()
    @Min(1)
    quantity!: number;

    @ApiProperty({ required: false, example: 'Long-term holding' })
    @IsOptional()
    @IsString()
    @MaxLength(240)
    note?: string;
}