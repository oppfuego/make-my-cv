import { NextResponse } from "next/server";
import {seoRequestController} from "@/backend/controllers/seoRequesr.controller";

export async function POST(req: Request) {
    try {
        let body: any = {};
        const contentType = req.headers.get("content-type") || "";

        // ✅ Якщо запит JSON
        if (contentType.includes("application/json")) {
            body = await req.json();
        }
        // 📂 Якщо multipart/form-data
        else if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();

            body = {
                userId: formData.get("userId"),
                userEmail: formData.get("userEmail"),
                service: formData.get("service"),
                message: formData.get("message"),
                tokens: Number(formData.get("tokens")),
                extras: [],
                extraValues: {},
            };

            try {
                const extrasRaw = formData.get("extras");
                const extraValuesRaw = formData.get("extraValues");
                if (extrasRaw) body.extras = JSON.parse(extrasRaw as string);
                if (extraValuesRaw) body.extraValues = JSON.parse(extraValuesRaw as string);
            } catch (err) {
                console.warn("⚠️ Could not parse extras or extraValues:", err);
            }

            for (const [key, value] of formData.entries()) {
                if (value instanceof File) {
                    if (!body.files) body.files = {};
                    body.files[key] = value.name;
                }
            }
        } else {
            return NextResponse.json(
                { error: "Unsupported Content-Type" },
                { status: 400 }
            );
        }

        const { userId, userEmail, service, message, tokens, extras } = body;

        if (!userId || !userEmail || !service) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const data = await seoRequestController.createRequest(userId, userEmail, {
            service,
            message,
            tokens,
            extras,
        });

        return NextResponse.json(data, { status: 200 });
    } catch (err: any) {
        console.error("❌ SEO-request error:", err);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
