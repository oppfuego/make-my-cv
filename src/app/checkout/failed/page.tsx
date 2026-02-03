"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function FailedPage() {
    const router = useRouter();

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <div style={styles.iconError}>!</div>

                <h1 style={styles.title}>Payment Failed</h1>

                <p style={styles.text}>
                    Unfortunately, your payment could not be completed.
                    <br />
                    No charges were made.
                </p>

                <button
                    style={styles.primaryButton}
                    onClick={() => router.push("/pricing")}
                >
                    Try Again
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
    iconError: {
        width: 72,
        height: 72,
        margin: "0 auto 24px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #ef4444, #dc2626)",
        color: "#fff",
        fontSize: 34,
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
        background: "#ef4444",
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
