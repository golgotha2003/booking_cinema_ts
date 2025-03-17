import { Request, Response } from "express";
import movieService from "../services/movie.service";
import { IMovie } from "../interfaces/iMovie";

class MovieController {
    getAllMovies = async (req: Request, res: Response) => {
        try {
            const movies = await movieService.getAllMovies();

            return res.status(200).json({
                success: true,
                message: "Get all movies successfully",
                movies: movies,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Get all movies failed",
                error: err instanceof Error ? err.message : err,
            });
        }
    }

    getMovieById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const movie = await movieService.getMovieById(id);

            return res.status(200).json({
                success: true,
                message: "Get movie by id successfully",
                movie: movie,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Get movie by id failed",
                error: err instanceof Error ? err.message : err,
            });
        }
    }

    searchMovie = async (req: Request, res: Response) => {
        try {
            const query = req.params.query;
            const movies = await movieService.searchMovie(query);

            return res.status(200).json({
                success: true,
                message: "Search movie successfully",
                movies: movies,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Search movie failed",
                error: err instanceof Error ? err.message : err,
            });
        }
    }

    getMoviesByGenre = async (req: Request, res: Response) => {
        try {
            const genre = req.params.genre;
            const movies = await movieService.getMoviesByGenre(genre);

            return res.status(200).json({    
                success: true,
                message: "Get movies by genre successfully",
                movies: movies,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Get movies by genre failed",
                error: err instanceof Error ? err.message : err,
            });
        }
    }

    addMovie = async (req: Request, res: Response) => {
        try {
            const movie = req.body as IMovie;
            const newMovie = await movieService.addMovie(movie);

            return res.status(201).json({
                success: true,
                message: "Add movie successfully",
                movie: newMovie,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Add movie failed",
                error: err instanceof Error ? err.message : err,
            });
        }
    }

    updateMovie = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const movie = req.body as IMovie;
            const updatedMovie = await movieService.updateMovie(id, movie);

            return res.status(200).json({
                success: true,
                message: "Update movie successfully",
                movie: updatedMovie,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Update movie failed",
                error: err instanceof Error ? err.message : err,
            });
        }
    }

    deleteMovie = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const deletedMovie = await movieService.deleteMovie(id);

            return res.status(200).json({
                success: true,
                message: "Delete movie successfully",
                movie: deletedMovie,
            });        
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Delete movie failed",
                error: err instanceof Error ? err.message : err,
            });
        }
    }   
}

export default new MovieController();