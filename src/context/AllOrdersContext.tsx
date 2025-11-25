"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CVOrderType } from "@/backend/types/cv.types";

interface AllOrdersContextType {
    cvOrders: CVOrderType[];
    refreshOrders: () => Promise<void>;
    loading: boolean;
}

const AllOrdersContext = createContext<AllOrdersContextType>({
    cvOrders: [],
    refreshOrders: async () => {},
    loading: false,
});

export const useAllOrders = () => useContext(AllOrdersContext);

export const AllOrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cvOrders, setCvOrders] = useState<CVOrderType[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/cv/get-all-orders", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            const data = await res.json();

            // /api/cv/get-all-orders може повертати:
            // 1) масив
            // 2) { orders: [...] }
            const normalized = Array.isArray(data) ? data : data.orders;

            setCvOrders(Array.isArray(normalized) ? normalized : []);
        } catch (err: any) {
            console.error("❌ Error loading CV orders:", err.message);
            setCvOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <AllOrdersContext.Provider
            value={{
                cvOrders,
                refreshOrders: fetchOrders,
                loading,
            }}
        >
            {children}
        </AllOrdersContext.Provider>
    );
};
