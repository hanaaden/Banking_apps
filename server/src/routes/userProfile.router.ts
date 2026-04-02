import Router from "express"
import { authMiddleware } from "../middlewares/auth.middleware"
import { getUserProfile } from "../controllers/userProfile.controller"

const router = Router()

router.get("/profile" , authMiddleware , getUserProfile)

export default router