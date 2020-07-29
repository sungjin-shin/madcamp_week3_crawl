import { RequestHandler } from "express";
import { createQueryBuilder, getConnection, getRepository, In } from "typeorm";
import { CompanyCorr } from "../../entity/companyCorr";
import { CompanyInfo } from "../../entity/companyInfo";
import { CompanySichong } from "../../entity/companySichong";
import { UserCompanys } from "../../entity/userCompanys";

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

/**
 * Deprecated
 */
export const getCompanyCorrelation: RequestHandler = async (req, res, next) => {
  try {
    //    if (!req.session.user) {
    //      console.log("허가되지 않은 접근 시도");
    //      return res.status(403).json({ msg: "허가되지 않은 접근 시도" });
    //    }
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
    if (!req.session) return res.status(403).json({ msg: "권한이 없습니다." });
    const dto = {
      selectedCompanies: req.body.companies as Array<string>,
    };
    if (!dto.selectedCompanies || dto.selectedCompanies.length <= 0) {
      return res.status(200).json({ data: { nodes: [], edges: [] } });
    }
    const companies = await CompanySichong.getSichongWithCompanyInfo(
      dto.selectedCompanies
    );
    const userCompanys = new UserCompanys();
    userCompanys.email = req.session.user.email;
    userCompanys.companyNames = dto.selectedCompanies;
    const result = await userCompanys.save();
    console.log("getCompany is save: " + JSON.stringify(result));

    const company_codes = companies.map((c) => c.code);
    const nodes = processNodeFrom(companies, company_codes);
    console.log(` extract values : ${company_codes}`);
    const corrs = await CompanyCorr.find({
      where: { sourceCode: In(company_codes), targetCode: In(company_codes) },
      order: { sourceCode: "ASC", targetCode: "DESC" },
    });
    console.log(`corr${JSON.stringify(corrs)}`);

    const edges = processEdgeFrom(corrs, company_codes);

    return res.json({
      data: { nodes: nodes, edges: edges },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({});
  }
};

/**
 * Deprecated
 */
export const getUserCompany: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session) return res.status(403).json({ msg: "권한이 없습니다." });
    const email = req.session.user.email;
    const companys = await UserCompanys.findOne(email);
    console.log(`email:${email}, ${companys}`);
    if (companys == null) return res.json({ data: [] });

    return res.json({ data: companys.companyNames });
  } catch (error) {
    console.error(error);
    return res.status(500).json({});
  }
};

export const clearCompany: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session) return res.status(403).json({ msg: "권한이 없습니다." });
    const { email } = req.session.user;
    await UserCompanys.update(email, { companyNames: [] });
    return res.json({
      data: { nodes: [], edges: [] },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({});
  }
};
function processEdgeFrom(corrs: CompanyCorr[], company_codes: string[]) {
  return corrs
    .map((corr) => {
      const from = company_codes.findIndex((val) => val == corr.sourceCode);
      const to = company_codes.findIndex((val) => val == corr.targetCode);
      const value = Math.abs(Number(corr.weight));
      if (from <= to && value >= 0.25) {
        return {
          from: from,
          to: to,
          color: { color: Number(corr.weight) >= 0 ? "#FF6C5C" : "#ACCBE8" },
          title: corr.weight,
          value: value,
        };
      }
    })
    .filter((elem) => elem != null);
}

function processNodeFrom(companies: any[], company_codes: any[]) {
  return companies.map((c) => ({
    id: company_codes.findIndex((val) => val == c.code),
    label: c.name,
    title: c.code,
    value: Number(Math.log(c.sichong).toFixed(6)) * 10,
    group: c.upjong,
  }));
}
