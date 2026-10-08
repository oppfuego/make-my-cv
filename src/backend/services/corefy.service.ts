import crypto from "crypto";
import { connectDB } from "@/backend/config/db";
import { ENV } from "@/backend/config/env";
import { PaymentOrder } from "@/backend/models/paymentOrder.model";
import { userController } from "@/backend/controllers/user.controller";
import { topUpQuoteService } from "@/backend/services/topUpQuote.service";
import { convertCurrencyToGBP, SupportedCurrency, tokensFromGBP } from "@/resources/pricing";

export interface CreateCorefyInvoiceInput {
    referenceId?: string;
    orderId?: string;
    amount: number;
    currency: string;
    description?: string;
    customerEmail: string;
    customerName?: string;
    customerPhone?: string;
    customerAddress?: {
        country?: string;
        city?: string;
        region?: string;
        street?: string;
        postCode?: string;
        fullAddress?: string;
    };
    returnUrl?: string;
    returnUrls?: {
        success?: string;
        pending?: string;
        fail?: string;
    };
    callbackUrl?: string;
    metadata?: Record<string, any>;
    userId?: string;
    packageId?: string;
    tokens?: number;
}

export interface CorefyInvoiceResult {
    success: boolean;
    redirectUrl: string;
    redirect_url: string;
    invoiceId: string;
    referenceId: string;
}

function getAuthHeader(): string {
    const token = Buffer.from(
        `${ENV.COREFY_ACCOUNT_ID}:${ENV.COREFY_API_KEY}`
    ).toString("base64");
    return `Basic ${token}`;
}

