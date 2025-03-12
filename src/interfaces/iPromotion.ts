import { Document } from "mongoose";

export interface IPromotion extends Document {
    code: string;
    discount: number;
    start_date: Date;
    end_date: Date;
    condition: string;
}