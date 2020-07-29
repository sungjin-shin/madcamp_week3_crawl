import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
@Entity()
export class StockPrice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  code!: string;

  @Column()
  date!: Date;

  @Column()
  price!: number;
}
