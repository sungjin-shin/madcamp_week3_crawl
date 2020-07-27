import { strict } from "assert";
import { RequestHandler } from "express";
import { createQueryBuilder, getConnection, getRepository, In } from "typeorm";
import { CompanyCorr } from "../../entity/companyCorr";
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
      .orderBy("cs.sichong", "DESC")
      .getRawMany();

    return res.status(200).json({ data: companys });
  } catch (error) {
    console.error(error);
    return res.status(500).json({});
  }
};

export const getCompanyCorrelation: RequestHandler = async (req, res, next) => {
  try {
    const companies = req.body.companies as Array<string>;
    console.log(companies);
    console.log(typeof companies);
    if (!companies || companies.length <= 0) {
      console.log("companies is empty: ", companies);
      return res.status(404).json({});
    }

    // TODO: 이름 바꿔서 보내기 to from으로
    // TODO: threshold 설정하기
    const [correlations, count] = await CompanyCorr.findAndCount({
      where: { sourceCode: In(companies), targetCode: In(companies) },
      order: { sourceCode: "ASC", targetCode: "DESC" },
    });

    return res.status(200).json({ data: correlations, count });
  } catch (error) {
    console.error(error);
    return res.status(500).json({});
  }
};

export const getCorrByName: RequestHandler = async (req, res, next) => {
  try {
    const dto = {
      selectedCompanies: req.body.companies as Array<string>,
    };
    console.log(`input: ${String(dto.selectedCompanies)}`);
    if (!dto.selectedCompanies || dto.selectedCompanies.length <= 0) {
      console.log("companies is empty: ", dto.selectedCompanies);
      return res.status(404).json({});
    }
    const companies = await getRepository(CompanySichong)
      .createQueryBuilder("cs")
      .leftJoinAndSelect(CompanyInfo, "ci", "cs.code = ci.code")
      .select("cs.code", "code")
      .addSelect("ci.name", "name")
      .addSelect("ci.upjong", "upjong")
      .addSelect("cs.sichong", "sichong")
      .where(`ci.name IN (${"'" + dto.selectedCompanies.join("','") + "'"})`)
      .orderBy("cs.sichong", "DESC")
      .getRawMany();

    const company_codes = companies.map((c) => c.code);
    const processed_companies = companies.map((c) => ({
      id: company_codes.findIndex((val) => val == c.code),
      label: c.name,
      title: c.code,
      value: c.sichong,
      group: c.upjong,
    }));
    console.log(` extract values : ${company_codes}`);
    const corrs = await CompanyCorr.find({
      where: { sourceCode: In(company_codes), targetCode: In(company_codes) },
      order: { sourceCode: "ASC", targetCode: "DESC" },
    });

    const processed_corrs = corrs
      .map((corr) => {
        const from = company_codes.findIndex((val) => val == corr.sourceCode);
        const to = company_codes.findIndex((val) => val == corr.targetCode);
        if (from <= to) {
          return {
            from: from,
            to: to,
            value: Number(corr.weight),
          };
        }
      })
      .filter((elem) => elem != null);

    return res.json({
      data: { nodes: processed_companies, edges: processed_corrs },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({});
  }
};
