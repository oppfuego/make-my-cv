"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency } from "@/context/CurrencyContext";
import styles from "./CurrencySwitch.module.scss";
import { IoMdArrowDropdown } from "react-icons/io";

const currencies = ["GBP", "EUR", "USD"] as const;

const CurrencySwitch: React.FC = () => {
    const { currency, setCurrency } = useCurrency();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleSelect = (val: typeof currencies[number]) => {
        setCurrency(val);
        setOpen(false);
    };

    // Закриття при кліку поза дропдауном
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);

    return (
        <div className={styles.wrapper} ref={ref}>
            <motion.button
                className={styles.trigger}
                onClick={() => setOpen(!open)}
                whileTap={{ scale: 0.97 }}
            >
                <span className={styles.label}>{currency}</span>
                <motion.span
                    animate={open ? { rotate: 180 } : { rotate: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <IoMdArrowDropdown size={20} className={styles.icon} />
                </motion.span>
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className={styles.menu}
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.96 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                        {currencies.map((c) => (
                            <motion.button
                                key={c}
                                className={`${styles.option} ${currency === c ? styles.active : ""}`}
                                onClick={() => handleSelect(c)}
                                whileHover={{ x: 3 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <span className={styles.currencyOption}>{c}</span>

                                {currency === c && (
                                    <motion.div
                                        className={styles.activeDot}
                                        layoutId="active-dot"
                                        transition={{ type: "spring", stiffness: 350, damping: 20 }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CurrencySwitch;
