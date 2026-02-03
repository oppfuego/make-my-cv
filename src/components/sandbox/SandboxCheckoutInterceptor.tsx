"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CHECKOUT_KEY = "sandbox_checkout";

export default function SandboxCheckoutInterceptor() {
    const router = useRouter();

    useEffect(() => {
        console.log("🧪 Sandbox interceptor mounted");

        if (process.env.NEXT_PUBLIC_MYACCEPT_ENV !== "sandbox") return;

        const raw = localStorage.getItem(CHECKOUT_KEY);
        console.log("📦 checkout raw:", raw);

        // ❗ ЯКЩО НЕМА checkout — НІЧОГО НЕ РОБИМО
        if (!raw) return;

        const checkout = JSON.parse(raw);

        // ❗ захист від повторного виконання
        if (checkout.status !== "pending") return;

        fetch("/api/user/buy-tokens", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: checkout.email,
                amountEUR: checkout.amountEUR,
            }),
        })
            .then((r) => r.json())
            .then((res) => {
                console.log("✅ buy-tokens response:", res);
            })
            .catch((e) => {
                console.error("❌ buy-tokens error:", e);
            })
            .finally(() => {
                localStorage.removeItem(CHECKOUT_KEY);
                router.replace("/checkout/success");
            });
    }, [router]);

    return null;
}
