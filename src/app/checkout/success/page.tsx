"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [orderInfo, setOrderInfo] = useState<{
        orderId?: string;
        referenceId?: string;
        status?: string;
        amount?: number;
        currency?: string;
    } | null>(null);

    useEffect(() => {
        const orderId = searchParams.get("order_id") || searchParams.get("orderId");
        const ref = searchParams.get("ref") || searchParams.get("reference_id");
        const invoiceId = searchParams.get("invoice_id") || searchParams.get("invoiceId");

        if (ref || invoiceId || orderId) {
            const query = new URLSearchParams();
            if (ref) query.set("referenceId", ref);
            if (invoiceId) query.set("invoiceId", invoiceId);
            if (orderId && !ref) query.set("orderId", orderId);

            fetch(`/api/corefy/status?${query.toString()}`)
                .then((r) => r.json())
                .then((res) => {
                    if (res?.success) {
                        if (
                            res.status === "process_failed" ||
                            res.status === "authorize_failed" ||
                            res.status === "failed"
                        ) {
                            router.replace(`/checkout/failed?order_id=${res.orderId || orderId || ""}`);
                            return;
                        }

                        if (res.status === "process_pending" || res.status === "pending") {
                            // Can show pending or success
                            setOrderInfo(res);
                        } else {
                            setOrderInfo(res);
                        }
                    }
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [router, searchParams]);

    if (loading) {
        return (
            <div style={styles.wrapper}>
                <div style={styles.card}>
                    <p style={{ color: "#64748b" }}>Verifying your payment status...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <div style={styles.iconSuccess}>✓</div>

                <h1 style={styles.title}>Payment Successful</h1>

                <p style={styles.text}>
                    Thank you! Your payment was processed successfully.
                    {orderInfo?.orderId && (
                        <>
                            <br />
                            <strong>Order Reference:</strong> {orderInfo.orderId}
                        </>
                    )}
                    <br />
                    Points have been credited to your account.
                </p>

                <button
                    style={styles.primaryButton}
                    onClick={() => router.push("/dashboard")}
                >
                    Go to Dashboard
                </button>

                <button
                    style={styles.secondaryButton}
                    onClick={() => router.push("/")}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div style={styles.wrapper}>
                <div style={styles.card}>
                    <p style={{ color: "#64748b" }}>Loading...</p>
                </div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}

const styles: Record<string, React.CSSProperties> = {
    wrapper: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    card: {
        background: "#ffffff",
        borderRadius: 20,
        padding: "48px 36px",
        maxWidth: 460,
        width: "100%",
        textAlign: "center",
        boxShadow:
            "0 20px 40px rgba(0,0,0,0.06), 0 8px 16px rgba(0,0,0,0.04)",
    },
    iconSuccess: {
        width: 72,
        height: 72,
        margin: "0 auto 24px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #22c55e, #16a34a)",
        color: "#fff",
        fontSize: 32,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: 700,
        marginBottom: 12,
        color: "#0f172a",
    },
    text: {
        fontSize: 15,
        lineHeight: 1.6,
        color: "#475569",
        marginBottom: 32,
    },
    primaryButton: {
        width: "100%",
        padding: "14px 16px",
        borderRadius: 12,
        border: "none",
        background: "#22c55e",
        color: "#fff",
        fontSize: 15,
        fontWeight: 600,
        cursor: "pointer",
        marginBottom: 12,
    },
    secondaryButton: {
        width: "100%",
        padding: "12px 16px",
        borderRadius: 12,
        border: "1px solid #e5e7eb",
        background: "#fff",
        color: "#334155",
        fontSize: 14,
        cursor: "pointer",
    },
};
