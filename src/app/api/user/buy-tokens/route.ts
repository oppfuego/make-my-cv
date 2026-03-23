import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { userController } from "@/backend/controllers/user.controller";
import { convertCurrencyToGBP, SupportedCurrency, tokensFromGBP } from "@/resources/pricing";

function isSupportedCurrency(value: unknown): value is SupportedCurrency {
    return value === "GBP" || value === "EUR" || value === "USD";
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (process.env.NEXT_PUBLIC_MYACCEPT_ENV === "sandbox") {
            const sandboxCurrency = isSupportedCurrency(body.currency) ? body.currency : "EUR";
            const sandboxAmount =
                typeof body.amount === "number"
                    ? body.amount
                    : typeof body.amountEUR === "number"
                        ? body.amountEUR
                        : 0;

            if (!body.email || sandboxAmount <= 0) {
                return NextResponse.json({ error: "Invalid sandbox payload" }, { status: 400 });
            }

            const tokens = tokensFromGBP(convertCurrencyToGBP(sandboxAmount, sandboxCurrency));

            await userController.buyTokensByEmail(body.email, tokens, {
                currency: sandboxCurrency,
                amountValue: sandboxAmount,
            });

            return NextResponse.json({
                ok: true,
                tokens,
                sandbox: true,
            });
        }

        const payload = await requireAuth(req);
        const { currency, amount } = body as { currency?: SupportedCurrency; amount?: number };

        if (!isSupportedCurrency(currency) || typeof amount !== "number") {
            return NextResponse.json({ message: "Invalid request" }, { status: 400 });
        }

        const gbpEquivalent = convertCurrencyToGBP(amount, currency);
        if (gbpEquivalent < 0.01) {
            return NextResponse.json({ message: "Minimum is 0.01" }, { status: 400 });
        }

        const tokens = tokensFromGBP(gbpEquivalent);
        const user = await userController.buyTokens(payload.sub, tokens, {
            currency,
            amountValue: amount,
        });

        return NextResponse.json({
            user,
            info: `Converted ${amount} ${currency} -> ${tokens} tokens`,
        });
    } catch (err: any) {
        return NextResponse.json(
            { message: err.message || "Server error" },
            { status: 400 }
        );
    }
}
