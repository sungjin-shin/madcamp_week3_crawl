import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { CompanyInfo } from "./companyInfo";

@Entity()
export class StockPrice {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  code: string;

  @Column()
  date: Date;

  @Column()
  price: number;
}
