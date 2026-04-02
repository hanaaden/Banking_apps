import {Router} from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { Deposit } from "../controllers/deposit.controller";

const router = Router();

router.post("/deposit",authMiddleware , Deposit); 

export default router;