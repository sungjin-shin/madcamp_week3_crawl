import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity()
export class CompanyInfo {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @Column()
  upjong: string;
}
