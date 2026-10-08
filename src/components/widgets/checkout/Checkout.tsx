"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./Checkout.module.scss";
import { useCurrency } from "@/context/CurrencyContext";
import { useCheckoutStore } from "@/utils/store";
import { convertGBPToCurrency } from "@/resources/pricing";
import { useUser } from "@/context/UserContext";

const Checkout = () => {
    const user = useUser();
    const { plan, setPlan } = useCheckoutStore();
    const [activePlan, setActivePlan] = useState(plan);
    const { currency, sign } = useCurrency();
    const [agreed, setAgreed] = useState(false);

    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            if (user.name) setCustomerName(user.name);
            if (user.email) setCustomerEmail(user.email);
            if (user.phoneNumber) setCustomerPhone(user.phoneNumber);
            if (user.street) setBillingAddress(user.street);
            if (user.city) setCity(user.city);
            if (user.postCode) setPostalCode(user.postCode);
        }
    }, [user]);

    useEffect(() => {
        if (!plan) {
            const stored = localStorage.getItem("selectedPlan");
            if (stored) {
                const parsed = JSON.parse(stored);
                setPlan(parsed);
                setActivePlan(parsed);
            }
        } else {
            setActivePlan(plan);
        }
    }, [plan, setPlan]);

    // Currency is always EUR
    const activeCurrency = "EUR";
    const currencySign = "€";

    const convertedPrice = useMemo(
        () => (activePlan ? convertGBPToCurrency(activePlan.price, "EUR") : 0),
        [activePlan]
    );
    const vat = useMemo(() => convertedPrice * 0.2, [convertedPrice]);
    const total = useMemo(() => convertedPrice + vat, [convertedPrice, vat]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const email = customerEmail.trim() || user?.email;
        if (!email) {
            setError("Email address is required.");
            return;
        }

        if (!agreed) {
            setError("You must agree to the terms and conditions.");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                orderId: `ord_${Date.now()}`,
                amount: total,
                currency: "EUR",
                packageId: activePlan?.variant || undefined,
                customerEmail: email,
                customerName: customerName.trim() || user?.name || email,
                customerPhone: customerPhone.trim() || undefined,
                description: `Payment for ${activePlan?.title || "Plan"} - Credit Card (MasterCard)`,
                customerAddress: billingAddress
                    ? {
                        street: billingAddress,
                        city,
                        postCode: postalCode,
                    }
                    : undefined,
                metadata: {
                    plan_title: activePlan?.title,
                    tokens: activePlan?.tokens,
                    payment_method: "Credit Card (MasterCard)",
                },
            };

            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            const redirectUrl = data.redirectUrl || data.redirect_url;

            if (!res.ok || !redirectUrl) {
                throw new Error(data.error || "Payment checkout initiation failed.");
            }

            // Redirect user to secure payment page
            window.location.href = redirectUrl;
        } catch (err: any) {
            setError(err.message || "Failed to initiate payment. Please try again.");
            setLoading(false);
        }
    };

    if (!activePlan) {
        return (
            <div className={styles.checkoutEmpty}>
                <p>
                    No plan selected. Please go back to <a href="/pricing">Pricing</a>.
                </p>
            </div>
        );
    }

    return (
        <div className={styles.checkout}>
            <div className={styles.header}>
                <h1>Checkout</h1>
                <p>Secure Payment via Credit Card (MasterCard)</p>
            </div>

            <div className={styles.main}>
                <div className={styles.summary}>
                    <h2>Order Summary</h2>

                    <div className={styles.itemRow}>
                        <div className={styles.itemInfo}>
                            <h3>{activePlan.title}</h3>
                            <p>
                                Top-up {currencySign}
                                {convertedPrice.toFixed(2)} {activeCurrency}
                            </p>
                        </div>
                        <span>
                            {currencySign}
                            {convertedPrice.toFixed(2)} {activeCurrency}
                        </span>
                    </div>

                    <div className={styles.line}></div>

                    <div className={styles.itemRow}>
                        <p>Subtotal</p>
                        <span>
                            {currencySign}
                            {convertedPrice.toFixed(2)} {activeCurrency}
                        </span>
                    </div>

                    <div className={styles.itemRow}>
                        <p>VAT (20%)</p>
                        <span>
                            {currencySign}
                            {vat.toFixed(2)} {activeCurrency}
                        </span>
                    </div>

                    <div className={styles.totalRow}>
                        <h3>Total</h3>
                        <h3>
                            {currencySign}
                            {total.toFixed(2)} {activeCurrency}
                        </h3>
                    </div>

                    <p className={styles.note}>
                        You are purchasing <strong>{activePlan.title}</strong> plan ({activePlan.tokens} points).
                        <br />
                        Payment will be securely processed with Credit Card (MasterCard).
                    </p>
                </div>

                <div className={styles.payment}>
                    <h2>Payment Details — Credit Card (MasterCard)</h2>

                    {error && (
                        <div style={{ color: "#ef4444", marginBottom: "16px", fontSize: "14px", fontWeight: 500 }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            required
                        />

                        <input
                            type="tel"
                            placeholder="Phone Number (e.g. +44...)"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Billing address"
                            value={billingAddress}
                            onChange={(e) => setBillingAddress(e.target.value)}
                        />

                        <div className={styles.row}>
                            <input
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Postal code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </div>

                        <div className={styles.agreement}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                />{" "}
                                I agree to the{" "}
                                <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                                    terms & conditions
                                </a>
                                .
                            </label>
                        </div>

                        <div style={{ fontSize: "13px", color: "#64748b", margin: "14px 0", lineHeight: 1.5, background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                            🔒 <strong>Credit Card (MasterCard):</strong> You will be redirected to the secure 3D Secure checkout page to complete your payment with MasterCard.
                        </div>

                        <button
                            type="submit"
                            disabled={!agreed || loading}
                            className={`${styles.payButton} ${!agreed || loading ? styles.disabled : ""}`}
                        >
                            {loading ? (
                                "Redirecting to payment..."
                            ) : (
                                <>Pay with Credit Card (MasterCard) — {currencySign}{total.toFixed(2)}</>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
