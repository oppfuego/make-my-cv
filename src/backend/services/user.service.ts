import { User } from "../models/user.model";
import {connectDB} from "@/backend/config/db";

export const userService = {
    async addTokens(userId: string, amount: number) {
        const user = await User.findById(userId);
        if (!user) throw new Error("UserNotFound");

        user.tokens = (user.tokens || 0) + amount;
        await user.save();
        return user;
    },

    async incrementTokensByEmail(email: string, tokens: number) {
        return User.findOneAndUpdate(
            { email },
            { $inc: { tokens } },
            { new: true } // повертає оновлений документ
        );
    },

    async getUserById(userId: string) {
        const user = await User.findById(userId);
        if (!user) throw new Error("UserNotFound");
        return user;
    },

    async getUserByEmail(email: string) {
        const user = await User.findOne({ email });
        if (!user) throw new Error("UserNotFound");
        return user;
    },
};
