import { JoinColumn, Entity, Column, OneToOne, BaseEntity } from "typeorm";
import { CompanyInfo } from "./companyInfo";
import { CompanySiInfo } from "../types/company.type";

@Entity()
export class CompanySichong extends BaseEntity {
  @OneToOne((type) => CompanyInfo, { primary: true })
  @JoinColumn({ name: "code" })
  code!: string;

  @Column()
  sichong!: number;

  static getSichongWithCompanyInfo(
    selectedCompany: Array<string>
  ): Promise<Array<CompanySiInfo>> {
    return CompanySichong.createQueryBuilder("cs")
      .leftJoinAndSelect(CompanyInfo, "ci", "cs.code = ci.code")
      .select("cs.code", "code")
      .addSelect("ci.name", "name")
      .addSelect("ci.upjong", "upjong")
      .addSelect("cs.sichong", "sichong")
      .where(`ci.name IN (${"'" + selectedCompany.join("','") + "'"})`)
      .orderBy("cs.sichong", "DESC")
      .getRawMany();
  }
}
