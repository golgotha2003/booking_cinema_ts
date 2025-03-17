import { Request, Response, NextFunction, Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.get('/get-current', (req: Request, res: Response, next: NextFunction) => {
    userController.getCurrent(req, res).catch(next);
});

router.post('/update-current', (req: Request, res: Response, next: NextFunction) => {
    userController.updateCurrent(req, res).catch(next);
});

router.post('/change-password', (req: Request, res: Response, next: NextFunction) => {
    userController.changePassword(req, res).catch(next);
});

export default router;