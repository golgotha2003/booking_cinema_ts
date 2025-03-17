import { ISeat } from "../interfaces/iSeat";
import Seat from "../models/seat";

class SeatService {

    getSeatsByTheaterId = async (theaterId: string) => {
        const seats = await Seat.find({theater_id: theaterId});

        return seats;
    }

    addSeat = async (seat: ISeat) => {
        const existingSeat = await Seat.findOne({seat_number: seat.seat_number, theater_id: seat.theater_id});
        if (existingSeat) throw new Error("Seat already exist");

        const newSeat = new Seat(seat);
        await newSeat.save();

        return newSeat;
    }

    updateSeat = async (id: string, seat: ISeat) => {
        const existingSeat = await Seat.findById(id);
        if (!existingSeat) throw new Error("Seat not found");

        existingSeat.row = seat.row;
        existingSeat.number = seat.number;
        existingSeat.type = seat.type;
        existingSeat.status = seat.status;

        await existingSeat.save();

        return existingSeat;
    }

    deleteSeat = async (id: string) => {
        const existingSeat = await Seat.findById(id);
        if (!existingSeat) throw new Error("Seat not found");

        await existingSeat.deleteOne();
    }
}

export default new SeatService();