export type SupportedCurrency = "GBP" | "EUR" | "USD";
export type TopUpPackageId = "starter" | "pro" | "premium" | "custom";
export type PricingMode = "fixed" | "custom";

export interface FixedTopUpPackage {
    packageId: Exclude<TopUpPackageId, "custom">;
    pricingMode: "fixed";
    priceGBP: number;
    tokens: number;
}

export interface CustomTopUpPackage {
    packageId: "custom";
    pricingMode: "custom";
}

export type TopUpPackage = FixedTopUpPackage | CustomTopUpPackage;

export interface TopUpQuote {
    packageId: TopUpPackageId;
    inputAmount: number;
    inputCurrency: SupportedCurrency;
    gbpAmount: number;
    eurAmount: number;
    tokens: number;
}

export const TOKENS_PER_GBP = 100;

export const CURRENCY_SIGNS: Record<SupportedCurrency, string> = {
    GBP: "\u00A3",
    EUR: "\u20AC",
    USD: "$",
};

// 1 GBP = rate units of currency
export const CURRENCY_RATES: Record<SupportedCurrency, number> = {
    GBP: 1,
    EUR: 1.17,
    USD: 1.29,
};

export const TOP_UP_PACKAGES: Record<TopUpPackageId, TopUpPackage> = {
    starter: {
        packageId: "starter",
        pricingMode: "fixed",
        priceGBP: 10,
        tokens: 1000,
    },
    pro: {
        packageId: "pro",
        pricingMode: "fixed",
        priceGBP: 25,
        tokens: 2500,
    },
    premium: {
        packageId: "premium",
        pricingMode: "fixed",
        priceGBP: 50,
        tokens: 5000,
    },
    custom: {
        packageId: "custom",
        pricingMode: "custom",
    },
};

export function roundCurrency(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function getCurrencySign(currency: SupportedCurrency): string {
    return CURRENCY_SIGNS[currency];
}

export function convertGBPToCurrency(amountGBP: number, currency: SupportedCurrency): number {
    return roundCurrency(amountGBP * CURRENCY_RATES[currency]);
}

export function convertCurrencyToGBP(amount: number, currency: SupportedCurrency): number {
    return roundCurrency(amount / CURRENCY_RATES[currency]);
}

export function tokensFromGBP(amountGBP: number): number {
    return Math.floor(amountGBP * TOKENS_PER_GBP);
}

export function getFixedPackage(packageId: Exclude<TopUpPackageId, "custom">): FixedTopUpPackage {
    return TOP_UP_PACKAGES[packageId] as FixedTopUpPackage;
}

export function getTopUpQuote(input: {
    packageId: TopUpPackageId;
    amount?: number;
    currency?: SupportedCurrency;
}): TopUpQuote {
    const { packageId } = input;

    if (packageId === "custom") {
        const inputCurrency = input.currency ?? "GBP";
        const inputAmount = roundCurrency(input.amount ?? 0);

        if (!Number.isFinite(inputAmount) || inputAmount <= 0) {
            throw new Error("Invalid custom amount");
        }

        const gbpAmount = convertCurrencyToGBP(inputAmount, inputCurrency);
        const eurAmount = convertGBPToCurrency(gbpAmount, "EUR");
        const tokens = tokensFromGBP(gbpAmount);

        return {
            packageId,
            inputAmount,
            inputCurrency,
            gbpAmount,
            eurAmount,
            tokens,
        };
    }

    const pkg = getFixedPackage(packageId);
    const gbpAmount = pkg.priceGBP;
    const eurAmount = convertGBPToCurrency(gbpAmount, "EUR");

    return {
        packageId,
        inputAmount: eurAmount,
        inputCurrency: "EUR",
        gbpAmount,
        eurAmount,
        tokens: pkg.tokens,
    };
}
