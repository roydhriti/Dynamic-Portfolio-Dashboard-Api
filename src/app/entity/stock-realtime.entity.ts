import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Stock } from './stock.entity';

@Entity({ name: 'stock_realtime' })
export class StockRealtime {
    @PrimaryGeneratedColumn('uuid')
    id!: string;


    @Column({ type: 'decimal', precision: 18, scale: 4, nullable: true })
    cmp!: number;


    @Column({ type: 'decimal', precision: 18, scale: 6, nullable: true })
    peRatio!: string | null;


    @Column({ type: 'decimal', precision: 18, scale: 6, nullable: true })
    latestEarnings!: string | null;


    @Index()
    @Column({ type: 'timestamptz', nullable: true })
    lastFetchedAt!: Date | null;

    @Column({ type: 'jsonb', nullable: true })
    sourcePayload?: Record<string, unknown>;

    @OneToOne(() => Stock, (stock) => stock.realtime, { onDelete: 'CASCADE' })
    stock!: Stock;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}