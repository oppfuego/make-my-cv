"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Input from "@mui/joy/Input";
import styles from "./PricingCard.module.scss";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { useAlert } from "@/context/AlertContext";
import { useUser } from "@/context/UserContext";
import { useCurrency } from "@/context/CurrencyContext";
import {
    convertGBPToCurrency,
    getFixedPackage,
    getTopUpQuote,
    PricingMode,
    TopUpPackageId,
} from "@/resources/pricing";

interface PricingCardProps {
    variant?: "starter" | "pro" | "premium" | "custom";
    packageId?: TopUpPackageId;
    pricingMode?: PricingMode;
    title: string;
    priceGBP?: number;
    tokens?: number;
    description: string;
    features: string[];
    buttonText: string;
    buttonLink?: string;
    badgeTop?: string;
    badgeBottom?: string;
    index?: number;
}

const CHECKOUT_KEY = "sandbox_checkout";

const PricingCard: React.FC<PricingCardProps> = ({
    variant = "starter",
    packageId,
    pricingMode,
    title,
    priceGBP,
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
    const { currency, sign } = useCurrency();
    const [customAmount, setCustomAmount] = useState<number>(0.01);

    const resolvedPackageId: TopUpPackageId =
        packageId ??
        (variant === "pro" || variant === "premium" || variant === "custom" ? variant : "starter");
    const resolvedPricingMode: PricingMode =
        pricingMode ?? (resolvedPackageId === "custom" ? "custom" : "fixed");
    const isCustom = resolvedPricingMode === "custom";
    const fixedPackage = useMemo(
        () => (isCustom ? null : getFixedPackage(resolvedPackageId as Exclude<TopUpPackageId, "custom">)),
        [isCustom, resolvedPackageId]
    );

    const fixedPriceGBP = fixedPackage?.priceGBP ?? priceGBP ?? 0;
    const fixedTokens = fixedPackage?.tokens ?? tokens ?? 0;

    const convertedPrice = useMemo(
        () => convertGBPToCurrency(fixedPriceGBP, currency),
        [fixedPriceGBP, currency]
    );

    const tokensCalculated = useMemo(() => {
        if (!isCustom) return fixedTokens;

        try {
            return getTopUpQuote({
                packageId: "custom",
                amount: customAmount,
                currency,
            }).tokens;
        } catch {
            return 0;
        }
    }, [currency, customAmount, fixedTokens, isCustom]);

    const handleBuy = async () => {
        if (!user) {
            showAlert("Please sign up", "You need to be signed in", "info");
            setTimeout(() => (window.location.href = "/sign-up"), 1200);
            return;
        }

        const payload = isCustom
            ? {
                packageId: resolvedPackageId,
                amount: Number(customAmount),
                currency,
                email: user.email,
            }
            : {
                packageId: resolvedPackageId,
                email: user.email,
            };

        if (isCustom && (!payload.amount || payload.amount < 0.01)) {
            showAlert("Invalid amount", "Minimum is 0.01", "error");
            return;
        }

        try {
            const res = await fetch("/api/myaccept/create-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok || !data.redirectUrl) {
                throw new Error(data.error || "Payment init failed");
            }

            if (process.env.NEXT_PUBLIC_MYACCEPT_ENV === "sandbox" && data.referenceId) {
                localStorage.setItem(
                    CHECKOUT_KEY,
                    JSON.stringify({
                        referenceId: data.referenceId,
                        status: "pending",
                    })
                );
            }

            window.location.href = data.redirectUrl;
        } catch (err: any) {
            showAlert("Payment error", err.message, "error");
        }
    };

    return (
        <motion.div
            className={`${styles.card} ${styles[variant]}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
        >
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
                        {customAmount.toFixed(2)} {currency} {"\u2248"} {tokensCalculated} tokens
                    </p>
                </>
            ) : (
                <p className={styles.price}>
                    {sign}
                    {convertedPrice.toFixed(2)} <span className={styles.tokens}>/ {fixedTokens} tokens</span>
                </p>
            )}

            <p className={styles.description}>{description}</p>

            <ul className={styles.features}>
                {features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                ))}
            </ul>

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
