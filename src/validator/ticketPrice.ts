import Showtime from "../models/showtime";
import Movie from '../models/movie';
import Seat from '../models/seat';
import { SeatMultipler, SeatType } from '../utils/seat/type.enum';

const timeMultipler = async (hour: number) => {
    if(hour >=8 && hour < 17) return 1.0;
    if(hour >=17 && hour < 22) return 1.2;

    return 1.1;
}

export const ticketPrice = async (showtime_id: string, seat_id: string) => {

    const showtime = await Showtime.findById(showtime_id);

    if (!showtime) throw new Error("Showtime not found");

    const time_multiplier = await timeMultipler(showtime.start_time.getHours());

    const movie = await Movie.findById(showtime.movie_id);
    if (!movie) throw new Error("Movie not found");
    const movie_price = movie.price;

    const seat = await Seat.findById(seat_id);
    if (!seat) throw new Error("Seat not found");
    const seat_multiplier = SeatMultipler[seat.type];

    return movie_price * time_multiplier * seat_multiplier;
}