// components/cv/preview/ExtrasPreview.tsx
import React from "react";
import styles from "./CVPreview.module.scss";
import type { PreviewValues } from "./ClassicPreview";

type ExtraKey =
    | "coverLetter"
    | "linkedin"
    | "keywords"
    | "atsCheck"
    | "jobAdaptation"
    | "achievements"
    | "skillsGap"
    | "customFont"
    | "customColor";

interface Props {
    extras: ExtraKey[];
    values: PreviewValues;
}

const EXTRA_TEMPLATES: Record<ExtraKey, (v: PreviewValues) => string> = {
    coverLetter: (v) => `Dear Hiring Manager,

${v.summary || "Your summary will be adapted into a professional, motivation-focused introduction."}

Best regards,
${v.fullName || "Your Name"}`,

    linkedin: (v) =>
        `${v.fullName || "Your Name"} is a ${v.experienceLevel || "experienced"} ${
            v.industry || "professional"
        } with a strong focus on impact, growth and collaboration. This section will be generated as a ready-to-paste LinkedIn "About".`,

    keywords: (v) =>
        `A curated list of 20+ recruiter-friendly keywords for ${v.industry || "your industry"} and ${
            v.experienceLevel || "your level"
        } will appear here. Example:
product ownership, sprint planning, stakeholder management, ...`,

    atsCheck: () =>
        `ATS report example:
• Score: 85/100
• Good keyword density
• Clean structure
• Minimal formatting issues
We will generate a short, readable ATS-focused summary.`,

    jobAdaptation: (v) =>
        `Your summary and experience will be re-written to match a specific job description.

Example adapted summary (based on your input):
${v.summary || "[summary text goes here]"}`,

    achievements: () =>
        `Example achievement bullets:
• Increased conversion rate by 27% in 6 months
• Reduced operational costs by 18% through automation
• Led a cross-functional team of 8 to deliver key product launch on time`,

    skillsGap: () =>
        `Example skills gap analysis:
• Recommended new skills (e.g. cloud, advanced SQL, system design)
• 3–5 course or learning path suggestions
We will generate a short report with clear next steps.`,

    customFont: () =>
        `Custom font styling preview:
• Cleaner hierarchy
• Improved readability
• Visual polish matching your brand or portfolio style.`,

    customColor: () =>
        `Custom color theme preview:
• Accent colors adjusted
• Better contrast
• Visual consistency with your LinkedIn, portfolio or company brand.`
};

const ExtrasPreview: React.FC<Props> = ({ extras, values }) => {
    if (!extras.length) {
        return (
            <div className={styles.extraPreviewWrapper}>
                <div className={styles.extraTitle}>Extras Preview</div>
                <p className={styles.emptyExtra}>Select extra options to see how they will look.</p>
            </div>
        );
    }

    return (
        <div className={styles.extraPreviewWrapper}>
            <div className={styles.extraTitle}>Extras Preview</div>
            {extras.map((key) => (
                <div key={key} className={styles.extraBlock}>
                    <h4>{key}</h4>
                    <pre>{EXTRA_TEMPLATES[key](values)}</pre>
                </div>
            ))}
        </div>
    );
};

export default ExtrasPreview;
