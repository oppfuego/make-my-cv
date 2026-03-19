import { connectDB } from "../config/db";
import { userService } from "../services/user.service";
import { UserType } from "@/backend/types/user.types";
import { transactionService } from "@/backend/services/transaction.service";
import { mailService } from "@/backend/services/mail.service";

export const userController = {
    async buyTokens(
        userId: string,
        amount: number,
        options?: { currency?: string; amountValue?: number; referenceKey?: string }
    ): Promise<UserType> {
        await connectDB();

        const user = await userService.addTokens(userId, amount);

        console.log("💳 Adding tokens for user:", userId);
        await transactionService.record(user._id, user.email, amount, "add", user.tokens, {
            description: "Token purchase completed",
            referenceKey: options?.referenceKey,
            metadata: {
                currency: options?.currency || "TOKENS",
                amountValue: options?.amountValue ?? amount,
            },
        });
        console.log("✅ Transaction created successfully");

        mailService
            .sendPaymentConfirmation({
                to: user.email,
                firstName: user.firstName,
                amount: options?.amountValue ?? amount,
                currency: options?.currency || "TOKENS",
                tokens: amount,
                balanceAfter: user.tokens,
                referenceKey: options?.referenceKey,
            })
            .catch((error) => {
                console.error("Failed to send payment confirmation email:", error);
            });

        return formatUser(user);
    },
    async buyTokensByEmail(
        email: string,
        tokens: number,
        options?: { currency?: string; amountValue?: number; referenceKey?: string }
    ) {
        await connectDB();

        if (options?.referenceKey) {
            const existing = await transactionService.findByReference(options.referenceKey);
            if (existing) {
                console.log("Skipping duplicate token top-up for reference:", options.referenceKey);
                return;
            }
        }

        const user = await userService.incrementTokensByEmail(email, tokens);

        if (!user) throw new Error("User not found");

        await transactionService.record(
            user._id,
            user.email,
            tokens,
            "add",
            user.tokens,
            {
                description: "Token purchase completed",
                referenceKey: options?.referenceKey,
                metadata: {
                    currency: options?.currency || "EUR",
                    amountValue: options?.amountValue ?? tokens,
                },
            }
        );

        mailService
            .sendPaymentConfirmation({
                to: user.email,
                firstName: user.firstName,
                amount: options?.amountValue ?? tokens,
                currency: options?.currency || "EUR",
                tokens,
                balanceAfter: user.tokens,
                referenceKey: options?.referenceKey,
            })
            .catch((error) => {
                console.error("Failed to send payment confirmation email:", error);
            });
    },

    async spendTokens(userId: string, amount: number, reason?: string): Promise<UserType> {
        await connectDB();

        const user = await userService.getUserById(userId);
        if (!user) throw new Error("User not found");
        if ((user.tokens || 0) < amount) throw new Error("Not enough tokens");

        user.tokens -= amount;
        await user.save();

        await transactionService.record(user._id, user.email, amount, "spend", user.tokens, {
            description: reason || "Tokens spent",
        });

        return formatUser(user);
    },
};

function formatUser(user: any): UserType {
    return {
        _id: user._id.toString(),
        name: user.name,
        firstName: user.firstName ?? null,
        lastName: user.lastName ?? null,
        email: user.email,
        phoneNumber: user.phoneNumber ?? null,
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString() : null,
        street: user.street ?? null,
        city: user.city ?? null,
        country: user.country ?? null,
        postCode: user.postCode ?? null,
        role: user.role,
        tokens: user.tokens,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
