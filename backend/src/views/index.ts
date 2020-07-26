import { Router } from "express";

const router = Router();

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/main", function (req, res) {
  if (!req.session.user) {
    return res.status(403).redirect("/");
  } else {
    return res.status(200).render("main");
  }
});


export default router;
