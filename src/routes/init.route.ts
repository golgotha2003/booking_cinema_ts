import { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.use('/auth', authRoute);
router.use('/user', authMiddleware.isSignIn,userRoute);

export default router;