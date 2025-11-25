"use client";

import React from "react";
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
                <img src={preview} className={styles.previewImg} alt={title} />
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
