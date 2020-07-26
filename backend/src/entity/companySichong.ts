import { JoinColumn, Entity, Column, OneToOne, BaseEntity } from "typeorm";
import { CompanyInfo } from "./companyInfo";

@Entity()
export class CompanySichong extends BaseEntity {
  @OneToOne((type) => CompanyInfo, { primary: true })
  @JoinColumn({ name: "code" })
  code: string;

  @Column()
  sichong: number;
}
