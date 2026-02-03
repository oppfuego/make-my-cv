"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./PricingCard.module.scss";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { useAlert } from "@/context/AlertContext";
import { useUser } from "@/context/UserContext";
import Input from "@mui/joy/Input";
import { useCurrency } from "@/context/CurrencyContext";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/utils/store";

const TOKENS_PER_GBP = 100;

interface PricingCardProps {
    variant?: "starter" | "pro" | "premium" | "custom";
    title: string;
    price: string;
    tokens: number;
    description: string;
    features: string[];
    buttonText: string;
    badgeTop?: string;
    badgeBottom?: string;
    index?: number;
}

const PricingCard: React.FC<PricingCardProps> = ({
                                                     variant = "starter",
                                                     title,
                                                     price,
                                                     tokens,
                                                     description,
                                                     features,
                                                     buttonText,
                                                     badgeTop,
                                                     badgeBottom,
                                                     index = 0,
                                                 }) => {
    const { showAlert } = useAlert();
    const user = useUser();
    const { currency, sign, convertFromGBP, convertToGBP } = useCurrency();
    const router = useRouter();
    const { setPlan } = useCheckoutStore();

    const [customAmount, setCustomAmount] = useState<number>(0.01);
    const isCustom = price === "dynamic";

    // 💷 Base price in GBP
    const basePriceGBP = useMemo(() => {
        if (isCustom) return 0;
        const num = parseFloat(price.replace(/[^0-9.]/g, ""));
        return isNaN(num) ? 0 : num;
    }, [price, isCustom]);

    // 💰 Currency conversion
    const convertedPrice = useMemo(() => {
        if (isCustom) return 0;
        return convertFromGBP(basePriceGBP);
    }, [basePriceGBP, convertFromGBP, isCustom]);

    const CHECKOUT_KEY = "sandbox_checkout";

    const handleBuy = async () => {
        if (!user) {
            showAlert("Please sign up", "You need to be signed in", "info");
            setTimeout(() => (window.location.href = "/sign-up"), 1200);
            return;
        }

        let amountEUR: number;

        if (isCustom) {
            amountEUR = Number(customAmount);
        } else {
            amountEUR = convertFromGBP(basePriceGBP);
        }

        if (!amountEUR || amountEUR < 0.01) {
            showAlert("Invalid amount", "Minimum is 0.01 EUR", "error");
            return;
        }

        // 🧪 SANDBOX — save intent
        if (process.env.NEXT_PUBLIC_MYACCEPT_ENV === "sandbox") {
            localStorage.setItem(
                CHECKOUT_KEY,
                JSON.stringify({
                    email: user.email,
                    amountEUR,
                    createdAt: Date.now(),
                    status: "pending",
                })
            );
        }

        try {
            const res = await fetch("/api/myaccept/create-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amountEUR, email: user.email }),
            });

            const data = await res.json();

            if (!res.ok || !data.redirectUrl) {
                if (process.env.NEXT_PUBLIC_MYACCEPT_ENV === "sandbox") {
                    localStorage.setItem(
                        "sandbox_checkout",
                        JSON.stringify({
                            email: user.email,
                            amountEUR,
                            status: "pending",
                            createdAt: Date.now(),
                        })
                    );
                }
                throw new Error(data.error || "Payment init failed");
            }

            window.location.href = data.redirectUrl;
        } catch (err: any) {
            showAlert("Payment error", err.message, "error");
        }
    };

    const tokensCalculated = useMemo(() => {
        const gbpEquivalent = convertToGBP(customAmount);
        return Math.floor(gbpEquivalent * TOKENS_PER_GBP);
    }, [customAmount, convertToGBP]);

    return (
        <motion.div
            className={`${styles.card} ${styles[variant]}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}>
            {badgeTop && <span className={styles.badgeTop}>{badgeTop}</span>}
            <h3 className={styles.title}>{title}</h3>
            {isCustom ? (
                <>
                    <div className={styles.inputWrapper}>
                        <Input
                            type="number"
                            value={customAmount}
                            onChange={(e) =>
                                setCustomAmount(
                                    e.target.value === "" ? 0.01 : Math.max(0.01, Number(e.target.value))
                                )
                            }
                            placeholder="Enter amount"
                            size="md"
                            startDecorator={sign}
                            slotProps={{
                                input: {
                                    min: 0.01,
                                    step: 0.01,
                                },
                            }}
                        />
                    </div>
                    <p className={styles.dynamicPrice}>
                        {sign}
                        {customAmount.toFixed(2)} {currency} ≈ {tokensCalculated} tokens
                    </p>
                </>
            ) : (
                <p className={styles.price}>
                    {sign}
                    {convertedPrice.toFixed(2)}{" "}
                    <span className={styles.tokens}>/ {tokens} tokens</span>
                </p>
            )}

            <p className={styles.description}>{description}</p>

            <ul className={styles.features}>
                {features.map((f, i) => (
                    <li key={i}>{f}</li>
                ))}
            </ul>

            {/* кнопка завжди внизу */}
            <div className={styles.buttonWrapper}>
                <ButtonUI fullWidth onClick={handleBuy}>
                    {user ? buttonText : "Sign Up to Buy"}
                </ButtonUI>
            </div>

            {badgeBottom && <span className={styles.badgeBottom}>{badgeBottom}</span>}
        </motion.div>
    );
};

export default PricingCard;
