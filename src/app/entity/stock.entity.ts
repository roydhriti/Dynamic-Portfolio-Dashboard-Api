import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exchange } from "../model/finance.types";
import { StockRealtime } from "./stock-realtime.entity";

@Entity({ name: 'stocks' })
@Index(['symbol', 'exchange'], { unique: true })
export class Stock {
    @PrimaryGeneratedColumn('uuid')
    id!: string;


    @Column({ type: 'varchar', length: 160 })
    name!: string;


    @Column({ type: 'varchar', length: 64 })
    symbol!: string;

    @Column({ type: 'enum', enum: Exchange })
    exchange!: Exchange;

    @Column({ type: 'varchar', length: 120 })
    sector!: string;


    @Column({ type: 'decimal', precision: 18, scale: 4 })
    purchasePrice!: string;

    @Column({ type: 'int', unsigned: true })
    quantity!: number;


    @Column({ type: 'varchar', length: 240, nullable: true })
    note?: string | null;


    @OneToOne(() => StockRealtime, (rt) => rt.stock, {
        cascade: true,
        eager: true,
    })

    @JoinColumn()
    realtime?: StockRealtime;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}