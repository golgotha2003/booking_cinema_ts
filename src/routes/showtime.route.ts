import { Request, Response, NextFunction, Router } from "express";
import showtimeController from "../controllers/showtime.controller";

const router = Router();

router.get('/get-all-showtimes', async (req: Request, res: Response, next: NextFunction) => {
    await showtimeController.getAllShowtimes(req, res).catch(next);
});

router.get('/get-showtime-by-id/:id', async (req: Request, res: Response, next: NextFunction) => {
    await showtimeController.getShowtimeById(req, res).catch(next);
});

router.get('/get-showtimes-by-movie-id/:id', async (req: Request, res: Response, next: NextFunction) => {
    await showtimeController.getShowtimesByMovieId(req, res).catch(next);
});

router.get('/get-showtimes-by-theater-id/:id', async (req: Request, res: Response, next: NextFunction) => {
    await showtimeController.getShowtimesByTheaterId(req, res).catch(next);
});

router.get('/get-available-seats', async (req: Request, res: Response, next: NextFunction) => {
    await showtimeController.getAvailableSeats(req, res).catch(next);
});

export default router;