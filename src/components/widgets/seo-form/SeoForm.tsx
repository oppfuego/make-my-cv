"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useAlert } from "@/context/AlertContext";
import ButtonUI from "@/components/ui/button/ButtonUI";
import styles from "./SeoForm.module.scss";

interface SeoRequestFormProps {
    service: string;
    tokens: number;
    title?: string;
    description?: string;
}

interface ExtraOption {
    name: string;
    price: number;
    desc: string;
    type?: "checkbox" | "file" | "number" | "text" | "textarea" | "url";
    min?: number;
    max?: number;
}

/* 🎯 Affordable SEO add-ons */
const extraOptions: Record<string, ExtraOption[]> = {
    "Technical Website Audit": [
        {
            name: "Core Web Vitals Optimization",
            price: 1000, // £40
            desc: "Improve loading speed and stability of your site.",
            type: "checkbox",
        },
        {
            name: "Crawl Budget Analysis",
            price: 800, // £30
            desc: "Optimize how Google crawls your pages.",
            type: "checkbox",
        },
        {
            name: "Upload Sitemap File",
            price: 100,
            desc: "Upload your XML sitemap for review.",
            type: "file",
        },
        {
            name: "Pages to Audit",
            price: 130, // £5 per 10 pages
            desc: "Specify number of pages to include in audit.",
            type: "number",
            min: 1,
            max: 100,
        },
    ],

    "SEO Copywriting": [
        {
            name: "Custom Keywords List",
            price: 500, // £15
            desc: "Provide your own keyword list for the article.",
            type: "textarea",
        },
        {
            name: "Content Reference URL",
            price: 100,
            desc: "Share a link to sample content or tone reference.",
            type: "url",
        },
        {
            name: "AI Tone & Voice Adjustment",
            price: 250, // £10
            desc: "Adapt text tone and style to your brand.",
            type: "checkbox",
        },
    ],

    "Off-Page SEO": [
        {
            name: "Backlink Profile Audit",
            price: 1000, // £40
            desc: "Analyze and clean up toxic backlinks.",
            type: "checkbox",
        },
        {
            name: "Upload Backlink List",
            price: 100,
            desc: "Attach CSV or XLSX with your backlinks.",
            type: "file",
        },
        {
            name: "Guest Posting Outreach",
            price: 1000, // £80
            desc: "Find high-quality guest post opportunities.",
            type: "checkbox",
        },
    ],

    "Local SEO": [
        {
            name: "Google My Business Optimization",
            price: 1000, // £50
            desc: "Optimize and update your GMB profile.",
            type: "checkbox",
        },
        {
            name: "NAP Consistency Check",
            price: 500, // £20
            desc: "Check and fix business name, address, phone data.",
            type: "checkbox",
        },
        {
            name: "Local Keyword Research",
            price: 800, // £25
            desc: "Find the best local keywords for your area.",
            type: "checkbox",
        },
    ],
};

