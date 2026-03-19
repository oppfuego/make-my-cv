import { sendEmail } from "@/backend/utils/sendEmail";

type ConfirmationLineItem = {
    label: string;
    value: string;
};

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function buildHtmlList(items: ConfirmationLineItem[]) {
    return items
        .map(
            (item) =>
                `<tr>
                    <td style="padding:10px 0; color:#64748b; vertical-align:top;">${escapeHtml(item.label)}</td>
                    <td style="padding:10px 0; color:#0f172a; font-weight:600; text-align:right;">${escapeHtml(item.value)}</td>
                </tr>`
        )
        .join("");
}

export const mailService = {
    async sendPaymentConfirmation(input: {
        to: string;
        firstName?: string | null;
        amount: number;
        currency?: string;
        tokens: number;
        balanceAfter: number;
        transactionDate?: Date;
        referenceKey?: string;
    }) {
        const transactionDate = input.transactionDate ?? new Date();
        const items: ConfirmationLineItem[] = [
            { label: "Type", value: "Token purchase" },
            { label: "Amount", value: `${input.amount} ${input.currency || "TOKENS"}` },
            { label: "Tokens added", value: `${input.tokens}` },
            { label: "New balance", value: `${input.balanceAfter} tokens` },
            { label: "Transaction date", value: transactionDate.toISOString().slice(0, 10) },
        ];

        if (input.referenceKey) {
            items.push({ label: "Reference", value: input.referenceKey });
        }

        const name = input.firstName?.trim() || "there";
        const text = [
            `Hi ${name},`,
            "",
            "Your payment was completed successfully.",
            `Amount: ${input.amount} ${input.currency || "TOKENS"}`,
            `Tokens added: ${input.tokens}`,
            `New balance: ${input.balanceAfter} tokens`,
            `Transaction date: ${transactionDate.toISOString()}`,
            input.referenceKey ? `Reference: ${input.referenceKey}` : "",
        ]
            .filter(Boolean)
            .join("\n");

        const html = `
            <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;color:#0f172a;">
                <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:32px;">
                    <h1 style="margin:0 0 12px;font-size:24px;">Payment confirmation</h1>
                    <p style="margin:0 0 24px;color:#475569;">Hi ${escapeHtml(name)}, your payment was completed successfully.</p>
                    <table style="width:100%;border-collapse:collapse;">${buildHtmlList(items)}</table>
                </div>
            </div>
        `;

        return sendEmail(input.to, "Payment confirmation", text, html);
    },

    async sendOrderConfirmation(input: {
        to: string;
        firstName?: string | null;
        orderId: string;
        service: string;
        summary: string;
        tokensUsed: number;
        transactionDate?: Date;
        items: string[];
    }) {
        const transactionDate = input.transactionDate ?? new Date();
        const name = input.firstName?.trim() || "there";
        const lineItems: ConfirmationLineItem[] = [
            { label: "Order", value: input.orderId },
            { label: "Service", value: input.service },
            { label: "Tokens used", value: `${input.tokensUsed}` },
            { label: "Transaction date", value: transactionDate.toISOString().slice(0, 10) },
        ];

        const text = [
            `Hi ${name},`,
            "",
            "Your order has been confirmed.",
            `Service: ${input.service}`,
            `Tokens used: ${input.tokensUsed}`,
            `Transaction date: ${transactionDate.toISOString()}`,
            `Summary: ${input.summary}`,
            `Items: ${input.items.join(", ")}`,
            `Order ID: ${input.orderId}`,
        ].join("\n");

        const htmlItems = input.items
            .map((item) => `<li style="margin:0 0 8px;">${escapeHtml(item)}</li>`)
            .join("");
        const html = `
            <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;color:#0f172a;">
                <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:32px;">
                    <h1 style="margin:0 0 12px;font-size:24px;">Order confirmation</h1>
                    <p style="margin:0 0 16px;color:#475569;">Hi ${escapeHtml(name)}, your order has been confirmed.</p>
                    <p style="margin:0 0 20px;color:#334155;">${escapeHtml(input.summary)}</p>
                    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">${buildHtmlList(lineItems)}</table>
                    <div style="border-top:1px solid #e2e8f0;padding-top:20px;">
                        <p style="margin:0 0 10px;font-weight:700;">Included details</p>
                        <ul style="padding-left:20px;margin:0;">${htmlItems}</ul>
                    </div>
                </div>
            </div>
        `;

        return sendEmail(input.to, "Order confirmation", text, html);
    },
};
