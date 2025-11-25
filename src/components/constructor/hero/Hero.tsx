"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.scss";
import Image from "next/image";
import Link from "next/link";
import ButtonUI from "@/components/ui/button/ButtonUI";
import TrustBadge from "@/components/features/trust-badge/TrustBadge";
import { media } from "@/resources/media";
import type { StaticImageData } from "next/image";

interface HeroSectionProps {
    title: string;
    highlight?: string;
    description: string;
    primaryCta?: { text: string; link: string };
    secondaryCta?: { text: string; link: string };
    image?: string;
    align?: "left" | "right";
    showTrustBadge?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
                                                     title,
                                                     highlight,
                                                     description,
                                                     primaryCta,
                                                     secondaryCta,
                                                     image,
                                                     showTrustBadge = true,
                                                 }) => {
    const bgImage = image
        ? (media as Record<string, string | StaticImageData>)[image]
        : undefined;

    const imageSrc =
        typeof bgImage === "string"
            ? bgImage
            : (bgImage as StaticImageData)?.src || "";

    return (
        <section className={styles.hero}>
            <div className={styles.grid}>

                {/* LEFT SIDE */}
                <motion.div
                    className={styles.left}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className={styles.title}>
                        {title}{" "}
                        {highlight && <span className={styles.highlight}>{highlight}</span>}
                    </h1>

                    <p className={styles.description}>{description}</p>

                    {showTrustBadge && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className={styles.badgeWrapper}
                        >
                            <TrustBadge />
                        </motion.div>
                    )}

                    <div className={styles.actions}>
                        {primaryCta && (
                            <Link href={primaryCta.link}>
                                <ButtonUI variant="solid" color="primary" size="lg" hoverEffect={"glow"} fullWidth>
                                    {primaryCta.text}
                                </ButtonUI>
                            </Link>
                        )}
                        {secondaryCta && (
                            <Link href={secondaryCta.link}>
                                <ButtonUI variant="solid" color="primary" size="lg" hoverEffect={"glow"} fullWidth>
                                    {secondaryCta.text}
                                </ButtonUI>
                            </Link>
                        )}
                    </div>
                </motion.div>

                {/* RIGHT SIDE — IMAGE */}
                <motion.div
                    className={styles.right}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    {imageSrc && (
                        <Image
                            src={imageSrc}
                            alt="Hero Visual"
                            width={650}
                            height={650}
                            className={styles.heroImage}
                        />
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
