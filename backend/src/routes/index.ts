import { Router } from "express";
import auth from "./auth";
import company from "./company";

const router = Router();

router.use("/auth", auth);
router.use("/company", company);

export default router;
