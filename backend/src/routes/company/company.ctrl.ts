import { RequestHandler } from "express";
import { createQueryBuilder, getConnection, getRepository } from "typeorm";
import { CompanyInfo } from "../../entity/companyInfo";
import { CompanySichong } from "../../entity/companySichong";

export const getCompanyInfos: RequestHandler = async (req, res, next) => {
  try {
//    if (!req.session.user) {
//      console.log("허가되지 않은 접근 시도");
//      return res.status(403).json({ msg: "허가되지 않은 접근 시도" });
//    }

    // TODO: Active Record Pattern 적용하기
    const companys = await getRepository(CompanySichong)
      .createQueryBuilder("cs")
      .leftJoinAndSelect(CompanyInfo, "ci", "cs.code = ci.code")
      .select("cs.code", "code")
      .addSelect("ci.name", "name")
      .addSelect("ci.upjong", "upjong")
      .addSelect("cs.sichong", "sichong")
      .getRawMany();

    return res.status(200).json({ data: companys });
  } catch (error) {
    console.error(error);
    return res.status(500).json({});
  }
};
