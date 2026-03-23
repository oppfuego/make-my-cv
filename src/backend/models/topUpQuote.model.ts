import mongoose, { Document, Model, Schema } from "mongoose";
import { SupportedCurrency, TopUpPackageId } from "@/resources/pricing";

export interface ITopUpQuote extends Document {
    referenceId: string;
    email: string;
    packageId: TopUpPackageId;
    inputAmount: number;
    inputCurrency: SupportedCurrency;
    gbpAmount: number;
    eurAmount: number;
    tokens: number;
    status: "pending" | "processed" | "failed";
    providerPaymentId?: string | null;
    providerState?: string | null;
    processedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

const TopUpQuoteSchema = new Schema<ITopUpQuote>(
    {
        referenceId: { type: String, required: true, unique: true, index: true },
        email: { type: String, required: true, lowercase: true, index: true },
        packageId: {
            type: String,
            enum: ["starter", "pro", "premium", "custom"],
            required: true,
        },
        inputAmount: { type: Number, required: true },
        inputCurrency: {
            type: String,
            enum: ["GBP", "EUR", "USD"],
            required: true,
        },
        gbpAmount: { type: Number, required: true },
        eurAmount: { type: Number, required: true },
        tokens: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "processed", "failed"],
            default: "pending",
            index: true,
        },
        providerPaymentId: { type: String, default: null, sparse: true, index: true },
        providerState: { type: String, default: null },
        processedAt: { type: Date, default: null },
    },
    { timestamps: true }
);

export const TopUpQuote: Model<ITopUpQuote> =
    mongoose.models.TopUpQuote ||
    mongoose.model<ITopUpQuote>("TopUpQuote", TopUpQuoteSchema);
