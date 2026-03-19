import crypto from "crypto";
import { NextResponse } from "next/server";
import { userController } from "@/backend/controllers/user.controller";

const SIGNING_KEY = process.env.MYACCEPT_SIGNING_KEY!;
const TOKENS_PER_EUR = 85; // 100 GBP ≈ 85 EUR

export async function POST(req: Request) {
    const rawBody = await req.text();
    const signature = req.headers.get("signature");

    const expected = crypto
        .createHmac("sha256", SIGNING_KEY)
        .update(rawBody)
        .digest("hex");

    if (signature !== expected) {
        console.error("❌ Invalid webhook signature");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    const payment = event?.result;

    console.log("🔔 Webhook received:", payment);

    /**
     * ВАЖЛИВО:
     * state === COMPLETED → ГРОШІ ЗАЧИСЛЕНІ
     */
    if (payment.state !== "COMPLETED") {
        return NextResponse.json({ ok: true });
    }

    const email = payment.customer?.email;
    const amountEUR = payment.amount;
    const referenceKey = payment.id
        ? `myaccept:${payment.id}`
        : payment.referenceId
            ? `myaccept:${payment.referenceId}`
            : undefined;

    if (!email || !amountEUR) {
        console.error("❌ Missing email or amount");
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // 💰 CALC TOKENS
    const tokens = Math.floor(amountEUR * TOKENS_PER_EUR);

    console.log(`💳 ${email} paid ${amountEUR} EUR → ${tokens} tokens`);



    await userController.buyTokensByEmail(email, tokens, {
        currency: "EUR",
        amountValue: amountEUR,
        referenceKey,
    });

    return NextResponse.json({ ok: true });
}
