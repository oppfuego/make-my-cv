"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQ.module.scss";

interface FAQItem {
    question: string;
    answer: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className={styles.wrapper}>
            <h2 className={styles.title}>Frequently Asked Questions</h2>

            <div className={styles.list}>
                {items.map((item, i) => {
                    const isOpen = open === i;

                    return (
                        <div key={i} className={styles.item}>
                            {/* QUESTION */}
                            <button
                                className={`${styles.question} ${isOpen ? styles.active : ""}`}
                                onClick={() => setOpen(isOpen ? null : i)}
                            >
                                <span>{item.question}</span>
                                <motion.span
                                    animate={{ rotate: isOpen ? 45 : 0 }}
                                    transition={{ duration: 0.25 }}
                                    className={styles.plus}
                                >
                                    +
                                </motion.span>
                            </button>

                            {/* ANSWER */}
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className={styles.answerWrapper}
                                    >
                                        <div className={styles.answer}>
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
