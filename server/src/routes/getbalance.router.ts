import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { GetBalance } from "../controllers/getbalance.controller";

const router = Router();
router.get("/balance" , authMiddleware , GetBalance)
export default router;