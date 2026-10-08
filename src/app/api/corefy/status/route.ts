import { NextRequest, NextResponse } from "next/server";
import { corefyService } from "@/backend/services/corefy.service";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const invoiceId = searchParams.get("invoiceId") || searchParams.get("invoice_id");
        const referenceId =
            searchParams.get("referenceId") ||
            searchParams.get("reference_id") ||
            searchParams.get("orderId") ||
            searchParams.get("order_id") ||
            searchParams.get("ref");

        if (!invoiceId && !referenceId) {
            return NextResponse.json(
                { error: "invoiceId or referenceId is required" },
                { status: 400 }
            );
        }

        const order = await corefyService.getOrderStatus({
            invoiceId: invoiceId || undefined,
            referenceId: referenceId || undefined,
        });

        if (!order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            orderId: order.orderId,
            referenceId: order.referenceId,
            invoiceId: order.invoiceId,
            status: order.status,
            resolution: order.resolution,
            amount: order.amount,
            currency: order.currency,
            processedAt: order.processedAt,
        });
    } catch (err: any) {
        console.error("❌ [Corefy Status API] Error:", err);
        return NextResponse.json(
            { error: err.message || "Failed to check order status" },
            { status: 500 }
        );
    }
}
