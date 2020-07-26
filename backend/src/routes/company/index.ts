import { Router } from "express";
import * as comCtrl from "./company.ctrl";

const router = Router();

router.get("/list", comCtrl.getCompanyInfos);
export default router;
