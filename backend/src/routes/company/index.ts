import { Router } from "express";
import * as comCtrl from "./company.ctrl";

const router = Router();

router.get("/list", comCtrl.getCompanyInfos);
router.post("/corr", comCtrl.getCorrByName);
router.post("/corrcode", comCtrl.getCompanyCorrelation);
export default router;
