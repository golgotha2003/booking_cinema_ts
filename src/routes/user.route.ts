import { Request, Response, NextFunction, Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.get('/get-current', async (req: Request, res: Response, next: NextFunction) => {
    await userController.getCurrent(req, res).catch(next);
});

router.put('/update-current', async (req: Request, res: Response, next: NextFunction) => {
    await userController.updateCurrent(req, res).catch(next);
});

router.put('/change-password', async (req: Request, res: Response, next: NextFunction) => {
    await userController.changePassword(req, res).catch(next);
});

export default router;