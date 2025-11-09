import { seoRequestService } from "../services/seoRequest.service";
import { connectDB } from "../config/db";

export const seoRequestController = {
    async createRequest(userId: string, email: string, body: any) {
        await connectDB();
        const request = await seoRequestService.createSeoRequest(
            userId,
            email,
            body
        );
        return { request };
    },

    async getMyRequests(userId: string) {
        await connectDB();
        const requests = await seoRequestService.getUserRequests(userId);
        return { requests };
    },

    async getAll() {
        await connectDB();
        const requests = await seoRequestService.getAllRequests();
        return { requests };
    },
};
