import { Document } from "mongoose";
import { Role } from "../utils/user/role.enum";

export interface IUser extends Document {
    avatar: string;
    email: string;
    password: string;
    full_name: string;
    phone: string;
    role: Role;
}