"use client";

import React, { useEffect, useState } from "react";
import styles from "./AllTransactions.module.scss";
import { FaArrowDown, FaArrowUp, FaCoins, FaRegClock } from "react-icons/fa";

interface Transaction {
    _id: string;
    amount: number;
    type: "add" | "spend";
    balanceAfter: number;
    createdAt: string;
}

export default function TransactionHistory() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/transactions/get-all", { credentials: "include" });
            const data = await res.json();
            if (res.ok) setTransactions(data.transactions);
        })();
    }, []);

    const formatDate = (date: string) =>
        new Date(date).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });

    if (transactions.length === 0)
        return (
            <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>💸</span>
                <p>No transactions yet.</p>
            </div>
        );

    return (
        <section className={styles.transactionsSection}>
            <div className={styles.header}>
                <h3>Transaction History</h3>
                <p>Track all your top-ups and point usage</p>
            </div>

            <div className={styles.transactionsList}>
                {transactions.map((t) => (
                    <div
                        key={t._id}
                        className={`${styles.transactionCard} ${
                            t.type === "add" ? styles.add : styles.spend
                        }`}
                    >
                        <div className={styles.iconWrapper}>
                            {t.type === "add" ? (
                                <FaArrowDown className={styles.iconAdd} />
                            ) : (
                                <FaArrowUp className={styles.iconSpend} />
                            )}
                        </div>

                        <div className={styles.info}>
                            <div className={styles.rowTop}>
                <span className={styles.amount}>
                  {t.type === "add" ? "+" : "-"}
                    {t.amount} points
                </span>
                                <span
                                    className={`${styles.badge} ${
                                        t.type === "add" ? styles.badgeAdd : styles.badgeSpend
                                    }`}
                                >
                  {t.type === "add" ? "Top-up" : "Spend"}
                </span>
                            </div>

                            <div className={styles.rowBottom}>
                <span className={styles.date}>
                  <FaRegClock /> {formatDate(t.createdAt)}
                </span>
                                <span className={styles.balance}>
                  <FaCoins /> {t.balanceAfter} balance
                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
