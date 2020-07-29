import { Router } from "express";

const router = Router();

router.get("/", function (req, res) {
  if (req.session != undefined && req.session.user) {
    return res.render("main");
  } else {
    return res.render("index");
  }
});

router.get("/main", function (req, res) {
  if (req.session != undefined && !req.session.user) {
    return res.status(403).redirect("/");
  } else {
    return res.render("main");
  }
});

router.get("/register", function (req, res) {
  if (req.session != undefined && req.session.user) {
    return res.render("main");
  } else {
    return res.render("register");
  }
});

export default router;
