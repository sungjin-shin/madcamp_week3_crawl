import { Router } from "express";
import * as naverCtrl from "./naver.ctrl";

const router = Router();

router.get("/news", naverCtrl.getNews);
export default router;
