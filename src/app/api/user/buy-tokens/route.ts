import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { userController } from "@/backend/controllers/user.controller";

const TOKENS_PER_EUR = 85;
const TOKENS_PER_GBP = 100;
const RATES_TO_GBP = { GBP: 1, EUR: 1.17 };

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        /**
         * ===============================
         * 🧪 SANDBOX MODE (NO AUTH)
         * ===============================
         */
        if (process.env.NEXT_PUBLIC_MYACCEPT_ENV === "sandbox") {
            const { email, amountEUR } = body;

            if (!email || !amountEUR || amountEUR <= 0) {
                return NextResponse.json(
                    { error: "Invalid sandbox payload" },
                    { status: 400 }
                );
            }

            const tokens = Math.floor(amountEUR * TOKENS_PER_EUR);

            await userController.buyTokensByEmail(email, tokens);

            return NextResponse.json({
                ok: true,
                tokens,
                sandbox: true,
            });
        }

        /**
         * ===============================
         * 🚀 PRODUCTION MODE (AUTH)
         * ===============================
         */
        const payload = await requireAuth(req);

        if (body.currency && body.amount) {
            const { currency, amount } = body;

            if (!["GBP", "EUR"].includes(currency)) {
                return NextResponse.json(
                    { message: "Unsupported currency" },
                    { status: 400 }
                );
            }

            const gbpEquivalent =
                amount / RATES_TO_GBP[currency as "GBP" | "EUR"];

            if (gbpEquivalent < 0.01) {
                return NextResponse.json(
                    { message: "Minimum is 0.01" },
                    { status: 400 }
                );
            }

            const tokens = Math.floor(gbpEquivalent * TOKENS_PER_GBP);
            const user = await userController.buyTokens(payload.sub, tokens);

            return NextResponse.json({
                user,
                info: `Converted ${amount} ${currency} → ${tokens} tokens`,
            });
        }

        return NextResponse.json(
            { message: "Invalid request" },
            { status: 400 }
        );
    } catch (err: any) {
        console.error("buy-tokens error:", err);
        return NextResponse.json(
            { message: err.message || "Server error" },
            { status: 400 }
        );
    }
}
