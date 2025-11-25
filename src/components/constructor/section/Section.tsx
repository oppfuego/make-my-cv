"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./Section.module.scss";

interface SectionProps {
    title?: string;
    description?: string;
    left?: React.ReactNode | React.ReactNode[];
    right?: React.ReactNode | React.ReactNode[];
    reverse?: boolean;
    gap?: string;
    align?: "center" | "start" | "end";
    justify?: "center" | "space-between" | "start" | "end";
}

const Section: React.FC<SectionProps> = ({
                                             title,
                                             description,
                                             left,
                                             right,
                                             reverse = false,
                                             gap = "3rem",
                                             align = "center",
                                             justify = "center",
                                         }) => {

    const isSingle = !left || !right;

    // 🟣 Якщо left/right масиви — обгортаємо у вертикальну колонку
    const renderSide = (content: React.ReactNode | React.ReactNode[]) => {
        if (Array.isArray(content)) {
            return (
                <div className={styles.multiColumn}>
                    {content.map((c, i) => (
                        <div key={i} className={styles.multiItem}>
                            {c}
                        </div>
                    ))}
                </div>
            );
        }
        return content;
    };

    return (
        <section className={styles.wrapper}>
            {(title || description) && (
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {title && <h2 className={styles.title}>{title}</h2>}
                    {description && <p className={styles.description}>{description}</p>}
                </motion.div>
            )}

            <motion.div
                className={`${styles.section} ${isSingle ? styles.single : ""}`}
                style={{
                    flexDirection: reverse ? "row-reverse" : "row",
                    gap,
                    alignItems: align,
                    justifyContent: isSingle ? "center" : justify,
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {left && (
                    <motion.div
                        className={styles.left}
                        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {renderSide(left)}
                    </motion.div>
                )}

                {right && (
                    <motion.div
                        className={styles.right}
                        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {renderSide(right)}
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
};

export default Section;
