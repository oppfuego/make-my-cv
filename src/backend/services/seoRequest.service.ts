import { connectDB } from "../config/db";
import { SeoRequest } from "../models/seoRequest.model";
import { User } from "../models/user.model";
import { transactionService } from "../services/transaction.service";
import { sendEmail } from "../utils/sendEmail";
import { COMPANY_EMAIL } from "@/resources/constants";
import { mailService } from "@/backend/services/mail.service";

export const seoRequestService = {
    /** Create new SEO request */
    async createSeoRequest(userId: string, email: string, body: any) {
        await connectDB();

        if (!body?.service) throw new Error("Missing 'service'");
        const service = body.service;
        const message = body.message || "";
        const tokensUsed = Number(body.tokens || 5);
        const extras = body.extras || [];

        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        if (user.tokens < tokensUsed)
            throw new Error(`Insufficient tokens (have ${user.tokens}, need ${tokensUsed})`);

        user.tokens -= tokensUsed;
        await user.save();

        await transactionService.record(user._id, email, tokensUsed, "spend", user.tokens);

        const request = await SeoRequest.create({
            userId: user._id,
            email,
            service,
            message,
            extras,
            tokensUsed,
        });

        const text = `
New SEO Request Submitted:
----------------------------
User: ${email}
Service: ${service}
Tokens Used: ${tokensUsed}
Extras: ${extras?.length ? extras.join(", ") : "none"}
Message: ${message || "(none)"}
        `;
        sendEmail(
            COMPANY_EMAIL ?? "",
            `📈 New SEO Request — ${service}`,
            text
        ).catch((error) => {
            console.error("Failed to send internal SEO request email:", error);
        });

        mailService
            .sendOrderConfirmation({
                to: user.email,
                firstName: user.firstName,
                orderId: request._id.toString(),
                service,
                summary: `Your ${service} request has been submitted successfully.`,
                tokensUsed,
                items: [
                    `Service: ${service}`,
                    `Message: ${message || "No additional message provided"}`,
                    ...(extras || []).map((extra: string) => `Extra: ${extra}`),
                ],
            })
            .catch((error) => {
                console.error("Failed to send SEO request confirmation email:", error);
            });

        return request.toObject({ flattenMaps: true });
    },

    /** Get all requests by user */
    async getUserRequests(userId: string) {
        await connectDB();
        return await SeoRequest.find({ userId }).sort({ createdAt: -1 }).lean();
    },

    /** Get all requests (admin only) */
    async getAllRequests() {
        await connectDB();
        return await SeoRequest.find().sort({ createdAt: -1 }).lean();
    },
};
