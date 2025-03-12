import mongoose, { Schema } from "mongoose";
import { IReview } from "../interfaces/iReview";

const ReviewSchema = new Schema<IReview>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    movie_id: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Review = mongoose.model<IReview>("Review", ReviewSchema);

export default Review;