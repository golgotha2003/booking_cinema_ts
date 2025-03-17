import User from "../models/user";

class AdminService {
    getAllUsers = async () => {
        const users = await User.find({}).select("-password");

        return users;
    }

    toggleUserStatus = async (email: string, isLocked: boolean) => {
        const user = await User.findOne({email});

        if(!user) throw new Error("User not found");

        user.is_locked = isLocked;

        await user.save();

        return isLocked ? "Locked" : "Unlocked";
    }
}

export default new AdminService();