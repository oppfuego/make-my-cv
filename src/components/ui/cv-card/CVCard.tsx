"use client";

import React from "react";
import Image from "next/image";
import styles from "./CVCard.module.scss";

interface CVCardProps {
    title: string;
    description: string;
    pdf: string;
    preview: string;
}

const CVCard: React.FC<CVCardProps> = ({ title, description, pdf, preview }) => {
    return (
        <div className={styles.card}>
            <div className={styles.previewWrapper}>
                {/* Blurred background */}
                <Image
                    src={preview}
                    alt="bg"
                    fill
                    className={styles.bgBlur}
                    style={{ objectFit: "cover" }}
                />

                {/* Actual preview */}
                <Image
                    src={preview}
                    alt={title}
                    fill
                    className={styles.previewImg}
                    style={{ objectFit: "contain" }}
                />
            </div>

            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>

            <a href={pdf} download className={styles.button}>
                Download PDF
            </a>
        </div>
    );
};

export default CVCard;
