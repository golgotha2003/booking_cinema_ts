import { ITheater } from "../interfaces/iTheater";
import Theater from "../models/theater";

class TheaterService {
    getAllTheaters = async () => {
        const theaters = await Theater.find();
        return theaters;
    }

    getTheaterById = async (id: string) => {
        const theater = await Theater.findById(id);
        return theater;
    }

    addTheater = async (theater: ITheater) => {
        const existingTheater = await Theater.findOne({theater: theater.name});

        if(existingTheater) throw new Error("Theater alrealy exist.");

        const newTheater = new Theater(theater);

        await newTheater.save();

        return newTheater;
    }

    updateTheater = async (id: string, theater: ITheater) => {
        const existingTheater = await Theater.findById(id);

        if(!existingTheater) throw new Error("Theater not found.");

        existingTheater.name = theater.name;
        existingTheater.location = theater.location;
        existingTheater.capacity = theater.capacity;

        await existingTheater.save();

        return existingTheater;
    }

    deleteTheater = async (id: string) => {
        const theater = await Theater.findByIdAndDelete(id);
        
        if(!theater) throw new Error("Theater not found.");

        await theater.deleteOne();
    }
}

export default new TheaterService();