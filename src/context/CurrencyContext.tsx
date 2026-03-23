"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { SupportedCurrency, getCurrencySign } from "@/resources/pricing";

export type Currency = SupportedCurrency;

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (val: Currency) => void;
    sign: string;
}

const CurrencyContext = createContext<CurrencyContextType>({
    currency: "GBP",
    setCurrency: () => {},
    sign: "\u00A3",
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
    const [currency, setCurrency] = useState<Currency>("GBP");
    const sign = getCurrencySign(currency);

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, sign }}>
            {children}
        </CurrencyContext.Provider>
    );
};
