import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class UserCompanys extends BaseEntity {
  @PrimaryColumn()
  email!: string;

  @Column("simple-array")
  companyNames!: string[];
}
