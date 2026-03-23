import crypto from "crypto";
import { NextResponse } from "next/server";
import { topUpQuoteService } from "@/backend/services/topUpQuote.service";

const SIGNING_KEY = process.env.MYACCEPT_SIGNING_KEY!;

export async function POST(req: Request) {
    const rawBody = await req.text();
    const signature = req.headers.get("signature");

    const expected = crypto
        .createHmac("sha256", SIGNING_KEY)
        .update(rawBody)
        .digest("hex");

    if (signature !== expected) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    const payment = event?.result;
    const referenceId = payment?.referenceId;
    const providerPaymentId = payment?.id;
    const providerState = payment?.state;

    if (!referenceId || typeof referenceId !== "string") {
        return NextResponse.json({ error: "Missing referenceId" }, { status: 400 });
    }

    const quote =
        (providerPaymentId ? await topUpQuoteService.getByProviderPaymentId(providerPaymentId) : null) ??
        await topUpQuoteService.getByReferenceId(referenceId);

    if (!quote) {
        return NextResponse.json({ error: "Top-up quote not found" }, { status: 404 });
    }

    await topUpQuoteService.attachProviderPayment(quote.referenceId, providerPaymentId, providerState);

    if (providerState !== "COMPLETED") {
        if (providerState === "DECLINED" || providerState === "CANCELLED" || providerState === "FAILED") {
            await topUpQuoteService.markFailed(quote.referenceId, providerPaymentId, providerState);
        }

        return NextResponse.json({ ok: true });
    }

    await topUpQuoteService.fulfillQuote(quote.referenceId, {
        providerPaymentId,
        providerState,
    });

    return NextResponse.json({ ok: true });
}
