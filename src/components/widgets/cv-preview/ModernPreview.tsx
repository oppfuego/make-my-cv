// components/cv/preview/ModernPreview.tsx
import React from "react";
import styles from "./CVPreview.module.scss";
import type { PreviewValues } from "./ClassicPreview";

interface Props {
    values: PreviewValues;
}

const ModernPreview: React.FC<Props> = ({ values }) => {
    const { fullName, phone, industry, experienceLevel, summary, workExperience, education, skills } =
        values;

    const skillsList =
        skills && skills.includes(",")
            ? skills.split(",").map((s) => s.trim()).filter(Boolean)
            : skills
                ? [skills]
                : [];

    return (
        <div className={`${styles.preview} ${styles.modern}`}>
            <header className={styles.modHeader}>
                <div>
                    <h1>{fullName || "Your Name"}</h1>
                    <p>
                        {(experienceLevel || "Level") + " · " + (industry || "Industry")}
                    </p>
                </div>
                <div className={styles.modContact}>
                    <p>{phone || "Phone / Contact"}</p>
                </div>
            </header>

            <section className={styles.section}>
                <h2>Summary</h2>
                <p>
                    {summary ||
                        "A concise summary optimized for modern, recruiter-friendly CV formats will appear here."}
                </p>
            </section>

            <section className={styles.section}>
                <h2>Core Skills</h2>
                {skillsList.length ? (
                    <ul>
                        {skillsList.map((s, idx) => (
                            <li key={idx}>{s}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Your most important skills and tools will appear here.</p>
                )}
            </section>

            <section className={styles.section}>
                <h2>Experience</h2>
                <p>
                    {workExperience ||
                        "We will convert your raw experience text into a structured, modern-looking experience block."}
                </p>
            </section>

            <section className={styles.section}>
                <h2>Education</h2>
                <p>
                    {education ||
                        "Degrees, universities and relevant courses will be formatted in a clean, readable style."}
                </p>
            </section>
        </div>
    );
};

export default ModernPreview;
