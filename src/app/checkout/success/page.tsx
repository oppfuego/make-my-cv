"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CHECKOUT_KEY = "sandbox_checkout";

export default function SuccessPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ❗ тільки sandbox
        if (process.env.NEXT_PUBLIC_MYACCEPT_ENV !== "sandbox") {
            setLoading(false);
            return;
        }

        const raw = localStorage.getItem(CHECKOUT_KEY);
        if (!raw) {
            // нема даних → просто показуємо success
            setLoading(false);
            return;
        }

        const checkout = JSON.parse(raw);

        // ❌ якщо вже помічено як failed
        if (checkout.status === "failed") {
            localStorage.removeItem(CHECKOUT_KEY);
            router.replace("/checkout/failed");
            return;
        }

        // 🧪 емулюємо webhook
        fetch("/api/myaccept/sandbox-confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: checkout.email,
                amountEUR: checkout.amountEUR,
            }),
        })
            .then((r) => r.json())
            .then((res) => {
                localStorage.removeItem(CHECKOUT_KEY);

                if (!res?.ok) {
                    router.replace("/checkout/failed");
                    return;
                }

                setLoading(false);
            })
            .catch(() => {
                localStorage.removeItem(CHECKOUT_KEY);
                router.replace("/checkout/failed");
            });
    }, [router]);

    if (loading) {
        return (
            <div style={styles.wrapper}>
                <div style={styles.card}>
                    <p style={{ color: "#64748b" }}>Finalizing payment…</p>
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
                    Your payment was completed successfully.
                    <br />
                    Tokens have been added to your account.
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
        fontSize: 36,
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