export default function SeoRequestForm({
                                           service,
                                           tokens,
                                           title,
                                           description,
                                       }: SeoRequestFormProps) {
    const user = useUser();
    const { showAlert } = useAlert();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
    const [extraValues, setExtraValues] = useState<Record<string, any>>({});

    const extras = extraOptions[service] || [];

    const toggleExtra = (extraName: string) => {
        setSelectedExtras((prev) =>
            prev.includes(extraName)
                ? prev.filter((e) => e !== extraName)
                : [...prev, extraName]
        );
    };

    const handleExtraValueChange = (name: string, value: any) => {
        setExtraValues((prev) => ({ ...prev, [name]: value }));
    };

    const totalTokens =
        tokens +
        extras
            .filter((e) => selectedExtras.includes(e.name))
            .reduce((sum, e) => sum + e.price, 0);

    const totalGBP = (totalTokens * 0.01).toFixed(2);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!user) {
            showAlert("Login required", "Please log in to send a request.", "warning");
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();

            formData.append("userId", user._id);
            formData.append("userEmail", user.email);
            formData.append("service", service);
            formData.append("message", message);
            formData.append("tokens", totalTokens.toString());
            formData.append("extras", JSON.stringify(selectedExtras));
            formData.append("extraValues", JSON.stringify(extraValues));

            Object.entries(extraValues).forEach(([key, value]) => {
                if (value instanceof File) formData.append(key, value);
            });

            const res = await fetch("/api/seo-request", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Request failed");
            }

            setSuccess(true);
            showAlert("Success", "Your SEO request has been sent.", "success");
        } catch (err: any) {
            showAlert("Error", err.message, "error");
        } finally {
            setLoading(false);
        }
    }

    if (success)
        return <div className={styles.success}>✅ Request sent successfully!</div>;

    return (
        <section className={styles.section}>
            <h3>{title ?? `Request ${service}`}</h3>
            {description && <p>{description}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.serviceInfo}>
                    <span>Service: {service}</span>
                    <span className={styles.tokens}>
            💰 {totalTokens} tokens (~£{totalGBP})
          </span>
                </div>

                <label htmlFor="message">Project details</label>
                <textarea
                    id="message"
                    placeholder="Describe your goals, target audience, or website link..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                {extras.length > 0 && (
                    <div className={styles.extrasSection}>
                        <h4>Additional Features</h4>
                        <div className={styles.extrasList}>
                            {extras.map((extra) => (
                                <div key={extra.name} className={styles.extraItem}>
                                    {/* ✅ checkbox */}
                                    {extra.type === "checkbox" && (
                                        <>
                                            <input
                                                type="checkbox"
                                                checked={selectedExtras.includes(extra.name)}
                                                onChange={() => toggleExtra(extra.name)}
                                            />
                                            <div className={styles.extraInfo}>
                                                <strong>{extra.name}</strong>
                                                <p>{extra.desc}</p>
                                            </div>
                                            <span className={styles.extraPrice}>
                        +{extra.price} tokens (£{(extra.price * 0.01).toFixed(2)})
                      </span>
                                        </>
                                    )}

                                    {/* 📁 file */}
                                    {extra.type === "file" && (
                                        <div className={styles.extraInputBlock}>
                                            <label>
                                                {extra.name}{" "}
                                                <span className={styles.extraPrice}>
                          +{extra.price} tokens
                        </span>
                                            </label>
                                            <input
                                                type="file"
                                                accept=".xml,.csv,.xlsx,.pdf"
                                                onChange={(e) =>
                                                    handleExtraValueChange(extra.name, e.target.files?.[0])
                                                }
                                            />
                                            <p>{extra.desc}</p>
                                        </div>
                                    )}

                                    {/* 🔢 number */}
                                    {extra.type === "number" && (
                                        <div className={styles.extraInputBlock}>
                                            <label>
                                                {extra.name}{" "}
                                                <span className={styles.extraPrice}>
                          +{extra.price} tokens
                        </span>
                                            </label>
                                            <input
                                                type="number"
                                                min={extra.min || 1}
                                                max={extra.max || 100}
                                                onChange={(e) =>
                                                    handleExtraValueChange(extra.name, e.target.value)
                                                }
                                            />
                                            <p>{extra.desc}</p>
                                        </div>
                                    )}

                                    {/* 📝 textarea */}
                                    {extra.type === "textarea" && (
                                        <div className={styles.extraInputBlock}>
                                            <label>
                                                {extra.name}{" "}
                                                <span className={styles.extraPrice}>
                          +{extra.price} tokens
                        </span>
                                            </label>
                                            <textarea
                                                placeholder={extra.desc}
                                                onChange={(e) =>
                                                    handleExtraValueChange(extra.name, e.target.value)
                                                }
                                            />
                                        </div>
                                    )}

                                    {/* 🔗 URL */}
                                    {extra.type === "url" && (
                                        <div className={styles.extraInputBlock}>
                                            <label>
                                                {extra.name}{" "}
                                                <span className={styles.extraPrice}>
                          +{extra.price} tokens
                        </span>
                                            </label>
                                            <input
                                                type="url"
                                                placeholder="https://example.com"
                                                onChange={(e) =>
                                                    handleExtraValueChange(extra.name, e.target.value)
                                                }
                                            />
                                            <p>{extra.desc}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <ButtonUI
                    type="submit"
                    loading={loading}
                    fullWidth
                    color="secondary"
                    textColor="backgroundLight"
                    text={`Send Request (${totalTokens} tokens ≈ £${totalGBP})`}
                />
            </form>
        </section>
    );
}
