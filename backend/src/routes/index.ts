import { Router } from "express";
import auth from "./auth";
import company from "./company";
import naver from './naver';

const router = Router();

router.use("/auth", auth);
router.use("/company", company);
router.use('/naver',naver )

export default router;
