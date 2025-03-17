/*************  ✨ Codeium Command 🌟  *************/
import bcrypt from 'bcrypt';
import { CurrentResponseDto } from "../dto/res/user.res.dto";
import User from "../models/user";

class UserService {
    /**
     * Get current user by email
     * @param email user email
     * @returns current user
     */
    getCurrent = async (email: string): Promise<CurrentResponseDto> => {
        const user = await User.findOne({ email }).select("avatar email full_name phone");

        if (!user) throw new Error("User not found");

        return user.toObject() as CurrentResponseDto;
    }

    /**
     * Update current user
     * @param user user data
     * @returns updated user
     */
    updateCurrent = async (user: CurrentResponseDto) => {
        const existingUser = await User.findOne({email: user.email});

        if (!existingUser) throw new Error("User not found");

        existingUser.avatar = user.avatar;
        existingUser.full_name = user.full_name;
        existingUser.phone = user.phone;

        await existingUser.save();

        return existingUser.toObject() as CurrentResponseDto;
    }

    /**
     * Change password of current user
     * @param email user email
     * @param oldPassword old password
     * @param newPassword new password
     */
    changePassword = async (email: string, oldPassword: string, newPassword: string) => {
        const user = await User.findOne({email});

        if (!user) throw new Error("User not found");

        if(!await bcrypt.compare(oldPassword, user.password)) throw new Error("Invalid old password");

        user.password = newPassword;

        await user.save();
    }

}

export default new UserService();
/******  4ba1a753-4e26-4d49-a64e-abbf40803b48  *******/