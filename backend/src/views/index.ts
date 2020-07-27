import { Router } from "express";
import { UserCompanys } from "../entity/userCompanys";

const router = Router();

router.get("/", function (req, res) {
  if (req.session.user) {
    return res.render("main");
  } else {
    return res.render("index");
  }
});

router.get("/main", function (req, res) {
  if (!req.session.user) {
    return res.status(403).redirect("/");
  } else {
    const email = req.session.user.email;
    UserCompanys.findOne(email)
      .then((companys) => {
        if (companys == null)
          return res.render("main", { selectedCompanies: [] });
        else
          return res.render("main", {
            selectedCompanies: companys.companyNames,
          });
      })
      .catch((err) => {
        console.error(err);
        return res.render("main", { selectedCompanies: [] });
      });
  }
});

export default router;
