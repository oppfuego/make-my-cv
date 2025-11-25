"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Textarea from "@mui/joy/Textarea";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ManualGenerator.module.scss";
import { useUser } from "@/context/UserContext";
import { useAlert } from "@/context/AlertContext";

// Previews
import ClassicPreview from "@/components/widgets/cv-preview/ClassicPreview";
import ModernPreview from "@/components/widgets/cv-preview/ModernPreview";
import CreativePreview from "@/components/widgets/cv-preview/CreativePreview";
import ExtrasPreview from "@/components/widgets/cv-preview/ExtrasPreview";

// =======================================================================
// TYPES
// =======================================================================

type ReviewType = "default" | "manager";

type ExtraKey =
    | "coverLetter"
    | "linkedin"
    | "keywords"
    | "atsCheck"
    | "jobAdaptation"
    | "achievements"
    | "skillsGap"
    | "customColor";

interface FormValues {
    fullName: string;
    phone: string;
    photo: string | null;
    cvStyle: "Classic" | "Modern" | "Creative";
    fontStyle: string;
    themeColor: string;
    industry: string;
    experienceLevel: string;
    summary: string;
    workExperience: string;
    education: string;
    skills: string;
    reviewType: ReviewType;
    extras: ExtraKey[];
}

// =======================================================================
// VALIDATION
// =======================================================================

const CV_SCHEMA = Yup.object().shape({
    fullName: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    cvStyle: Yup.string().required("Required"),
    industry: Yup.string().required("Required"),
    experienceLevel: Yup.string().required("Required"),
    summary: Yup.string().required("Required"),
    workExperience: Yup.string().required("Required"),
    education: Yup.string().required("Required"),
    skills: Yup.string().required("Required"),
});

// =======================================================================
// CONSTANTS
// =======================================================================

const CV_STYLES = ["Classic", "Modern", "Creative"] as const;
const FONTS = ["Helvetica", "Times-Roman", "Courier"] as const;

const COLORS = ["Default", "Blue", "Green", "Purple", "Red"];

const INDUSTRIES = [
    "IT",
    "Marketing",
    "Finance",
    "Design",
    "Education",
    "Healthcare",
    "Other",
];

const LEVELS = ["Junior", "Mid-level", "Senior", "Lead"];

const REVIEW_OPTIONS = [
    { value: "default", label: "AI Instant (30 tokens)" },
    { value: "manager", label: "Human Review (60 tokens)" },
];

const EXTRAS = [
    { key: "coverLetter", title: "Cover Letter", cost: 10, icon: "📝" },
    { key: "linkedin", title: "LinkedIn Section", cost: 15, icon: "🔗" },
    { key: "keywords", title: "Keyword Boost", cost: 12, icon: "🏷️" },
    { key: "atsCheck", title: "ATS Report", cost: 12, icon: "📊" },
    { key: "jobAdaptation", title: "Job Adaptation", cost: 20, icon: "🎯" },
    { key: "achievements", title: "Achievements", cost: 10, icon: "🏆" },
    { key: "skillsGap", title: "Skills Gap", cost: 15, icon: "📚" },
    { key: "customColor", title: "Custom Color", cost: 5, icon: "🎨" },
] as const;

const EXTRA_COST = Object.fromEntries(EXTRAS.map((e) => [e.key, e.cost]));

const BASE_COST: Record<ReviewType, number> = {
    default: 30,
    manager: 60,
};

const calcExtrasCost = (extras: ExtraKey[]) =>
    extras.reduce((s, k) => s + EXTRA_COST[k], 0);

const stepVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.2 } },
};

// =======================================================================
// MAIN COMPONENT
// =======================================================================

