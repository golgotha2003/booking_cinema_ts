import { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import authMiddleware from "../middlewares/auth.middleware";
import adminRoute from "./admin.route";
import movieRoute from "./movie.route";
import theaterRoute from "./theater.route";
import seatRoute from "./seat.route";

const router = Router();

router.use('/auth', authRoute);
router.use('/user', authMiddleware.isSignIn, userRoute);
router.use('/admin', authMiddleware.isAdmin, adminRoute);
router.use('/movie', movieRoute);
router.use('/theater', theaterRoute);
router.use('/seat', seatRoute);

export default router;