import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
    COMPANY_LEGAL_NAME,
    COMPANY_NAME,
    COMPANY_NUMBER,
} from "@/resources/constants";

const cookiePolicyEn: PageSchema = {
    meta: {
        title: `Cookies Policy – ${COMPANY_NAME}`,
        description:
            `${COMPANY_NAME} Cookies Policy: how we use cookies, storage, pixels, and SDKs, with full consent rules, categories, and your control options.`,
        keywords: [
            "cookies policy",
            "cookies",
            "GDPR",
            "tracking",
            "privacy",
            "consent",
            "makemycv",
        ],
        canonical: "/cookies-policy",
        ogImage: {
            title: `${COMPANY_NAME} – Cookies Policy`,
            description:
                `Transparent cookies and consent policy for ${COMPANY_NAME}.`,
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Cookies Policy",
            description: "Effective date: 1 September 2025",
        },
        {
            type: "text",
            title: "1. Overview",
            description:
                `This Cookies Policy explains how ${COMPANY_NAME} (“we”, “us”, “our”) uses cookies and similar technologies (including localStorage, sessionStorage, pixels and SDKs) on makemy-cv.co.uk and related services (the “Service”). It complements our Privacy Policy.`,
            bullets: [
                "By interacting with our cookie banner or the preferences centre, you can manage consent to non-essential cookies as described below.",
                `Controller: ${COMPANY_LEGAL_NAME} (Company No. ${COMPANY_NUMBER}), ${COMPANY_ADDRESS}.`,
                `Contact: ${COMPANY_EMAIL}`,
                "Context: The Service provides tools for creating and generating professional CVs/resumes, cover letters and related digital documents (including AI-assisted features) using a token-based system, with payments available via Visa and Mastercard in GBP (£), EUR (€) and USD ($). Cookies support secure sessions, preferences, analytics and—where enabled—marketing/attribution.",
            ],
        },
        {
            type: "text",
            title: "2. What are cookies (and similar technologies)?",
            description:
                "Cookies are small files placed on your device by a website. They help the site to:",
            bullets: [
                "run essential functions (for example, login sessions, CSRF protection);",
                "remember preferences (for example, language, UI choices, currency, last used CV template);",
                "measure performance and reliability; and—where you consent—",
                "enable analytics and marketing/attribution.",
                "Similar technologies (treated in a similar way for consent purposes) include: localStorage/sessionStorage keys, SDK identifiers, tracking pixels and device/browser identifiers.",
            ],
        },
        {
            type: "text",
            title: "3. Categories we use",
            description:
                "We group cookies and similar technologies into the following categories:",
            bullets: [
                "Necessary / Essential – required for core functionality (authentication, security, session management, load balancing, consent logging). These do not require consent.",
                "Functional – remember your choices (for example, language, theme, last viewed wallet/top-up options, last used CV/cover letter settings).",
                "Performance / Analytics – help us understand how the Service is used, where errors occur and how fast pages load so we can improve reliability and usability. Depending on the tool and configuration, we rely either on your consent or, where appropriate, on our legitimate interests with strict privacy safeguards (for example, IP truncation, no cross-site tracking, aggregated reports).",
                "Marketing / Advertising – used only if you enable them; they support campaign attribution, remarketing and measuring the effectiveness of our advertising (for example, determining which campaigns led users to create an account or purchase Tokens).",
                "Security / Anti-abuse – detect unusual activity, mitigate fraud and help protect against bots and automated abuse.",
                "We comply with the UK GDPR and the Privacy and Electronic Communications Regulations (PECR) when placing and reading non-essential cookies.",
            ],
        },
        {
            type: "text",
            title: "4. Typical cookies & storage keys (examples)",
            description:
                "Specific names, providers and lifetimes may change as we update the Service. The current, authoritative list appears in the Cookie Settings panel.",
            bullets: [
                "Name (example) | Purpose | Category | Typical lifetime",
                "session_id | Maintains authenticated session | Necessary | Session",
                "csrf_token | CSRF protection | Necessary | Session",
                "consent_state | Stores your banner/settings choices | Necessary / Functional | 6–12 months",
                "ui_prefs | Language, theme, layout, currency | Functional | ~6 months",
                "perf_metrics | Page performance and error diagnostics | Analytics | 1–3 months",
                "campaign_src | UTM / campaign attribution | Marketing | 1–3 months",
                "mmcv_wallet_hint (localStorage) | Remembers last wallet/top-up view | Functional | Until cleared",
                "mmcv_cv_prefs (localStorage) | Saves last used CV/cover letter options (for example, chosen template or role) | Functional | Until cleared",
                "This table is illustrative only; please refer to the Cookie Settings panel for the most up-to-date information.",
            ],
        },
        {
            type: "text",
            title: "5. Consent and lawful basis",
            bullets: [
                "Essential cookies are strictly necessary for the operation and security of the Service and do not require your consent.",
                "Non-essential cookies (Functional, Analytics, Marketing) are set only after you provide consent via the cookie banner or preferences centre, unless we use a tightly configured, privacy-preserving analytics setup that we rely on our legitimate interests for (for example, no cross-site tracking, truncated IP addresses, aggregated reporting).",
                "Our lawful bases for processing data from cookies and similar technologies may therefore include performance of a contract (to run the Service), consent, and legitimate interests (for example, service improvement, security, fraud prevention). Details are provided in our Privacy Policy.",
            ],
        },
        {
            type: "text",
            title: "6. How we record and retain consent",
            description:
                "When you save your cookie choices, we record:",
            bullets: [
                "the consent categories you selected;",
                "a policy/version reference;",
                "the date and time of your choice;",
                "technical information such as IP address and user-agent (for evidential purposes).",
                "We retain this consent record for at least 24 months and up to 6 years where necessary in case of disputes or regulatory enquiries, in line with our Privacy Policy and applicable data-protection law.",
            ],
        },
        {
            type: "text",
            title: "7. Third parties and international transfers",
            description:
                "We may use third-party providers (for example, for payment processing, analytics, hosting/CDN, email delivery, AI services and marketing/attribution) that set or read cookies or similar identifiers via the Service. Some of these providers may process personal data outside the UK/EEA.",
            bullets: [
                "Where such transfers occur, we implement appropriate safeguards, which may include:",
                "UK adequacy regulations;",
                "UK/EU Standard Contractual Clauses; and",
                "supplementary technical and organisational measures where appropriate.",
                "A current list of third-party providers and the cookies they use is available in the Cookie Settings panel on our site.",
            ],
        },
        {
            type: "text",
            title: "8. Managing or withdrawing consent",
            bullets: [
                "Use the cookie banner when you first visit the site, or the Cookie Settings link in the footer, to accept, decline or customise non-essential cookie categories.",
                "You can withdraw your consent at any time via Cookie Settings; your new choice will apply going forward and will not affect the lawfulness of processing carried out before withdrawal.",
                "You can also clear cookies and site data via your browser settings or use private/incognito mode.",
                "Please note: disabling or blocking certain cookies may affect the functionality of the Service (for example, you may be logged out, your language or currency preferences may not persist, and some CV/cover letter settings may not be remembered between visits).",
            ],
        },
        {
            type: "text",
            title: "9. Do Not Track / Global Privacy Controls",
            description:
                "If your browser sends Global Privacy Control (GPC) or similar signals, we will treat them as an opt-out from non-essential cookies where this is technically feasible and consistent with applicable law. However, technical limitations and differing standards may mean that not all signals can be honoured in all contexts.",
        },
        {
            type: "text",
            title: "10. Changes to this Policy",
            bullets: [
                "We may update this Cookies Policy from time to time (for example, when we add or change integrations, analytics tools or advertising partners). Material changes will be communicated via a prominent notice within the Service and/or by email to registered users.",
                "The Effective date at the top of this Policy will always show the latest version. Changes operate prospectively and do not affect cookie usage prior to the update.",
            ],
        },
        {
            type: "text",
            title: "11. Contact",
            bullets: [
                "Questions about cookies or this Policy can be sent to:",
                `Email: ${COMPANY_EMAIL}`,
                "Postal address:",
                `${COMPANY_LEGAL_NAME}`,
                ...String(COMPANY_ADDRESS).split(", ").map((line) => line.trim()),
            ],
        },
    ],
};

export default cookiePolicyEn;