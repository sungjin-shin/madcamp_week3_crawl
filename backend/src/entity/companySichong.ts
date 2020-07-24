import {
  JoinColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  OneToOne,
} from "typeorm";
import { CompanyInfo } from "./companyInfo";

@Entity()
export class CompanySichong {
  @OneToOne((type) => CompanyInfo, { primary: true })
  @JoinColumn({ name: "code" })
  code: string;

  @Column()
  sichong: number;
}
