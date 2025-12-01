import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `About ${COMPANY_NAME} — Our Story, Culture & Vision`,
        description: `${COMPANY_NAME} is an international CV-tech company built to help people present themselves confidently.`,
        canonical: "/about",
    },

    blocks: [
        // 🟣 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: "We Build Tools That Help People Move Forward",
            highlight: COMPANY_NAME,
            description: `${COMPANY_NAME} is a global CV & career-tech company focused on empowering people with beautiful and human-centered tools.`,
            image: "image1",
            mediaType: "image",
            align: "left",
        },

        // 🟦 STRIP
        {
            type: "custom",
            component: "HighlightStrip",
            items: [
                { icon: "🌍", text: "120k+ Users", subtext: "Worldwide" },
                { icon: "💼", text: "50+ Industries", subtext: "From tech to healthcare" },
                { icon: "🧩", text: "Design-Driven", subtext: "Premium CV layouts" },
                { icon: "🤝", text: "Human + AI", subtext: "The future of career tools" },
            ],
        },

        // 🟨 MISSION (заміна media → InfoBlock)
        {
            type: "section",
            title: "Our Mission",
            description: "We help people present their skills with clarity and confidence.",

            left: [
                {
                    type: "custom",
                    component: "InfoBlock",
                    align: "left",
                    title:
                        "A strong CV can open doors — but creating one is often stressful.",
                    bullets: [
                        "Design that elevates your strengths",
                        "Clarity and structure for every profession",
                        "Human-centered tooling enhanced by AI",
                        "Accessible career improvement worldwide",
                    ],
                },
            ],

            right: [
                {
                    type: "custom",
                    component: "InfoBlock",
                    image: "image2",
                    imageHeight: "400px",
                    align: "center",
                },
            ],
        },

        // 🟦 CTA
        {
            type: "custom",
            component: "TextWithButton",
            title: "What Drives Us Today",
            description:
                "We focus on clarity, design excellence, and human storytelling — supported by modern technology.",
            buttonText: "Explore Templates",
            buttonLink: "/templates",
        },

        // 🟧 TIMELINE
        {
            type: "custom",
            component: "Timeline",
            title: "How We Became a Global Career-Tech Company",
            steps: [
                {
                    title: "1. The Insight",
                    description:
                        "We realized millions of people struggled to present themselves professionally, even though they had real talent and experience. This became the foundation of our mission.",
                },
                {
                    title: "2. First Prototype",
                    description:
                        "We built an early CV generator focused on clarity, structure, and clean design. The first users validated the idea instantly.",
                },
                {
                    title: "3. Growth and User Adoption",
                    description:
                        "Within months, thousands of people started using our tool, recommending it across industries — from tech to finance, healthcare, and education.",
                },
                {
                    title: "4. AI Integration",
                    description:
                        "We introduced AI rewriting, skill enhancement, smart suggestions, and role-optimized language. This transformed the product into a fully intelligent career assistant.",
                },
                {
                    title: "5. Expanding the Platform",
                    description:
                        "We shifted from a simple CV generator to a full career-tech ecosystem, adding templates, guidance, analytics, and multi-language capabilities.",
                },
                {
                    title: "6. Becoming a Global Company",
                    description:
                        `${COMPANY_NAME} grew into a remote international team serving users worldwide — united by one mission: helping people tell their story with confidence.`,
                },
            ],
        },


        // 🟩 CULTURE (заміна media → InfoBlock)
        {
            type: "section",
            title: "Our Culture",
            description: "How we think, work, and collaborate.",

            left: [
                {
                    type: "custom",
                    component: "InfoBlock",
                    image: "image3",
                    imageHeight: "360px",
                    align: "center",
                },
            ],

            right: [
                {
                    type: "custom",
                    component: "InfoBlock",
                    align: "left",
                    title:
                        "As a fully remote company, we value autonomy, trust, and deep focus.",
                    bullets: [
                        "Remote-first structure",
                        "Transparent communication",
                        "Design as a foundation",
                        "User-first thinking",
                        "Continuous iteration",
                    ],
                },
            ],
        },

        // 🟧 VALUES (заміна media → InfoBlock)
        {
            type: "section",
            title: "Our Values",
            description: "The principles that shape our decisions and product.",

            left: [
                {
                    type: "custom",
                    component: "ValuesIcons",
                    values: [
                        {
                            icon: "💎",
                            title: "Excellence",
                            text: "Every detail matters — from typography to layout. We strive to exceed expectations and deliver results that stand out."
                        },
                        {
                            icon: "🧠",
                            title: "Clarity",
                            text: "Users should feel confident, not overwhelmed. We eliminate noise and focus on structure that makes your strengths unmistakable."
                        },
                        {
                            icon: "🤝",
                            title: "Empathy",
                            text: "Behind every CV is a real story. Our tools adapt to people, meeting them at any stage of their career journey."
                        },
                        {
                            icon: "🚀",
                            title: "Progress",
                            text: "We build for the long future — continuously improving, innovating, and embracing technologies that help people grow."
                        },
                    ],
                },
            ],


            right: [
                {
                    type: "custom",
                    component: "InfoBlock",
                    image: "image4",
                    imageHeight: "420px",
                    align: "center",
                },
            ],
        },

        // 🟦 TEAM
        {
            type: "custom",
            component: "TeamGrid",
            title: "The People Behind the Platform",
            description: "Designers, engineers, recruiters, problem-solvers.",
            members: [
                { name: "Anna Kovalenko", role: "Head of Product", bio: "Leads UX.", image: "team1" },
                { name: "Dmytro S.", role: "Lead Engineer", bio: "Architects the platform.", image: "team2" },
                { name: "Mia Richardson", role: "Lead Designer", bio: "Creates beautiful templates.", image: "team3" },
                { name: "Mark P.", role: "AI Specialist", bio: "Builds AI rewriting logic.", image: "team4" },

            ],
        },

        // ⭐ TESTIMONIALS
        {
            type: "custom",
            component: "TestimonialsSlider",
            title: "What Our Users Say",
            description: "Real feedback from job seekers who used MakeMyCV to upgrade their resumes and get more interviews.",
            testimonials: [
                {
                    name: "Alexander",
                    role: "Software Engineer",
                    image: "review9",
                    text: "MakeMyCV completely transformed my outdated CV. Recruiters finally started replying — got an interview in 3 days.",
                },
                {
                    name: "John",
                    role: "Business Analyst",
                    image: "review10",
                    text: "The AI-rewritten experience section looks cleaner and more professional than anything I’ve ever done manually.",
                },
                {
                    name: "Olena",
                    role: "UI/UX Designer",
                    image: "review12",
                    text: "The CV design looks premium and modern. HRs even complimented the structure during the interview.",
                },
                {
                    name: "Janet",
                    role: "Project Manager",
                    image: "review13",
                    text: "The generator fixed all my wording issues. Clear, structured, and tailored exactly to my role.",
                },
                {
                    name: "Samuel",
                    role: "QA Engineer",
                    image: "review11",
                    text: "Didn’t expect AI to write such strong bullet points. My CV finally looks senior-level.",
                },
            ],
        },

        // 🟣 FINAL CTA
        {
            type: "custom",
            component: "MissionBanner",
            title: "Let’s Build Your Best CV",
            description: `${COMPANY_NAME} is more than a tool — it's a global career movement.`,
            image: "image5",
            buttonText: "Start Now",
            buttonLink: "/create",
        },
    ],
};

export default schema;
