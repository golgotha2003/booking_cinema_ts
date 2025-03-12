import mongoose, { Schema } from "mongoose";
import { IMovie } from "../interfaces/iMovie";
import { MovieStatus } from "../utils/movie/status.enum";

const MovieSchema = new Schema<IMovie>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    release_date: {
        type: Date,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(MovieStatus),
        default: MovieStatus.INACTIVE
    },
    poster: {
        type: String,
        required: true
    },
    trailer: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Movie = mongoose.model<IMovie>("Movie", MovieSchema);

export default Movie;