import { connectDB } from "../config/db";
import { Transaction } from "@/backend/models/transaction.model";
import mongoose from "mongoose";

export const transactionService = {
    async findByReference(referenceKey: string) {
        await connectDB();
        return Transaction.findOne({ referenceKey });
    },

    async record(
        userId: mongoose.Types.ObjectId,
        email: string,
        amount: number,
        type: "add" | "spend",
        balanceAfter: number,
        options?: {
            description?: string;
            referenceKey?: string;
            metadata?: Record<string, unknown>;
        }
    ) {
        await connectDB();
        const tx = await Transaction.create({
            userId,
            email,
            amount,
            type,
            balanceAfter,
            description: options?.description,
            referenceKey: options?.referenceKey,
            metadata: options?.metadata,
        });
        console.log("🧾 Transaction saved:", tx);
        return tx;
    },
};
