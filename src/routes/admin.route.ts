import { Request, Response, NextFunction, Router } from "express";
import adminController from "../controllers/admin.controller";

const router = Router();

router.get('/get-all-users', (req: Request, res: Response, next: NextFunction) => {
    adminController.getAllUsers(req, res).catch(next);
});

router.post('/toggle-user-status', (req: Request, res: Response, next: NextFunction) => {
    adminController.toggleUserStatus(req, res).catch(next);
});

export default router;