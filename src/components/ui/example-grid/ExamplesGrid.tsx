"use client";

import React from "react";
import styles from "./ExamplesGrid.module.scss";
import { cvExamples } from "@/data/cvExample";
import CVCard from "@/components/ui/cv-card/CVCard";

const ExamplesGrid = () => {
    return (
        <section className={styles.wrapper}>
            <h2 className={styles.heading}>
                Choose Your CV Style
            </h2>

            <p className={styles.subheading}>
                Below are premium CV templates you can preview and download. Each design is crafted to highlight your strengths and pass HR systems.
            </p>

            <div className={styles.grid}>
                {cvExamples.map((cv) => (
                    <CVCard key={cv.id} {...cv} />
                ))}
            </div>
        </section>
    );
};

export default ExamplesGrid;
