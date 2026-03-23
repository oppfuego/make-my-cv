import { NextResponse } from "next/server";
import { topUpQuoteService } from "@/backend/services/topUpQuote.service";

export async function POST(req: Request) {
    if (process.env.MYACCEPT_ENV === "prod") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { referenceId } = await req.json();

    if (!referenceId || typeof referenceId !== "string") {
        return NextResponse.json({ error: "referenceId is required" }, { status: 400 });
    }

    try {
        const result = await topUpQuoteService.fulfillQuote(referenceId, {
            providerState: "COMPLETED",
        });

        return NextResponse.json({
            ok: true,
            fulfilled: result.fulfilled,
            tokens: result.quote.tokens,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
