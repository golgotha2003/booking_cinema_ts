import mongoose, { Schema } from "mongoose";
import { IPromotion } from "../interfaces/iPromotion";

const PromotionSchema = new Schema<IPromotion>({
    code: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Promotion = mongoose.model<IPromotion>("Promotion", PromotionSchema);

export default Promotion; 