import { PageSchema } from "@/components/constructor/page-render/types";
import {COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_NUMBER, COMPANY_PHONE} from "@/resources/constants";

const termsSchema: PageSchema = {
    meta: {
        title: "Terms and Conditions – MakeMyCV",
        description:
            "Official Terms and Conditions for using makemy-cv.co.uk – tokens, CV services, refunds, liability, and user rights.",
        keywords: [
            "terms and conditions",
            "makemycv",
            "cv builder",
            "resume generator",
            "tokens",
            "refunds",
            "career documents",
        ],
        canonical: "/terms-and-conditions",
        ogImage: {
            title: "MakeMyCV – Terms and Conditions",
            description: "Full Terms and Conditions for the MakeMyCV platform.",
            bg: "#ffffff",
            color: "#000000",
        },
    },

    blocks: [
        {
            type: "text",
            title: "Terms and Conditions",
            bullets: [
                "Effective date: 1 September 2025"
            ],
        },

        {
            type: "text",
            title: "1. Introduction",
            bullets: [
                "These Terms govern your use of makemy-cv.co.uk operated by DOMESTIC DREAMS LIMITED.",
                "By using the Service or purchasing Tokens, you agree to these Terms.",
                "The platform allows creating CVs, cover letters and career documents using a token system.",
                "Services may be AI-generated, human-created, or a combination of both.",
                "We do not guarantee employment outcomes or third-party acceptance."
            ],
        },

        {
            type: "text",
            title: "2. Definitions",
            bullets: [
                "Account – your user profile.",
                "Tokens / Wallet – prepaid credits used for paid features.",
                "Services – all tools including CV generation and rewriting.",
                "Client Content – data you upload.",
                "Documents / Outputs – generated materials.",
                "Third-Party Platforms – external systems like job boards.",
                "Order / Transaction – purchase of Tokens or services."
            ],
        },

        {
            type: "text",
            title: "3. Eligibility & Account",
            bullets: [
                "You must be 18+ or authorized to act on behalf of a company.",
                "You must provide accurate data and keep credentials secure.",
                "You are responsible for all activity under your account.",
                "Report security issues to info@makemy-cv.co.uk."
            ],
        },

        {
            type: "text",
            title: "4. Services & Responsibility",
            bullets: [
                "Documents are generated based on your input.",
                "We do not verify your data accuracy.",
                "You are responsible for correctness and legality of content.",
                "We do not act as your agent or submit applications.",
                "AI outputs may contain errors and must be reviewed."
            ],
        },

        {
            type: "text",
            title: "5. Scope of Services",
            bullets: [
                "Includes CV creation, cover letters, AI rewriting and templates.",
                "Results depend on your input quality.",
                "Revisions may require additional Tokens.",
                "You are responsible for how documents are used.",
                "Service is not intended for permanent storage."
            ],
        },

        {
            type: "text",
            title: "6. Client Content",
            bullets: [
                "You must have rights to all uploaded content.",
                "Content must be lawful and not violate third-party rights.",
                "Do not upload malware or harmful data.",
                "You are responsible for personal data compliance."
            ],
        },

        {
            type: "text",
            title: "7. Acceptable Use",
            bullets: [
                "Do not misuse, hack, scrape or overload the Service.",
                "Do not bypass payments or system limits.",
                "We may restrict access in case of abuse or risk."
            ],
        },

        {
            type: "text",
            title: "8. Tokens & Payments",
            bullets: [
                "Payments via Visa and Mastercard.",
                "Tokens are prepaid and have no monetary value.",
                "Prices are shown at checkout and may change.",
                "Tokens are consumed when features are used.",
                "Consumed Tokens are non-refundable."
            ],
        },

        {
            type: "text",
            title: "9. Refunds & Chargebacks",
            bullets: [
                "Digital services may start immediately after purchase.",
                "Unused Tokens are generally non-refundable.",
                "We may re-credit Tokens in case of technical issues.",
                "Chargebacks may result in account suspension."
            ],
        },

        {
            type: "text",
            title: "10. Intellectual Property",
            bullets: [
                "Platform content belongs to MakeMyCV.",
                "You can use Outputs for personal/business use.",
                "You retain ownership of your data.",
                "We may process your data to operate the Service."
            ],
        },

        {
            type: "text",
            title: "11. Confidentiality",
            bullets: [
                "Both parties must protect confidential information.",
                "Disclosure allowed if required by law."
            ],
        },

        {
            type: "text",
            title: "12. Third-Party Platforms",
            bullets: [
                "We are not responsible for third-party services.",
                "Use them at your own risk."
            ],
        },

        {
            type: "text",
            title: "13. Disclaimers",
            bullets: [
                "Service is provided 'as is'.",
                "We do not guarantee availability or accuracy.",
                "You must review documents before use."
            ],
        },

        {
            type: "text",
            title: "14. Liability",
            bullets: [
                "Liability is limited to amount paid.",
                "We are not responsible for indirect losses."
            ],
        },

        {
            type: "text",
            title: "15. Indemnity",
            bullets: [
                "You agree to cover damages caused by misuse or violations."
            ],
        },

        {
            type: "text",
            title: "16. Data Protection",
            bullets: [
                "We comply with UK GDPR.",
                "Details are in Privacy Policy.",
                "Data may be shared with service providers."
            ],
        },

        {
            type: "text",
            title: "17. Termination",
            bullets: [
                "We may suspend accounts for violations.",
                "Unused Tokens are not refundable.",
                "You may close your account anytime."
            ],
        },

        {
            type: "text",
            title: "18. Changes",
            bullets: [
                "We may update the Service or Terms.",
                "Continued use means acceptance of changes."
            ],
        },

        {
            type: "text",
            title: "19. Governing Law",
            bullets: [
                "Governed by laws of England and Wales.",
                "Courts of England and Wales have jurisdiction."
            ],
        },

        {
            type: "text",
            title: "20. Miscellaneous",
            bullets: [
                "Invalid provisions do not affect the rest.",
                "These Terms are the full agreement."
            ],
        },

        {
            type: "text",
            title: "21. Contact",
            bullets: [
                "MakeMyCV",
                "DOMESTIC DREAMS LIMITED",
                `${COMPANY_ADDRESS}`,
                `Company number: ${COMPANY_NUMBER}`,
                `Email: ${COMPANY_EMAIL}`,
                `Tel: ${COMPANY_PHONE}`
            ],
        },
    ],
};

export default termsSchema;
