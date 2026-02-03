
import { NextResponse } from "next/server";
import { userController } from "@/backend/controllers/user.controller";

const TOKENS_PER_EUR = 85;

export async function POST(req: Request) {
    if (process.env.MYACCEPT_ENV === "prod") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { email, amountEUR } = await req.json();

    if (!email || !amountEUR) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const tokens = Math.floor(amountEUR * TOKENS_PER_EUR);

    await userController.buyTokensByEmail(email, tokens);

    console.log("🧪 SANDBOX TOKENS ADDED", { email, amountEUR, tokens });

    return NextResponse.json({ ok: true, tokens });
}
