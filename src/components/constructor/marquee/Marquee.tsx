"use client";
import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import styles from "./Marquee.module.scss";

interface MarqueeProps {
    items: { text: string }[];
    speed?: number; // pixels per second
}

const Marquee: React.FC<MarqueeProps> = ({ items, speed = 40 }) => {
    const doubled = [...items, ...items];

    const x = useMotionValue(0);
    const baseSpeed = speed;

    const [isPaused, setPaused] = React.useState(false);

    useAnimationFrame((t, delta) => {
        if (!isPaused) {
            const move = (baseSpeed / 500) * delta;
            x.set(x.get() - move);

            if (x.get() < -2000) {
                x.set(0); // циклічне перезапускання
            }
        }
    });

    return (
        <section
            className={styles.marqueeWrapper}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className={styles.gradientOverlay} />

            <motion.div
                className={styles.track}
                style={{ x }}
            >
                {doubled.map((item, i) => (
                    <motion.span
                        key={i}
                        className={styles.item}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        whileHover={{
                            scale: 1.1,
                            color: "var(--primary-color)",
                            textShadow: "0 0 12px rgba(108,92,231,0.5)",
                        }}
                    >
                        {item.text}
                    </motion.span>
                ))}
            </motion.div>
        </section>
    );
};

export default Marquee;
