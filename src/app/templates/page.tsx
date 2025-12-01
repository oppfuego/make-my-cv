"use client";

import React from "react";
import HeroSection from "@/components/constructor/hero/Hero";
import HighlightStrip from "@/components/constructor/highlight-strip/HighlightStrip";
import ExamplesGrid from "@/components/ui/example-grid/ExamplesGrid";
import InfoBlock from "@/components/constructor/Info-block/InfoBlock";
import ValuesIcons from "@/components/constructor/values-icons/ValuesIcons";
import FAQ from "@/components/constructor/faq/FAQ";
import Text from "@/components/constructor/text/Text";
import { media as mediaMap } from "@/resources/media";
import Section from "@/components/constructor/section/Section";
import VideoDemo from "@/components/constructor/video-demo/VideoDemo";
import Media from "@/components/constructor/image/Media";

function resolveMedia(key?: string) {
    if (!key) return undefined;
    return (mediaMap as Record<string, any>)[key];
}

const Page = () => {
    return (
        <>
            {/* ⭐ HERO BLOCK */}
            <HeroSection
                title="Explore Professional CV Examples"
                highlight="Modern • ATS-Optimized • Recruiter-Approved"
                description="Discover high-quality CV examples designed by HR specialists. Preview instantly, download in one click, or use them as inspiration for your own job-winning CV."
                image="image1"
            />

            {/* ⭐ GRID OF CV EXAMPLES */}
            <ExamplesGrid />

            {/* ⭐ INFOBLOCK WITH IMAGE (LEFT/RIGHT LAYOUT) */}
            <Section
                title="Why Our Templates Are Better"
                description="Every template is crafted according to modern HR expectations, ensuring that your CV is visually impressive and ATS-compliant."
                left={[
                    <Media src="image3" alt="CV Example" key="media1" />,
                    <InfoBlock
                        title="Built for Success"
                        description="Our CV templates follow real hiring standards used by recruiters and HR managers. Each layout is structured to highlight your strengths and communicate your value clearly."
                        bullets={[
                            "Professional layouts optimized for readability",
                            "Fully ATS-optimized structure",
                            "Clean modern visual style",
                            "Recruiter-approved formatting",
                        ]}
                        image={resolveMedia("image2")}
                        align="center"
                    />
                    ]
                }
                right={[
                    <InfoBlock
                        key="info1"
                        title="Easy to Customize"
                        description="Adjust your CV to match your personal brand in minutes. Every template supports full customization without breaking the structure."
                        bullets={[
                            "Easily editable formats",
                            "Flexible section arrangement",
                            "Customizable fonts & colors",
                            "Compatible with major editors",
                        ]}
                        align="center"
                    />,
                    <VideoDemo video="demo" key="video1" />,
                ]}
            />

            {/* ⭐ VALUES ICONS AS LARGE FEATURE GRID */}
            <ValuesIcons
                title="Enhance Your Application With Extras"
                description="Professional add-ons created to strengthen your CV and make your application stand out from other candidates."
                values={[
                    {
                        icon: "✉️",
                        title: "Cover Letter",
                        text: "A personalized, professionally written letter aligned with your CV.",
                    },
                    {
                        icon: "🔗",
                        title: "LinkedIn Rewrite",
                        text: "Improve your online presence with an optimized LinkedIn summary.",
                    },
                    {
                        icon: "🔍",
                        title: "Keyword Optimization",
                        text: "Match job descriptions with industry-specific keywords.",
                    },
                    {
                        icon: "🧠",
                        title: "Achievements Rewrite",
                        text: "Transform your experience into powerful, measurable achievements.",
                    },
                    {
                        icon: "📊",
                        title: "Skills Gap Analysis",
                        text: "AI-powered insights on missing or in-demand skills.",
                    },
                    {
                        icon: "🧩",
                        title: "ATS Compatibility Report",
                        text: "Scan your CV to check how it performs in tracking systems.",
                    },
                ]}
            />

            {/* ⭐ BONUS VALUES SECTION */}
            <ValuesIcons
                title="Core Benefits of Using Our Templates"
                description="Every template is designed to give you a professional advantage and maximize your chances of getting hired."
                values={[
                    { icon: "🚀", title: "Fast", text: "Generate or download a CV instantly" },
                    { icon: "📑", title: "ATS Safe", text: "Structured to pass automated HR filters" },
                    { icon: "🎨", title: "Beautiful", text: "Clean, modern, and industry-friendly visuals" },
                ]}
            />

            {/* ⭐ FAQ */}
            <FAQ
                items={[
                    {
                        question: "Can I download the CV examples?",
                        answer:
                            "Yes. Each example includes a PDF version with sample data that you can download instantly.",
                    },
                    {
                        question: "Are the templates ATS-friendly?",
                        answer:
                            "Absolutely. All layouts are optimized to meet modern ATS requirements for correct parsing and visibility.",
                    },
                    {
                        question: "Can I customize the CV designs?",
                        answer:
                            "Yes. You can freely edit fonts, colors, sections, and structure without breaking the formatting.",
                    },
                    {
                        question: "What are Extras?",
                        answer:
                            "Extras are additional services such as Cover Letter, LinkedIn Rewrite, ATS Report, Keyword Optimization, and more — all designed to enhance your job application.",
                    },
                ]}
            />
        </>
    );
};

export default Page;
