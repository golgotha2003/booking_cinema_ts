import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/iUser";
import { Role } from "../utils/user/role.enum";

const UserSchema = new Schema<IUser>({
    avatar: {
        type: String,
        default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER
    }
},
{
    timestamps: true,
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;