export const corefyService = {
    /**
     * Helper to get base API endpoint
     */
    getBaseUrl(): string {
        return (ENV.COREFY_BASE_URL || "https://api.sterling-pay.com").replace(/\/$/, "");
    },

    /**
     * Step 1: Create Payment Invoice on Corefy HPP
     */
    async createPaymentInvoice(input: CreateCorefyInvoiceInput): Promise<CorefyInvoiceResult> {
        await connectDB();

        const currency = "EUR";
        const service = "payment_card_eur_hpp";
        const orderId = input.orderId || `ord_${Date.now()}`;
        const referenceId =
            input.referenceId || `order_${orderId}_${Date.now()}`;
        const amount = Number(Number(input.amount).toFixed(2));

        const frontendUrl = (
            process.env.NEXT_PUBLIC_FRONTEND_URL ||
            process.env.APP_URL ||
            "http://localhost:1020"
        ).replace(/\/$/, "");

        const callbackUrl =
            input.callbackUrl || `${frontendUrl}/api/webhooks/corefy`;

        const defaultReturnUrl =
            input.returnUrl ||
            `${frontendUrl}/checkout/success?order_id=${orderId}&ref=${referenceId}`;

        const returnUrls = {
            success:
                input.returnUrls?.success ||
                `${frontendUrl}/checkout/success?order_id=${orderId}&ref=${referenceId}`,
            pending:
                input.returnUrls?.pending ||
                `${frontendUrl}/checkout/pending?order_id=${orderId}&ref=${referenceId}`,
            fail:
                input.returnUrls?.fail ||
                `${frontendUrl}/checkout/failed?order_id=${orderId}&ref=${referenceId}`,
        };

        const metadata: Record<string, any> = {
            ...(input.metadata || {}),
            order_id: String(orderId),
            user_id: input.userId ? String(input.userId) : undefined,
            customer_email: input.customerEmail,
            package_id: input.packageId,
            tokens: input.tokens,
        };

        // Create initial pending order record in MongoDB
        const paymentOrder = await PaymentOrder.create({
            referenceId,
            orderId: String(orderId),
            userId: input.userId || null,
            email: input.customerEmail.toLowerCase(),
            customerName: input.customerName || null,
            amount,
            currency,
            service,
            flow: "charge",
            status: "pending",
            testMode: ENV.COREFY_TEST_MODE,
            metadata,
        });

        const customerPayload: Record<string, any> = {
            reference_id: `cust_${input.customerEmail.toLowerCase()}`,
            email: input.customerEmail.toLowerCase(),
            name: input.customerName || input.customerEmail,
        };

        if (input.customerPhone) {
            customerPayload.phone = input.customerPhone;
        }

        if (input.customerAddress) {
            customerPayload.address = {
                country: input.customerAddress.country || "GB",
                city: input.customerAddress.city || "London",
                region: input.customerAddress.region || "London",
                street: input.customerAddress.street || "Wenlock Road",
                post_code: input.customerAddress.postCode || "N1 7GU",
                full_address:
                    input.customerAddress.fullAddress ||
                    `${input.customerAddress.street || ""}, ${input.customerAddress.city || ""}`,
            };
        }

        const payload = {
            data: {
                type: "payment-invoices",
                attributes: {
                    reference_id: referenceId,
                    amount,
                    currency,
                    service,
                    flow: "charge",
                    test_mode: ENV.COREFY_TEST_MODE,
                    description:
                        input.description || `Payment for Order #${orderId}`,
                    return_url: defaultReturnUrl,
                    return_urls: returnUrls,
                    callback_url: callbackUrl,
                    customer: customerPayload,
                    metadata,
                },
            },
        };

        const baseUrl = this.getBaseUrl();
        const response = await fetch(`${baseUrl}/payment-invoices`, {
            method: "POST",
            headers: {
                "Content-Type": "application/vnd.api+json",
                Accept: "application/vnd.api+json",
                Authorization: getAuthHeader(),
            },
            body: JSON.stringify(payload),
        });

        const responseData = await response.json().catch(() => null);

        if (!response.ok) {
            const errorMsg =
                responseData?.errors?.[0]?.detail ||
                responseData?.errors?.[0]?.title ||
                response.statusText ||
                "Payment initialization failed";

            await PaymentOrder.findByIdAndUpdate(paymentOrder._id, {
                status: "process_failed",
                resolution: errorMsg,
            });

            throw new Error(`Corefy HPP Error (${response.status}): ${errorMsg}`);
        }

        const redirectUrl =
            responseData?.data?.attributes?.flow_data?.action ||
            responseData?.data?.attributes?.hpp_url;
        const invoiceId = responseData?.data?.id;

        if (!redirectUrl || !invoiceId) {
            await PaymentOrder.findByIdAndUpdate(paymentOrder._id, {
                status: "process_failed",
                resolution: "Missing HPP redirect URL in Corefy response",
            });
            throw new Error("Missing HPP redirect URL in Corefy response");
        }

        await PaymentOrder.findByIdAndUpdate(paymentOrder._id, {
            invoiceId,
            hppUrl: redirectUrl,
            status: "process_pending",
        });

        return {
            success: true,
            redirectUrl,
            redirect_url: redirectUrl,
            invoiceId,
            referenceId,
        };
    },

    /**
     * Step 2: Verify HMAC signature of incoming Corefy webhook
     */
    verifyWebhookSignature(
        rawBody: string,
        incomingSignature?: string | null
    ): boolean {
        const secret = process.env.COREFY_WEBHOOK_SECRET || ENV.COREFY_WEBHOOK_SECRET;

        // If secret is set, verify incoming signature
        if (secret && incomingSignature) {
            const calculatedSig = crypto
                .createHmac("sha256", secret)
                .update(rawBody)
                .digest("hex");

            const bufCalculated = Buffer.from(calculatedSig);
            const bufIncoming = Buffer.from(incomingSignature);

            if (bufCalculated.length !== bufIncoming.length) {
                // Try sha1 fallback
                const calculatedSha1 = crypto
                    .createHmac("sha1", secret)
                    .update(rawBody)
                    .digest("hex");
                const bufSha1 = Buffer.from(calculatedSha1);
                if (bufSha1.length === bufIncoming.length) {
                    return crypto.timingSafeEqual(bufSha1, bufIncoming);
                }
                return false;
            }

            return crypto.timingSafeEqual(bufCalculated, bufIncoming);
        }

        // If no secret configured and in test mode, allow webhook
        if (!secret && ENV.COREFY_TEST_MODE) {
            console.warn("⚠️ COREFY_WEBHOOK_SECRET is not configured; skipping HMAC verification in test mode.");
            return true;
        }

        return false;
    },

    /**
     * Handle parsed webhook callback
     */
    async handleWebhookEvent(payload: any) {
        await connectDB();

        const data = payload?.data;
        const invoiceId = data?.id;
        const attributes = data?.attributes || {};
        const referenceId = attributes.reference_id;
        const status = attributes.status; // 'processed', 'process_failed', 'expired', 'refunded', etc.
        const resolution = attributes.resolution || "ok";
        const metadata = attributes.metadata || {};
        const paymentInfo = attributes.payment;

        console.log(
            `🔔 [Corefy Webhook] Invoice ${invoiceId} (Ref: ${referenceId}): Status = ${status} (${resolution})`
        );

        if (!referenceId && !invoiceId) {
            throw new Error("Missing invoice reference in webhook");
        }

        const query: any = {};
        if (invoiceId) query.invoiceId = invoiceId;
        else if (referenceId) query.referenceId = referenceId;

        const order = await PaymentOrder.findOne(query);

        if (order) {
            order.status = status;
            order.resolution = resolution;
            if (invoiceId && !order.invoiceId) order.invoiceId = invoiceId;
            if (paymentInfo) {
                order.payment = {
                    id: paymentInfo.id,
                    status: paymentInfo.status,
                    cardPanMasked: paymentInfo.card_pan_masked,
                    cardHolder: paymentInfo.card_holder,
                    cardBrand: paymentInfo.card_brand,
                };
            }

            if (status === "processed" && !order.processedAt) {
                order.processedAt = new Date();
            }

            await order.save();
        }

        // Check if there is an associated TopUpQuote to fulfill
        const topUpQuote =
            (invoiceId ? await topUpQuoteService.getByProviderPaymentId(invoiceId) : null) ??
            (referenceId ? await topUpQuoteService.getByReferenceId(referenceId) : null);

        if (topUpQuote) {
            await topUpQuoteService.attachProviderPayment(
                topUpQuote.referenceId,
                invoiceId,
                status
            );

            if (status === "processed") {
                try {
                    await topUpQuoteService.fulfillQuote(topUpQuote.referenceId, {
                        providerPaymentId: invoiceId,
                        providerState: "COMPLETED",
                    });
                } catch (e: any) {
                    console.warn(`⚠️ [Corefy Webhook] Could not fulfill topUpQuote:`, e.message);
                }
            } else if (
                status === "process_failed" ||
                status === "authorize_failed" ||
                status === "expired"
            ) {
                await topUpQuoteService.markFailed(
                    topUpQuote.referenceId,
                    invoiceId,
                    status
                );
            }
        } else if (status === "processed") {
            // If there was no TopUpQuote but tokens are specified in metadata or order
            const email = (order?.email || metadata.customer_email || metadata.email)?.toLowerCase();
            let tokens = Number(metadata.tokens || metadata.package_tokens || 0);

            if (!tokens && metadata.package_id) {
                // If packageId was passed, resolve tokens
                const pkgId = metadata.package_id;
                if (pkgId === "starter") tokens = 1000;
                else if (pkgId === "pro") tokens = 2500;
                else if (pkgId === "premium") tokens = 5000;
            }

            if (!tokens && order?.amount) {
                const currency = (order.currency || "USD") as SupportedCurrency;
                const gbp = convertCurrencyToGBP(order.amount, currency);
                tokens = tokensFromGBP(gbp);
            }

            if (email && tokens > 0) {
                const refKey = `corefy:${referenceId || invoiceId}`;
                try {
                    await userController.buyTokensByEmail(email, tokens, {
                        currency: order?.currency || "USD",
                        amountValue: order?.amount || 0,
                        referenceKey: refKey,
                    });
                } catch (e: any) {
                    console.warn(`⚠️ [Corefy Webhook] Could not credit tokens to ${email}:`, e.message);
                }
            }
        }

        return { status: "ok" };
    },

    /**
     * Step 3: Reconcile / Check status fallback via Corefy API
     */
    async getInvoice(invoiceId: string) {
        const baseUrl = this.getBaseUrl();
        const response = await fetch(`${baseUrl}/payment-invoices/${invoiceId}`, {
            method: "GET",
            headers: {
                Accept: "application/vnd.api+json",
                Authorization: getAuthHeader(),
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch Corefy invoice: ${response.statusText}`);
        }

        return response.json();
    },

    /**
     * Query order status by referenceId or invoiceId from DB with API fallback
     */
    async getOrderStatus(options: { referenceId?: string; invoiceId?: string }) {
        await connectDB();
        const { referenceId, invoiceId } = options;

        let order = null;
        if (invoiceId) {
            order = await PaymentOrder.findOne({ invoiceId });
        }
        if (!order && referenceId) {
            order = await PaymentOrder.findOne({ referenceId });
        }

        // If order found and still pending, try checking with Corefy API
        if (order && order.invoiceId && (order.status === "pending" || order.status === "process_pending")) {
            try {
                const invoiceData = await this.getInvoice(order.invoiceId);
                const corefyStatus = invoiceData?.data?.attributes?.status;
                if (corefyStatus && corefyStatus !== order.status) {
                    await this.handleWebhookEvent(invoiceData);
                    order = await PaymentOrder.findById(order._id);
                }
            } catch (e) {
                // Ignore API sync errors on query
            }
        }

        return order;
    },
};
