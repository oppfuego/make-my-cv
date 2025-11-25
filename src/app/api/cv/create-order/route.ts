import { NextRequest, NextResponse } from "next/server";
import { cvController } from "@/backend/controllers/cv.controller";
import { requireAuth } from "@/backend/middlewares/auth.middleware";

export async function POST(req: NextRequest) {
    try {
        const payload = await requireAuth(req);
        if (!payload?.sub) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        const userId = payload.sub;
        const email = payload.email;

        const result = await cvController.createOrder(userId, email, body);
        return NextResponse.json(result);
    } catch (err: any) {
        console.error("❌ Error creating CV order:", err);
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
