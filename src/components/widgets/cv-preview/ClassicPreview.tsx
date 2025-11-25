// components/cv/preview/ClassicPreview.tsx
import React from "react";
import styles from "./CVPreview.module.scss";

export interface PreviewValues {
    fullName: string;
    phone: string;
    industry: string;
    experienceLevel: string;
    summary: string;
    workExperience: string;
    education: string;
    skills: string;
}

interface Props {
    values: PreviewValues;
}

const ClassicPreview: React.FC<Props> = ({ values }) => {
    const { fullName, phone, industry, experienceLevel, summary, workExperience, education, skills } =
        values;

    return (
        <div className={`${styles.preview} ${styles.classic}`}>
            <div className={styles.name}>{fullName || "Your Name"}</div>
            <div className={styles.subtitle}>
                {(experienceLevel || "Level") + " · " + (industry || "Industry")}
            </div>
            <div className={styles.contact}>{phone || "Phone / Contact"}</div>

            <section className={styles.section}>
                <h2>Summary</h2>
                <p>
                    {summary ||
                        "Write 3–5 sentences describing your experience, strengths and what roles you are targeting."}
                </p>
            </section>

            <section className={styles.section}>
                <h2>Skills</h2>
                <p>{skills || "List your core hard & soft skills here."}</p>
            </section>

            <section className={styles.section}>
                <h2>Work Experience</h2>
                <p>{workExperience || "Describe your role, impact and achievements in previous positions."}</p>
            </section>

            <section className={styles.section}>
                <h2>Education</h2>
                <p>{education || "Your education history will appear here."}</p>
            </section>
        </div>
    );
};

export default ClassicPreview;
