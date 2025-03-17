import { IMovie } from "../interfaces/iMovie";
import Movie from "../models/movie";

class MovieService {
    getAllMovies = async () => {
        const movies = await Movie.find();

        return movies;
    }

    getMovieById = async (id: string) => {
        const movie = await Movie.findById(id);

        if (!movie) throw new Error("Movie not found");

        return movie;
    }

    searchMovie = async (query: string) => {
        const movies = await Movie.find({ title: { $regex: query, $options: "i" } });

        return movies;
    }

    getMoviesByGenre = async (genre: string) => {
        const movies = await Movie.find({ genre });

        return movies;
    }

    addMovie = async (movie: IMovie) => {

        const existingMovie = await Movie.findOne({ title: movie.title });

        if (existingMovie) throw new Error("Movie already exist");

        const newMovie = new Movie(movie);

        await newMovie.save();

        return newMovie;
    }

    updateMovie = async (id: string, movie: IMovie) => {
        const existingMovie = await Movie.findById(id);

        if (!existingMovie) throw new Error("Movie not found");

        existingMovie.title = movie.title;
        existingMovie.description = movie.description;
        existingMovie.duration = movie.duration;
        existingMovie.release_date = movie.release_date;        
        existingMovie.language = movie.language;
        existingMovie.genre = movie.genre;
        existingMovie.rating = movie.rating;
        existingMovie.status = movie.status;
        existingMovie.poster = movie.poster;
        existingMovie.trailer = movie.trailer;

        await existingMovie.save();

        return existingMovie;
    }

    deleteMovie = async (id: string) => {
        const existingMovie = await Movie.findById(id);

        if (!existingMovie) throw new Error("Movie not found");

        await existingMovie.deleteOne();
    }
}

export default new MovieService();