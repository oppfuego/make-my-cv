import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPaymentOrder extends Document {
    referenceId: string;
    invoiceId?: string | null;
    orderId?: string | null;
    userId?: mongoose.Types.ObjectId | null;
    email: string;
    customerName?: string | null;
    amount: number;
    currency: string;
    service: string;
    flow: string;
    status:
        | "pending"
        | "process_pending"
        | "processed"
        | "process_failed"
        | "authorize_failed"
        | "expired"
        | "refunded";
    resolution?: string | null;
    hppUrl?: string | null;
    testMode: boolean;
    metadata?: Record<string, any>;
    payment?: {
        id?: string;
        status?: string;
        cardPanMasked?: string;
        cardHolder?: string;
        cardBrand?: string;
    };
    processedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

const PaymentOrderSchema = new Schema<IPaymentOrder>(
    {
        referenceId: { type: String, required: true, unique: true, index: true },
        invoiceId: { type: String, default: null, sparse: true, index: true },
        orderId: { type: String, default: null, index: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
        email: { type: String, required: true, lowercase: true, index: true },
        customerName: { type: String, default: null },
        amount: { type: Number, required: true },
        currency: { type: String, required: true, uppercase: true },
        service: { type: String, default: "payment_card_usd_hpp" },
        flow: { type: String, default: "charge" },
        status: {
            type: String,
            enum: [
                "pending",
                "process_pending",
                "processed",
                "process_failed",
                "authorize_failed",
                "expired",
                "refunded",
            ],
            default: "process_pending",
            index: true,
        },
        resolution: { type: String, default: null },
        hppUrl: { type: String, default: null },
        testMode: { type: Boolean, default: true },
        metadata: { type: Schema.Types.Mixed, default: {} },
        payment: {
            id: { type: String },
            status: { type: String },
            cardPanMasked: { type: String },
            cardHolder: { type: String },
            cardBrand: { type: String },
        },
        processedAt: { type: Date, default: null },
    },
    { timestamps: true }
);

export const PaymentOrder: Model<IPaymentOrder> =
    mongoose.models.PaymentOrder ||
    mongoose.model<IPaymentOrder>("PaymentOrder", PaymentOrderSchema);
