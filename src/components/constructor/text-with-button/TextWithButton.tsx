"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./TextWithButton.module.scss";
import Text from "../text/Text";
import ButtonUI from "@/components/ui/button/ButtonUI";

interface TextWithButtonProps {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    align?: "left" | "center" | "right";
}

const TextWithButton: React.FC<TextWithButtonProps> = ({
                                                           title,
                                                           description,
                                                           buttonText,
                                                           buttonLink,
                                                           align = "left",
                                                       }) => {
    return (
        <motion.div
            className={`${styles.wrapper} ${styles[align]}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Text block */}
            <motion.div
                className={styles.textBlock}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Text title={title} description={description} />
            </motion.div>

            {/* Decorative connector line */}
            {buttonText && buttonLink && <div className={styles.connector} />}

            {/* Button */}
            {buttonText && buttonLink && (
                <motion.a
                    href={buttonLink}
                    className={styles.buttonLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <ButtonUI
                        text={buttonText}
                        color="primary"
                        shape="default"
                        hoverEffect="glow"
                        size="md"
                        hoverColor="primary"
                    />
                </motion.a>
            )}
        </motion.div>
    );
};

export default TextWithButton;
