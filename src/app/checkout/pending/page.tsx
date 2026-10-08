"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function PendingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order_id") || searchParams.get("ref");

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <div style={styles.iconPending}>⏳</div>

                <h1 style={styles.title}>Payment Pending</h1>

                <p style={styles.text}>
                    Your payment is currently being processed by your bank or payment provider.
                    {orderId && (
                        <>
                            <br />
                            <strong>Order Reference:</strong> {orderId}
                        </>
                    )}
                    <br />
                    Once confirmed, your account balance will be automatically updated.
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

export default function PendingPage() {
    return (
        <Suspense fallback={
            <div style={styles.wrapper}>
                <div style={styles.card}>
                    <p style={{ color: "#64748b" }}>Loading...</p>
                </div>
            </div>
        }>
            <PendingContent />
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
    iconPending: {
        width: 72,
        height: 72,
        margin: "0 auto 24px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #f59e0b, #d97706)",
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
        background: "#f59e0b",
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
