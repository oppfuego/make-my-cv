import { NextRequest, NextResponse } from "next/server";
import { corefyService } from "@/backend/services/corefy.service";
import { getTopUpQuote, TopUpPackageId } from "@/resources/pricing";
import { topUpQuoteService } from "@/backend/services/topUpQuote.service";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            orderId,
            amount,
            customerEmail,
            email,
            customerName,
            name,
            packageId,
            description,
            customerPhone,
            customerAddress,
            metadata,
        } = body;

        const effectiveEmail = (customerEmail || email)?.trim();
        const effectiveName = (customerName || name)?.trim();

        if (!effectiveEmail) {
            return NextResponse.json(
                { error: "Customer email is required" },
                { status: 400 }
            );
        }

        // We only use EUR
        const resolvedCurrency = "EUR";
        let resolvedAmount = Number(amount);
        let calculatedTokens: number | undefined;

        // If packageId is provided (e.g. from PricingCard or store)
        if (packageId) {
            if (packageId === "custom") {
                const quote = getTopUpQuote({
                    packageId: "custom",
                    amount: resolvedAmount,
                    currency: "EUR",
                });
                resolvedAmount = quote.eurAmount || quote.inputAmount;
                calculatedTokens = quote.tokens;

                const topUpQuote = await topUpQuoteService.createQuote({
                    email: effectiveEmail,
                    ...quote,
                    inputCurrency: "EUR",
                });

                const result = await corefyService.createPaymentInvoice({
                    referenceId: topUpQuote.referenceId,
                    orderId: orderId || topUpQuote.referenceId,
                    amount: resolvedAmount,
                    currency: "EUR",
                    description: description || `Points Top-up (${calculatedTokens} tokens) - Credit Card (MasterCard)`,
                    customerEmail: effectiveEmail,
                    customerName: effectiveName,
                    customerPhone,
                    customerAddress,
                    packageId,
                    tokens: calculatedTokens,
                    metadata: {
                        ...(metadata || {}),
                        package_id: packageId,
                        tokens: calculatedTokens,
                        top_up_quote_ref: topUpQuote.referenceId,
                        payment_method: "Credit Card (MasterCard)",
                    },
                });

                await topUpQuoteService.attachProviderPayment(
                    topUpQuote.referenceId,
                    result.invoiceId
                );

                return NextResponse.json(result);
            } else if (
                packageId === "starter" ||
                packageId === "pro" ||
                packageId === "premium"
            ) {
                const quote = getTopUpQuote({
                    packageId: packageId as Exclude<TopUpPackageId, "custom">,
                });
                resolvedAmount = quote.eurAmount;
                calculatedTokens = quote.tokens;

                const topUpQuote = await topUpQuoteService.createQuote({
                    email: effectiveEmail,
                    ...quote,
                    inputCurrency: "EUR",
                });

                const result = await corefyService.createPaymentInvoice({
                    referenceId: topUpQuote.referenceId,
                    orderId: orderId || topUpQuote.referenceId,
                    amount: resolvedAmount,
                    currency: "EUR",
                    description: description || `Points Package: ${packageId.toUpperCase()} (${calculatedTokens} tokens) - Credit Card (MasterCard)`,
                    customerEmail: effectiveEmail,
                    customerName: effectiveName,
                    customerPhone,
                    customerAddress,
                    packageId,
                    tokens: calculatedTokens,
                    metadata: {
                        ...(metadata || {}),
                        package_id: packageId,
                        tokens: calculatedTokens,
                        top_up_quote_ref: topUpQuote.referenceId,
                        payment_method: "Credit Card (MasterCard)",
                    },
                });

                await topUpQuoteService.attachProviderPayment(
                    topUpQuote.referenceId,
                    result.invoiceId
                );

                return NextResponse.json(result);
            }
        }

        if (!resolvedAmount || isNaN(resolvedAmount) || resolvedAmount <= 0) {
            return NextResponse.json(
                { error: "Valid amount is required" },
                { status: 400 }
            );
        }

        const result = await corefyService.createPaymentInvoice({
            orderId: orderId ? String(orderId) : undefined,
            amount: resolvedAmount,
            currency: "EUR",
            description: description || `Payment for Order #${orderId || "new"} - Credit Card (MasterCard)`,
            customerEmail: effectiveEmail,
            customerName: effectiveName,
            customerPhone,
            customerAddress,
            packageId,
            tokens: calculatedTokens,
            metadata: {
                ...(metadata || {}),
                payment_method: "Credit Card (MasterCard)",
            },
        });

        return NextResponse.json(result);
    } catch (err: any) {
        console.error("❌ [Checkout API] Error:", err);
        return NextResponse.json(
            { error: err.message || "Checkout creation failed" },
            { status: 400 }
        );
    }
}
