import crypto from "crypto";
import { connectDB } from "@/backend/config/db";
import { TopUpQuote, ITopUpQuote } from "@/backend/models/topUpQuote.model";
import { userController } from "@/backend/controllers/user.controller";
import { TopUpPackageId, TopUpQuote as TopUpQuoteCalculation, SupportedCurrency } from "@/resources/pricing";

type CreateQuoteInput = TopUpQuoteCalculation & {
    email: string;
};

function buildReferenceId(packageId: TopUpPackageId) {
    return `topup_${packageId}_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
}

function buildTransactionReference(referenceId: string) {
    return `topup:${referenceId}`;
}

export const topUpQuoteService = {
    async createQuote(input: CreateQuoteInput) {
        await connectDB();

        const quote = await TopUpQuote.create({
            referenceId: buildReferenceId(input.packageId),
            email: input.email.toLowerCase(),
            packageId: input.packageId,
            inputAmount: input.inputAmount,
            inputCurrency: input.inputCurrency,
            gbpAmount: input.gbpAmount,
            eurAmount: input.eurAmount,
            tokens: input.tokens,
            status: "pending",
        });

        return quote;
    },

    async getByReferenceId(referenceId: string) {
        await connectDB();
        return TopUpQuote.findOne({ referenceId });
    },

    async getByProviderPaymentId(providerPaymentId: string) {
        await connectDB();
        return TopUpQuote.findOne({ providerPaymentId });
    },

    async attachProviderPayment(referenceId: string, providerPaymentId?: string, providerState?: string) {
        await connectDB();
        return TopUpQuote.findOneAndUpdate(
            { referenceId },
            {
                $set: {
                    ...(providerPaymentId ? { providerPaymentId } : {}),
                    ...(providerState ? { providerState } : {}),
                },
            },
            { new: true }
        );
    },

    async markFailed(referenceId: string, providerPaymentId?: string, providerState?: string) {
        await connectDB();
        return TopUpQuote.findOneAndUpdate(
            { referenceId, status: "pending" },
            {
                $set: {
                    status: "failed",
                    ...(providerPaymentId ? { providerPaymentId } : {}),
                    ...(providerState ? { providerState } : {}),
                },
            },
            { new: true }
        );
    },

    async fulfillQuote(referenceId: string, options?: { providerPaymentId?: string; providerState?: string }) {
        await connectDB();

        const quote = await TopUpQuote.findOne({ referenceId });
        if (!quote) throw new Error("Top-up quote not found");

        if (quote.status === "processed") {
            return { quote, fulfilled: false };
        }

        if (quote.status === "failed") {
            throw new Error("Top-up quote already failed");
        }

        await userController.buyTokensByEmail(quote.email, quote.tokens, {
            currency: quote.inputCurrency,
            amountValue: quote.inputAmount,
            referenceKey: buildTransactionReference(referenceId),
        });

        const updated = await TopUpQuote.findOneAndUpdate(
            { referenceId, status: "pending" },
            {
                $set: {
                    status: "processed",
                    processedAt: new Date(),
                    ...(options?.providerPaymentId ? { providerPaymentId: options.providerPaymentId } : {}),
                    ...(options?.providerState ? { providerState: options.providerState } : {}),
                },
            },
            { new: true }
        );

        return { quote: updated ?? quote, fulfilled: true };
    },
};
