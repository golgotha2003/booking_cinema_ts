import { Document, Types } from "mongoose";
import { SeatType } from "../utils/seat/type.enum";

export interface ISeat extends Document {
    theater_id: Types.ObjectId;
    row: string;
    number: number;
    seat_number: string;
    type: SeatType;
}