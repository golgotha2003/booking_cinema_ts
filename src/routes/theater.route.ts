import { Request, Response, NextFunction, Router } from "express";
import theaterController from "../controllers/theater.controller";

const router = Router();

router.get('/get-all-theaters', async (req: Request, res: Response, next: NextFunction) => {
    await theaterController.getAllTheaters(req, res).catch(next);
});

router.get('/get-theater-by-id/:id', async (req: Request, res: Response, next: NextFunction) => {
    await theaterController.getTheaterById(req, res).catch(next);
});

export default router;