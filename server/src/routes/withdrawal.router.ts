import { Router } from "express";
import { Withdrawal } from "../controllers/withdrawal.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = Router();

router.post("/withdrawal" ,authMiddleware , Withdrawal);

export default router;