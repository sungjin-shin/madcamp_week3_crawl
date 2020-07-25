import { Router } from "express";
import * as authCtrl from "./auth.ctrl";

const router = Router();

router.post("/login", authCtrl.loginUser);
router.post("/register", authCtrl.createUser);
router.delete("/user", authCtrl.deleteUserByEmail);
router.post("/password", authCtrl.resetPassword);
export default router;
