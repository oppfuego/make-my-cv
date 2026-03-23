import { NextResponse } from "next/server";
import { getTopUpQuote, SupportedCurrency, TopUpPackageId } from "@/resources/pricing";
import { topUpQuoteService } from "@/backend/services/topUpQuote.service";

const MYACCEPT_API_KEY = process.env.MYACCEPT_API_KEY!;
const MYACCEPT_BASE_URL =
    process.env.MYACCEPT_ENV === "prod"
        ? "https://engine.myaccept.co"
        : "https://engine-sandbox.myaccept.co";

const SITE_URL = process.env.SITE_URL!;

type FixedPackageRequest = {
    packageId: Exclude<TopUpPackageId, "custom">;
    email: string;
};

type CustomPackageRequest = {
    packageId: "custom";
    amount: number;
    currency: SupportedCurrency;
    email: string;
};

function isSupportedCurrency(value: unknown): value is SupportedCurrency {
    return value === "GBP" || value === "EUR" || value === "USD";
}

function isFixedPackageId(value: unknown): value is Exclude<TopUpPackageId, "custom"> {
    return value === "starter" || value === "pro" || value === "premium";
}

function buildDescription(packageId: TopUpPackageId) {
    switch (packageId) {
        case "starter":
            return "Starter token package";
        case "pro":
            return "Pro token package";
        case "premium":
            return "Premium token package";
        default:
            return "Custom token package";
    }
}

export async function POST(req: Request) {
    const traceId = `myaccept_${Date.now()}`;

    try {
        const body = await req.json();
        const { packageId, email } = body as Partial<FixedPackageRequest & CustomPackageRequest>;

        if (!email || typeof email !== "string") {
            return NextResponse.json({ error: "Email is required", traceId }, { status: 400 });
        }

        if (!packageId) {
            return NextResponse.json({ error: "packageId is required", traceId }, { status: 400 });
        }

        let quoteInput;

        if (packageId === "custom") {
            const { amount, currency } = body as Partial<CustomPackageRequest>;

            if (typeof amount !== "number" || amount <= 0) {
                return NextResponse.json({ error: "Invalid custom amount", traceId }, { status: 400 });
            }

            if (!isSupportedCurrency(currency)) {
                return NextResponse.json({ error: "Unsupported currency", traceId }, { status: 400 });
            }

            quoteInput = getTopUpQuote({ packageId, amount, currency });
        } else if (isFixedPackageId(packageId)) {
            quoteInput = getTopUpQuote({ packageId });
        } else {
            return NextResponse.json({ error: "Unsupported packageId", traceId }, { status: 400 });
        }

        const quote = await topUpQuoteService.createQuote({
            email,
            ...quoteInput,
        });

        const payload = {
            paymentType: "DEPOSIT",
            referenceId: quote.referenceId,
            description: buildDescription(quote.packageId),
            amount: quote.eurAmount,
            currency: "EUR",
            customer: {
                referenceId: email,
                email,
                ip: req.headers.get("x-forwarded-for") ?? undefined,
            },
            successUrl: `${SITE_URL}/checkout/success`,
            declineUrl: `${SITE_URL}/checkout/failed`,
            webhookUrl: `${SITE_URL}/api/myaccept/webhook`,
        };

        const res = await fetch(`${MYACCEPT_BASE_URL}/api/v1/payments`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${MYACCEPT_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const raw = await res.text();
        const parsed = JSON.parse(raw);
        const result = parsed?.result;

        if (!result?.redirectUrl) {
            return NextResponse.json(
                { error: "redirectUrl missing", parsed, traceId },
                { status: 500 }
            );
        }

        await topUpQuoteService.attachProviderPayment(
            quote.referenceId,
            typeof result.id === "string" ? result.id : undefined
        );

        return NextResponse.json({
            paymentId: result.id,
            redirectUrl: result.redirectUrl,
            referenceId: quote.referenceId,
            traceId,
        });
    } catch (e: any) {
        return NextResponse.json(
            { error: e.message || "Server error", traceId },
            { status: 500 }
        );
    }
}
