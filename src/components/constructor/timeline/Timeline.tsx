"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Timeline.module.scss";

interface Step {
    title: string;
    description: string;
}

interface Props {
    title?: string;
    steps: Step[];
}

export default function Timeline({ title, steps }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [active, setActive] = useState(0);
    const [lineHeight, setLineHeight] = useState(0);
    const [thumbPos, setThumbPos] = useState(0);

    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const onScroll = () => {
            let index = 0;
            let minDist = Infinity;
            const mid = window.innerHeight / 2;

            stepRefs.current.forEach((el, i) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const distance = Math.abs(rect.top - mid);
                if (distance < minDist) {
                    minDist = distance;
                    index = i;
                }
            });

            setActive(index);
        };

        window.addEventListener("scroll", onScroll);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!badgeRefs.current[active] || !containerRef.current) return;

        const containerTop = containerRef.current.getBoundingClientRect().top;
        const badgeRect = badgeRefs.current[active]!.getBoundingClientRect();

        const badgeCenter = badgeRect.top - containerTop + badgeRect.height / 2;

        setLineHeight(badgeCenter);
        setThumbPos(badgeCenter - 9);
    }, [active, steps.length]);

    return (
        <section className={styles.timelineSection}>
            <div className={styles.wrapper} ref={containerRef}>
                {title && <h2 className={styles.title}>{title}</h2>}

                <div className={styles.progressLine}>
                    <motion.div
                        className={styles.progressFill}
                        animate={{ height: lineHeight }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    />

                    <motion.div
                        className={styles.progressThumb}
                        animate={{ top: thumbPos }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    />
                </div>

                {steps.map((step, i) => (
                    <div
                        key={i}
                        ref={(el) => (stepRefs.current[i] = el)}
                        className={styles.step}
                    >
                        <div
                            ref={(el) => (badgeRefs.current[i] = el)}
                            className={`${styles.badge} ${i === active ? styles.active : ""}`}
                        >
                            {i + 1}
                        </div>

                        <motion.div
                            className={styles.card}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                        >
                            <h4>{step.title}</h4>
                            <p>{step.description}</p>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
}
