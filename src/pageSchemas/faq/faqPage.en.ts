import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/resources/constants";

const faqSchema: PageSchema = {
    meta: {
        title: `FAQ — ${COMPANY_NAME} CV Builder`,
        description: `Common questions about ${COMPANY_NAME}: AI-powered CV creation, PDF export, templates, ATS optimisation, rewriting and account access.`,
        keywords: [
            "CV generator FAQ",
            "resume builder help",
            "ATS friendly CV",
            "AI resume maker",
            "online CV editor FAQ",
            "PDF CV export",
        ],
        canonical: "/faq",
        ogImage: {
            title: `${COMPANY_NAME} CV FAQ`,
            description: `Answers to the most common questions about creating CVs with AI, templates, and export tools.`,
            bg: "#0a2540",
            color: "#ffffff",
        },
    },

    blocks: [

        // ❓ FAQ section — повністю під CV Maker
        {
            type: "faq",
            items: [
                {
                    question: `What is ${COMPANY_NAME}?`,
                    answer: `${COMPANY_NAME} is an AI-powered CV and resume generator.  
You can instantly create a professional, ATS-friendly CV using modern templates and automatic AI enhancements.`,
                },
                {
                    question: "Is the CV really ATS-friendly?",
                    answer:
                        "Yes. All templates follow clean layout rules, no tables, no images in text and proper structure recognised by ATS-scanning systems.",
                },
                {
                    question: "Can AI improve my experience and bullet points?",
                    answer:
                        "Yes. AI rewrites your job experience, adds achievements, highlights numbers and metrics, and makes your text more professional.",
                },
                {
                    question: "Can I export my CV to PDF?",
                    answer:
                        "Absolutely. You can export your resume to a high-quality PDF at any moment. All templates support instant export.",
                },
                {
                    question: "Do I need to create an account?",
                    answer:
                        "No. You can start building your CV immediately. Account is only needed to save progress across devices.",
                },
                {
                    question: "Can I edit my CV after generating it?",
                    answer:
                        "Yes, you can make unlimited edits — structure, text, sections, styling — and export as many updated versions as needed.",
                },
                {
                    question: "Are the templates customisable?",
                    answer:
                        "Yes. You can switch fonts, layout blocks, colors, spacing, and download multiple versions.",
                },
                {
                    question: "Do you offer a cover letter generator?",
                    answer:
                        "Yes. Our AI can generate a personalised cover letter tailored to your job role and experience.",
                },
                {
                    question: "Is my data secure?",
                    answer:
                        `Yes. ${COMPANY_NAME} does not share or sell user data. All stored CVs are encrypted and protected.`,
                },
                {
                    question: "How do I contact support?",
                    answer:
                        `You can contact our support team anytime at ${COMPANY_EMAIL} or through the contact form.`,
                },
            ],
        },

        // CTA в кінці
        {
            type: "custom",
            component: "TextWithButton",
            title: "Still Have Questions?",
            description: "Write to us and our team will help you with CV creation or account issues.",
            buttonText: "Write to Us",
            buttonLink: "/contact-us",
        },
    ],
};

export default faqSchema;
