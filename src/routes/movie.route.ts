import { Request, Response, NextFunction, Router } from "express";
import movieController from "../controllers/movie.controller";

const router = Router();

router.get('/get-all-movies', async (req: Request, res: Response, next: NextFunction) => {
    await movieController.getAllMovies(req, res).catch(next);
});

router.get('/get-movie-by-id/:id', async (req: Request, res: Response, next: NextFunction) => {
    await movieController.getMovieById(req, res).catch(next);
});

export default router;