export default function ManualGenerator() {
    const [step, setStep] = useState(1);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const { showAlert } = useAlert();
    const user = useUser();

    const handleNext = () => setStep((s) => Math.min(5, s + 1));
    const handlePrev = () => setStep((s) => Math.max(1, s - 1));

    const initialValues: FormValues = {
        fullName: "",
        phone: "",
        photo: null,
        cvStyle: "Classic",
        fontStyle: "Helvetica",
        themeColor: "Default",
        industry: "",
        experienceLevel: "",
        summary: "",
        workExperience: "",
        education: "",
        skills: "",
        reviewType: "default",
        extras: [],
    };

    async function convertToBase64(file: File): Promise<string> {
        return await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
        });
    }

    return (
        <Formik<FormValues>
            initialValues={initialValues}
            validationSchema={CV_SCHEMA}
            onSubmit={async (values, { resetForm }) => {
                try {
                    setLoadingSubmit(true);

                    const totalTokens =
                        BASE_COST[values.reviewType] + calcExtrasCost(values.extras);

                    const payload = {
                        ...values,
                        email: user?.email,
                        totalTokens,
                    };

                    const res = await fetch("/api/cv/create-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                    });

                    const data = await res.json();
                    if (!res.ok) throw new Error(data.message);

                    showAlert(
                        "Success",
                        "Your CV is being generated. You will see it in Orders shortly!",
                        "success"
                    );

                    // reset form + go to step 1
                    resetForm();
                    setStep(1);
                } catch (err: any) {
                    showAlert("Error", err.message, "error");
                } finally {
                    setLoadingSubmit(false);
                }
            }}
        >
            {({ values, setFieldValue }) => {
                const total = BASE_COST[values.reviewType] + calcExtrasCost(values.extras);

                const previewValues = {
                    fullName: values.fullName,
                    phone: values.phone,
                    industry: values.industry,
                    experienceLevel: values.experienceLevel,
                    summary: values.summary,
                    workExperience: values.workExperience,
                    education: values.education,
                    skills: values.skills,
                    photo: values.photo,
                };

                return (
                    <Form className={styles.form}>
                        {/* HEADER */}
                        <header className={styles.header}>
                            <motion.h2 key={step}>CV Generator</motion.h2>
                            <p>Step {step} / 5</p>
                        </header>

                        <div className={styles.main}>
                            {/* LEFT SIDE (FORM) */}
                            <div className={styles.left}>
                                <AnimatePresence mode="wait">
                                    {/* STEP 1 */}
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            className={styles.step}
                                            {...stepVariants}
                                        >
                                            <h3>Personal Information</h3>

                                            <div className={styles.row}>
                                                <Field
                                                    as={Input}
                                                    name="fullName"
                                                    placeholder="Full Name"
                                                />
                                                <Field
                                                    as={Input}
                                                    name="phone"
                                                    placeholder="Phone"
                                                />
                                            </div>

                                            <div className={styles.inputGroup}>
                                                <label>Photo</label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={async (e) => {
                                                        const f = e.target.files?.[0];
                                                        if (!f) return;

                                                        const base64 =
                                                            await convertToBase64(f);
                                                        setFieldValue("photo", base64);
                                                    }}
                                                />

                                                {values.photo && (
                                                    <img
                                                        src={values.photo}
                                                        alt="preview"
                                                        className={styles.thumb}
                                                    />
                                                )}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 2 */}
                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            className={styles.step}
                                            {...stepVariants}
                                        >
                                            <h3>Design Settings</h3>

                                            <div className={styles.row}>
                                                {/* STYLE */}
                                                <div className={styles.inputGroup}>
                                                    <label>CV Style</label>
                                                    <Select
                                                        value={values.cvStyle}
                                                        onChange={(_, v) =>
                                                            setFieldValue("cvStyle", v)
                                                        }
                                                    >
                                                        {CV_STYLES.map((s) => (
                                                            <Option key={s} value={s}>
                                                                {s}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </div>

                                                {/* FONT */}
                                                <div className={styles.inputGroup}>
                                                    <label>Font</label>
                                                    <Select
                                                        value={values.fontStyle}
                                                        onChange={(_, v) =>
                                                            setFieldValue(
                                                                "fontStyle",
                                                                v || "Helvetica"
                                                            )
                                                        }
                                                    >
                                                        {FONTS.map((f) => (
                                                            <Option key={f} value={f}>
                                                                {f}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </div>

                                                {/* COLOR */}
                                                <div className={styles.inputGroup}>
                                                    <label>Theme Color</label>
                                                    <Select
                                                        value={values.themeColor}
                                                        onChange={(_, v) =>
                                                            setFieldValue("themeColor", v)
                                                        }
                                                    >
                                                        {COLORS.map((c) => (
                                                            <Option key={c} value={c}>
                                                                {c}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 3 */}
                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            className={styles.step}
                                            {...stepVariants}
                                        >
                                            <h3>Professional Info</h3>

                                            <div className={styles.row}>
                                                <div className={styles.inputGroup}>
                                                    <label>Industry</label>
                                                    <Select
                                                        value={values.industry}
                                                        onChange={(_, v) =>
                                                            setFieldValue("industry", v)
                                                        }
                                                    >
                                                        {INDUSTRIES.map((i) => (
                                                            <Option key={i} value={i}>
                                                                {i}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </div>

                                                <div className={styles.inputGroup}>
                                                    <label>Experience</label>
                                                    <Select
                                                        value={values.experienceLevel}
                                                        onChange={(_, v) =>
                                                            setFieldValue(
                                                                "experienceLevel",
                                                                v
                                                            )
                                                        }
                                                    >
                                                        {LEVELS.map((l) => (
                                                            <Option key={l} value={l}>
                                                                {l}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 4 */}
                                    {step === 4 && (
                                        <motion.div
                                            key="step4"
                                            className={styles.step}
                                            {...stepVariants}
                                        >
                                            <h3>CV Content</h3>

                                            <Field
                                                as={Textarea}
                                                name="summary"
                                                minRows={3}
                                                placeholder="Summary"
                                            />
                                            <Field
                                                as={Textarea}
                                                name="workExperience"
                                                minRows={3}
                                                placeholder="Work Experience"
                                            />
                                            <Field
                                                as={Textarea}
                                                name="education"
                                                minRows={3}
                                                placeholder="Education"
                                            />
                                            <Field
                                                as={Textarea}
                                                name="skills"
                                                minRows={3}
                                                placeholder="Skills"
                                            />
                                        </motion.div>
                                    )}

                                    {/* STEP 5 */}
                                    {step === 5 && (
                                        <motion.div
                                            key="step5"
                                            className={styles.step}
                                            {...stepVariants}
                                        >
                                            <h3>Extras</h3>

                                            <div className={styles.optionsGrid}>
                                                {EXTRAS.map((e) => {
                                                    const active = values.extras.includes(
                                                        e.key as ExtraKey
                                                    );

                                                    return (
                                                        <button
                                                            key={e.key}
                                                            type="button"
                                                            disabled={loadingSubmit}
                                                            className={`${styles.option} ${
                                                                active
                                                                    ? styles.optionActive
                                                                    : ""
                                                            }`}
                                                            onClick={() => {
                                                                if (active) {
                                                                    setFieldValue(
                                                                        "extras",
                                                                        values.extras.filter(
                                                                            (x) =>
                                                                                x !==
                                                                                e.key
                                                                        )
                                                                    );
                                                                } else {
                                                                    setFieldValue(
                                                                        "extras",
                                                                        [
                                                                            ...values.extras,
                                                                            e.key,
                                                                        ]
                                                                    );
                                                                }
                                                            }}
                                                        >
                                                            <span>{e.icon}</span>
                                                            <div>{e.title}</div>
                                                            <small>
                                                                +{e.cost} tokens
                                                            </small>
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <div className={styles.inputGroup}>
                                                <label>Review type</label>
                                                <Select
                                                    value={values.reviewType}
                                                    onChange={(_, v) =>
                                                        setFieldValue(
                                                            "reviewType",
                                                            v || "default"
                                                        )
                                                    }
                                                >
                                                    {REVIEW_OPTIONS.map((o) => (
                                                        <Option
                                                            key={o.value}
                                                            value={o.value}
                                                        >
                                                            {o.label}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* NAVIGATION */}
                                <div className={styles.nav}>
                                    {step > 1 && (
                                        <ButtonUI
                                            type="button"
                                            onClick={handlePrev}
                                            disabled={loadingSubmit}
                                        >
                                            ← Back
                                        </ButtonUI>
                                    )}

                                    {step < 5 && (
                                        <ButtonUI
                                            type="button"
                                            onClick={handleNext}
                                            disabled={loadingSubmit}
                                        >
                                            Next →
                                        </ButtonUI>
                                    )}

                                    {step === 5 && (
                                        <ButtonUI
                                            type="submit"
                                            color="primary"
                                            loading={loadingSubmit}
                                            disabled={loadingSubmit}
                                        >
                                            {loadingSubmit ? "Generating..." : "Generate CV"}
                                        </ButtonUI>
                                    )}
                                </div>
                            </div>

                            {/* RIGHT PREVIEW */}
                            <div className={styles.right}>
                                {values.cvStyle === "Classic" && (
                                    <ClassicPreview values={previewValues} />
                                )}
                                {values.cvStyle === "Modern" && (
                                    <ModernPreview values={previewValues} />
                                )}
                                {values.cvStyle === "Creative" && (
                                    <CreativePreview values={previewValues} />
                                )}

                                <ExtrasPreview extras={values.extras} values={previewValues} />
                            </div>
                        </div>

                        {/* TOTAL PRICE */}
                        <footer className={styles.tokenBar}>
                            <p>Base: {BASE_COST[values.reviewType]} • Extras: +{calcExtrasCost(values.extras)}</p>
                            <h4>Total: {total} tokens</h4>
                        </footer>
                    </Form>
                );
            }}
        </Formik>
    );
}
