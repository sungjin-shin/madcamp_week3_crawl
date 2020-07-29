import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class CompanyCorr extends BaseEntity {
  @PrimaryColumn()
  sourceCode!: string;

  @PrimaryColumn()
  targetCode!: string;

  @Column("decimal", { precision: 5, scale: 4 })
  weight!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
