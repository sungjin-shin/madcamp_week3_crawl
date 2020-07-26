import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class CompanyInfo extends BaseEntity {
  @PrimaryColumn()
  code!: string;

  @Column()
  name!: string;

  @Column()
  upjong!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
