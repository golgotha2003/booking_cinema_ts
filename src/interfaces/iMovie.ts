import { Document } from "mongoose";
import { MovieStatus } from "../utils/movie/status.enum";

export interface IMovie extends Document {
    title: string;
    description: string;
    duration: number;
    release_date: Date;
    language: string;
    genre: string;
    rating: number;
    status: MovieStatus;
    poster: string;
    trailer: string;
}