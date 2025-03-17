import { Request, Response, NextFunction, Router } from "express";
import adminController from "../controllers/admin.controller";
import movieController from "../controllers/movie.controller";
import theaterController from "../controllers/theater.controller";
import seatController from "../controllers/seat.controller";

const router = Router();

//Users
router.get(
  "/get-all-users",
  async (req: Request, res: Response, next: NextFunction) => {
    await adminController.getAllUsers(req, res).catch(next);
  }
);

router.put(
  "/toggle-user-status",
  async (req: Request, res: Response, next: NextFunction) => {
    await adminController.toggleUserStatus(req, res).catch(next);
  }
);

//Movies
router.post(
  "/add-movie",
  async (req: Request, res: Response, next: NextFunction) => {
    await movieController.addMovie(req, res).catch(next);
  }
);

router.put(
  "/update-movie",
  async (req: Request, res: Response, next: NextFunction) => {
    await movieController.updateMovie(req, res).catch(next);
  }
);

router.delete(
  "/delete-movie",
  async (req: Request, res: Response, next: NextFunction) => {
    await movieController.deleteMovie(req, res).catch(next);
  }
);

//Theaters
router.post(
  "/add-theater",
  async (req: Request, res: Response, next: NextFunction) => {
    await theaterController.addTheater(req, res).catch(next);
  }
);

router.put(
  "/update-theater",
  async (req: Request, res: Response, next: NextFunction) => {
    await theaterController.updateTheater(req, res).catch(next);
  }
);

router.delete(
  "/delete-theater",
  async (req: Request, res: Response, next: NextFunction) => {
    await theaterController.deleteTheater(req, res).catch(next);
  }
);

//Seats
router.post(
  "/add-seat",
  async (req: Request, res: Response, next: NextFunction) => {
    await seatController.addSeat(req, res).catch(next);
  }
);

router.put(
  "/update-seat",
  async (req: Request, res: Response, next: NextFunction) => {
    await seatController.updateSeat(req, res).catch(next);
  }
);

router.delete(
  "/delete-seat",
  async (req: Request, res: Response, next: NextFunction) => {
    await seatController.deleteSeat(req, res).catch(next);
  }
);

export default router;
