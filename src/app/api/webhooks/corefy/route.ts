import { NextRequest, NextResponse } from "next/server";
import { corefyService } from "@/backend/services/corefy.service";

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        const incomingSignature =
            req.headers.get("x-signature") ||
            req.headers.get("signature") ||
            req.headers.get("http_x_signature");

        const isValid = corefyService.verifyWebhookSignature(
            rawBody,
            incomingSignature
        );

        if (!isValid) {
            console.error("❌ [Corefy Webhook] Signature verification failed");
            return NextResponse.json(
                { error: "Signature mismatch" },
                { status: 403 }
            );
        }

        let payload: any;
        try {
            payload = JSON.parse(rawBody);
        } catch (e) {
            return NextResponse.json(
                { error: "Invalid JSON payload" },
                { status: 400 }
            );
        }

        await corefyService.handleWebhookEvent(payload);

        return NextResponse.json({ status: "ok" }, { status: 200 });
    } catch (err: any) {
        console.error("❌ [Corefy Webhook] Error:", err);
        return NextResponse.json(
            { error: err.message || "Webhook handling failed" },
            { status: 500 }
        );
    }
}
