import { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import authMiddleware from "../middlewares/auth.middleware";
import adminRoute from "./admin.route";

const router = Router();

router.use('/auth', authRoute);
router.use('/user', authMiddleware.isSignIn,userRoute);
router.use('/admin', authMiddleware.isAdmin, adminRoute);

export default router;