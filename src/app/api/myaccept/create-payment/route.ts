import { NextResponse } from "next/server";

const MYACCEPT_API_KEY = process.env.MYACCEPT_API_KEY!;
const MYACCEPT_BASE_URL =
    process.env.MYACCEPT_ENV === "prod"
        ? "https://engine.myaccept.co"
        : "https://engine-sandbox.myaccept.co";

const SITE_URL = process.env.SITE_URL!;

export async function POST(req: Request) {
    const traceId = `myaccept_${Date.now()}`;

    console.log("────────────────────────────────────────");
    console.log("[MyAccept] CREATE PAYMENT START");
    console.log("[traceId]", traceId);
    console.log("[env]", process.env.MYACCEPT_ENV ?? "sandbox");
    console.log("[baseUrl]", MYACCEPT_BASE_URL);

    try {
        const body = await req.json();
        console.log("[request.body]", body);

        const { amountEUR, email } = body;

        if (!amountEUR || typeof amountEUR !== "number" || amountEUR <= 0) {
            console.warn("[validation] invalid amount:", amountEUR);
            return NextResponse.json(
                { error: "Invalid amount", traceId },
                { status: 400 }
            );
        }

        const referenceId = `order_${Date.now()}`;

        const payload = {
            paymentType: "DEPOSIT",
            referenceId,
            description: "Deposit via website",
            amount: amountEUR,
            currency: "EUR",
            paymentMethod: "BASIC_CARD",
            customer: {
                referenceId: email ?? referenceId,
                email: email ?? undefined,
                ip: req.headers.get("x-forwarded-for") ?? undefined,
            },
            successUrl: `${SITE_URL}/checkout/success`,
            declineUrl: `${SITE_URL}/checkout/decline`,
            webhookUrl: `${SITE_URL}/api/myaccept/webhook`,
        };

        console.log("[myaccept.payload]", payload);

        const res = await fetch(`${MYACCEPT_BASE_URL}/api/v1/payments`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${MYACCEPT_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        console.log("[myaccept.response.status]", res.status);

        const raw = await res.text();
        console.log("[myaccept.response.raw]", raw);

        const parsed = JSON.parse(raw);
        const result = parsed?.result;

        if (!result?.redirectUrl) {
            return NextResponse.json(
                { error: "redirectUrl missing", parsed, traceId },
                { status: 500 }
            );
        }

        console.log("[SUCCESS] redirectUrl generated");
        console.log("[redirectUrl]", result.redirectUrl);

        return NextResponse.json({
            paymentId: result.id,
            redirectUrl: result.redirectUrl,
            traceId,
        });
    } catch (e: any) {
        console.error("[FATAL ERROR]", e);
        return NextResponse.json(
            { error: e.message || "Server error", traceId },
            { status: 500 }
        );
    }
}
