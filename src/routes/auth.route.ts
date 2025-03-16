import { NextFunction, Request, Response, Router } from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post('/sign-up', (req: Request, res: Response, next: NextFunction) => {
  authController.signUp(req, res).catch(next);
});

router.post('/sign-in', authMiddleware.checkLogin,(req: Request, res: Response, next: NextFunction) => {
  authController.signIn(req, res).catch(next);
});

router.post('/sign-out', authMiddleware.isSignIn, (req: Request, res: Response, next: NextFunction) => {
  authController.signOut(req, res).catch(next);
});

router.post('/verify-sign-up', (req: Request, res: Response, next: NextFunction) => {
  authController.verifySignUp(req, res).catch(next);
});

router.post('/forgot-password', (req: Request, res: Response, next: NextFunction) => {
  authController.forgotPassword(req, res).catch(next);
});

router.post('/verify-password', (req: Request, res: Response, next: NextFunction) => {
  authController.verifyPassword(req, res).catch(next);
});

router.post('/reset-password', (req: Request, res: Response, next: NextFunction) => {
  authController.resetPassword(req, res).catch(next);
});

export default router;