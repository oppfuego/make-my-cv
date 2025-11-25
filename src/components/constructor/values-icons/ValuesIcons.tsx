"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./ValuesIcons.module.scss";

interface ValueItem {
    icon: string;
    title: string;
    description?: string;
    text?: string;
}

interface Props {
    title?: string;
    description?: string;
    values: ValueItem[];
}

const ValuesIcons: React.FC<Props> = ({ title, description, values }) => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {title && <h2 className={styles.sectionTitle}>{title}</h2>}
                {description && <p className={styles.sectionDesc}>{description}</p>}

                <div className={styles.valuesGrid}>
                    {values.map((v, i) => (
                        <motion.div
                            key={i}
                            className={styles.valueCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            whileHover={{ y: -6 }}
                        >
                            <div className={styles.iconCircle}>
                                <motion.div
                                    className={styles.iconInner}
                                    whileHover={{ scale: 1.15 }}
                                >
                                    {v.icon}
                                </motion.div>
                            </div>

                            <div className={styles.textBlock}>
                                <h3>{v.title}</h3>
                                <p>{v.description ?? v.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValuesIcons;
