// components/cv/preview/CreativePreview.tsx
import React from "react";
import styles from "./CVPreview.module.scss";
import type { PreviewValues } from "./ClassicPreview";

interface Props {
    values: PreviewValues;
}

const CreativePreview: React.FC<Props> = ({ values }) => {
    const { fullName, phone, industry, experienceLevel, summary, workExperience, education, skills } =
        values;

    return (
        <div className={`${styles.preview} ${styles.creative}`}>
            <div className={styles.creativeHeader}>
                <div className={styles.name}>{fullName || "Your Name"}</div>
                <div className={styles.subtitle}>
                    {(experienceLevel || "Level") + " · " + (industry || "Industry")}
                </div>
                <div className={styles.contact}>{phone || "Phone / Contact"}</div>
            </div>

            <div className={styles.creativeSections}>
                <section className={styles.section}>
                    <h3>✨ Summary</h3>
                    <p>
                        {summary ||
                            "A more expressive summary with a bit of personality. Great for creative or product roles."}
                    </p>
                </section>

                <section className={styles.section}>
                    <h3>🎯 Top Skills</h3>
                    <p>{skills || "Highlight your strongest creative, technical and interpersonal skills here."}</p>
                </section>

                <section className={styles.section}>
                    <h3>💼 Work Experience</h3>
                    <p>
                        {workExperience ||
                            "We will turn your work history into an engaging story with clear impact and results."}
                    </p>
                </section>

                <section className={styles.section}>
                    <h3>📚 Education</h3>
                    <p>
                        {education ||
                            "Degrees, bootcamps and self-learning that support your creative profile will appear here."}
                    </p>
                </section>
            </div>
        </div>
    );
};

export default CreativePreview;
