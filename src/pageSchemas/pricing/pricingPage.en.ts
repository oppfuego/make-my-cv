import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `CV Builder & ATS-Friendly Resume Generator — ${COMPANY_NAME}`,
        description: `Create a professional CV in minutes. AI-powered resume builder, modern templates, instant PDF export and ATS-friendly formatting.`,
        keywords: [
            "CV builder",
            "resume generator",
            "AI CV",
            "create CV online",
            "ATS friendly resume",
            "professional templates",
        ],
        canonical: "/pricing",
    },

    blocks: [
        // 🏁 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: "Create Your Perfect CV",
            highlight: "in Minutes with AI",
            description: `${COMPANY_NAME} helps you build a modern, clean and ATS-friendly CV.  
Choose a template, fill in details, let AI enhance your experience — and export to PDF instantly.`,
            image: "image18",
            align: "right",
            primaryCta: { text: "Start Building CV", link: "/dashboard" },
        },

        // 🎨 PRICING (TOKEN PLANS)
        {
            type: "grid",
            columns: 4,
            gap: "2rem",
            cards: [
                {
                    type: "pricing",
                    variant: "starter",
                    title: "Professional CV Creation",
                    price: "€10",
                    tokens: 1000,
                    badgeTop: "For Serious Applicants",
                    description: "Hand-crafted CV made by a specialist in 24 hours.",
                    features: [
                        "Human-crafted writing",
                        "ATS-friendly formatting",
                        "Modern layout",
                        "Delivered in PDF & DOCX",
                    ],
                    buttonText: "Order Now",
                },
                {
                    type: "pricing",
                    variant: "pro",
                    title: "AI CV Generator",
                    price: "€25",
                    tokens: 2500,
                    badgeTop: "Fast & Affordable",
                    description: "Instant AI-generated CV with rewriting and clean design.",
                    features: [
                        "Instant PDF/DOCX export",
                        "AI bullet rewrite",
                        "Modern design",
                        "Optimized structure",
                    ],
                    buttonText: "Order Now",

                },
                {
                    type: "pricing",
                    variant: "premium",
                    title: "Cover Letter",
                    price: "€50",
                    tokens: 5000,
                    badgeTop: "Most Popular Add-on",
                    description:
                        "A personalised cover letter that improves recruiter response rates.",
                    features: [
                        "Tailored for your role",
                        "ATS-friendly",
                        "Professional tone",
                    ],
                    buttonText: "Order Now",

                },

                // ⭐ CUSTOM PACKAGE — ПОВНІСТЮ ВИГЛЯДАЄ ЯК ДИНАМІЧНИЙ ОПЦІОН
                {
                    type: "pricing",
                    variant: "custom",
                    title: "Custom Package",
                    price: "dynamic",
                    tokens: 0,
                    badgeTop: "Flexible Option",
                    description:
                        "Choose any combination of services and pay only for what you need.",
                    features: [
                        "Mix & match extras",
                        "Flexible pricing",
                        "Perfect for complex CV needs",
                    ],
                    buttonText: "Order Now",

                },
            ],
        },

        // ❓ FAQ
        {
            type: "faq",
            items: [
                {
                    question: "Is my CV ATS-friendly?",
                    answer:
                        "Yes. All templates and AI-generated content follow ATS-safe formatting rules.",
                },
                {
                    question: "Can I edit my CV after exporting?",
                    answer:
                        "Yes, you can return anytime, update the data and generate a new PDF.",
                },
                {
                    question: "Does AI write experience for me?",
                    answer:
                        "AI enhances your bullet points, rewrites them professionally and adds achievements.",
                },
                {
                    question: "How many templates are available?",
                    answer:
                        "You get access to all templates: Classic, Modern, Creative and Minimalist.",
                },
            ],
        },

        // 🚀 CTA (MISSION BANNER)
        {
            type: "custom",
            component: "MissionBanner",
            title: "Build Your Winning CV Today",
            description:
                "Start with AI now — no design skills needed. Create a clean, professional resume and get hired faster.",
            image: "image1",
            buttonText: "Start Building",
            buttonLink: "/create",
        },
    ],
};

export default schema;
