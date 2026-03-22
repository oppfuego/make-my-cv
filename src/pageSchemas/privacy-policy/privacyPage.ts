import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
    COMPANY_LEGAL_NAME,
    COMPANY_NAME,
    COMPANY_NUMBER,
} from "@/resources/constants";

const privacyPolicySchema: PageSchema = {
    meta: {
        title: `Privacy Policy – ${COMPANY_NAME}`,
        description:
            "We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains what personal data we collect, why we use it, how long we keep it, and how you can exercise your rights when using makemy-cv.co.uk and related services.",
        keywords: [
            "privacy policy",
            "GDPR",
            "data protection",
            "makemycv",
            "personal data",
            "uk gdpr",
        ],
        canonical: "/privacy-policy",
        ogImage: {
            title: `${COMPANY_NAME} – Privacy Policy`,
            description:
                `Privacy Policy for ${COMPANY_NAME}: personal data, retention, transfers, and rights under UK GDPR.`,
            bg: "#ffffff",
            color: "#000000",
        },
    },

    blocks: [
        {
            type: "text",
            title: "Privacy Policy",
            description: "Effective date: 1 September 2025",
        },
        {
            type: "text",
            title: "1. Introduction",
            description:
                "We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains what personal data we collect, why we use it, how long we keep it, and how you can exercise your rights when using makemy-cv.co.uk and related services (the “Service”).",
            bullets: [
                `Controller: ${COMPANY_LEGAL_NAME} (Company No. ${COMPANY_NUMBER}), ${COMPANY_ADDRESS} (“${COMPANY_NAME}”, “we”, “us”, “our”).`,
                `Contact: ${COMPANY_EMAIL}`,
                "Scope & age: This Policy applies to all users of the Service (including business customers and their authorised staff). The Service is intended for individuals aged 18 and over.",
                "By using the Service, you acknowledge that your personal data will be processed in accordance with this Privacy Policy and applicable data protection laws, including the UK GDPR and the Data Protection Act 2018.",
            ],
        },
        {
            type: "text",
            title: "2. Personal data we collect",
            description:
                "We collect only the data we need to operate, secure and improve the Service.",
        },
        {
            type: "text",
            title: "2.1 Data you provide directly",
            bullets: [
                "Account & identity: name (or display name), company name, role, email address, telephone number, preferred language.",
                "Career-document inputs: information contained in the CVs/resumes, cover letters and other documents you upload or enter (including any text, images, tables, metadata or other content that may include personal data), as well as job descriptions you provide, target roles, industries and any options or settings you choose for generation or rewriting.",
                "Access grants (optional): where available, limited access tokens or keys for third-party tools or platforms that you choose to connect for integration, export or diagnostics (for example, cloud storage or productivity tools); you can revoke access at any time.",
                "Billing: billing name and address, VAT details (if applicable) and other information needed for invoicing.",
                "Wallet & Tokens: top-up amounts, chosen currency, token package details, and a history of Token consumption (for example, which services you spent Tokens on, such as Professional CV Creation, AI CV Generator or Cover Letter).",
                "Support & communications: messages and attachments you send to us (including support tickets, feedback forms, surveys or emails).",
                "Special-category data: We do not intentionally seek special-category data (such as health information, political opinions, religious beliefs or biometric data). If you voluntarily include such data in any CV, cover letter, other document or in your communications with us, we will process it only as necessary to provide the requested Service and only on the basis of your explicit consent (see section 3.2). Please avoid including special-category data where it is not strictly necessary.",
            ],
        },
        {
            type: "text",
            title: "2.2 Data collected automatically",
            bullets: [
                "Technical data: IP address, device and browser type, operating system, timezone, language, user agent and session identifiers.",
                "Security telemetry: login attempts, authentication events, rate-limiting and anomaly logs, abuse/fraud signals and similar security-related information.",
                "Usage & diagnostics: page views, clicks, navigation paths, feature usage (for example, which CV/cover letter tools you use), Token top-ups and deductions, task identifiers, error traces and performance metrics.",
            ],
        },
        {
            type: "text",
            title: "2.3 Data from third parties",
            description:
                "Where necessary to provide and secure the Service, we may receive limited personal data from:",
            bullets: [
                "Payment processors: transaction references, status codes, partial card data (e.g. last 4 digits, card type) and fraud-prevention signals. We do not receive or store full card numbers or CVV codes.",
                "Connected platforms: where you authorise integrations, we may receive limited metrics or configuration data from those platforms to enable the Service (for example, to support exports, imports or confirm that a connection works correctly).",
                "Fraud-prevention and verification providers: risk scores, checks and alerts.",
                "Professional advisers and insurers: information necessary for legal, tax, compliance or insurance purposes.",
            ],
        },
        {
            type: "text",
            title: "2.4 User-Generated Content (UGC)",
            description:
                "User-Generated Content (for example, CVs/resumes, cover letters, texts you enter, notes or comments) may contain personal data about you or third parties. You are responsible for ensuring that you have an appropriate lawful basis, notices and permissions to include any third-party personal data in your UGC.",
        },
        {
            type: "text",
            title: "3. Why we process your data & legal bases (UK GDPR)",
            description:
                "We process personal data under the UK GDPR and the Data Protection Act 2018 on the following legal bases:",
        },
        {
            type: "text",
            title: "3.1 Performance of a contract",
            description:
                "To enter into and perform our contract with you, we process personal data to:",
            bullets: [
                "create, maintain and secure your Account;",
                "provide the Service, including generating, rewriting and delivering CVs, cover letters and related Outputs;",
                "operate Wallets and Tokens, process payments and issue invoices/receipts;",
                "communicate with you about your use of the Service, Orders and support requests.",
            ],
        },
        {
            type: "text",
            title: "3.2 Consent (including marketing & special-category data)",
            description:
                "We may rely on your consent to:",
            bullets: [
                "process any special-category data that you voluntarily provide in UGC or communications;",
                "send marketing emails and newsletters where you opt in (for example, tips on improving your CV, new features, promotions);",
                "use your feedback, testimonials or content for marketing or product-improvement purposes where you explicitly agree.",
                "You may withdraw your consent at any time via the settings (where available) or by contacting us (see section 12). Withdrawal does not affect the lawfulness of processing prior to withdrawal.",
            ],
        },
        {
            type: "text",
            title: "3.3 Legitimate interests",
            description:
                "We may process personal data where necessary for our legitimate interests, provided that your interests and fundamental rights do not override those interests. This includes:",
            bullets: [
                "keeping the Service secure (fraud detection, abuse prevention, logging, rate-limiting and incident response);",
                "measuring and improving performance, usability and user experience (using aggregated or pseudonymised analytics where feasible);",
                "sending essential, non-marketing communications (for example, service, security or policy updates);",
                "limited B2B outreach to existing or potential business customers about products or services related to the Service, subject to your right to object at any time (see section 8).",
            ],
        },
        {
            type: "text",
            title: "3.4 Legal obligation",
            description:
                "We may process personal data where necessary to comply with legal obligations, including:",
            bullets: [
                "tax, accounting and corporate record-keeping;",
                "responding to lawful requests from public authorities, courts or regulators;",
                "fulfilling our obligations under applicable consumer protection and data protection laws.",
            ],
        },
        {
            type: "text",
            title: "4. Automated processing, profiling and AI",
            bullets: [
                "The Service uses automated processing and algorithms, including AI, to handle your inputs (for example, generating or rewriting CV and cover letter content, suggesting bullet points, structuring sections or aggregating data for usage statistics).",
                "Limited profiling may be used to tailor aspects of the Service (for example, detecting unusual usage patterns for fraud-prevention or applying usage limits).",
                "We do not make decisions with legal or similarly significant effects solely based on automated decision-making. AI features are designed to assist you by providing suggestions; you remain in control of the final content of your CVs and cover letters.",
                "You may request human review of any decision that you believe has been taken solely by automated means by contacting us.",
            ],
        },
        {
            type: "text",
            title: "5. Sharing and international transfers",
            description:
                "We share personal data only as necessary to operate, secure and improve the Service or to comply with legal obligations. This may include:",
            bullets: [
                "Payment processing: providers that process Visa and Mastercard payments and related anti-fraud measures.",
                "Hosting & IT: secure cloud infrastructure, content delivery networks, storage/backups, monitoring and error-tracking services.",
                "Product & support tooling: analytics platforms (aggregated or pseudonymised where feasible), helpdesk ticketing, email or SMS delivery, customer feedback and A/B testing tools, and where applicable, AI and language-model providers used to power CV/cover letter generation, rewriting and related features.",
                "Professional advisers & insurers: legal, accounting, compliance and insurance providers.",
                "Corporate transactions: if we are involved in a merger, acquisition, financing or sale of all or part of our business, personal data may be transferred as part of that transaction, subject to appropriate safeguards.",
                "Some of our service providers are located outside the UK/EEA. Where personal data is transferred internationally, we implement appropriate safeguards such as:",
                "UK adequacy regulations (where the destination country has been recognised as providing an adequate level of protection);",
                "the UK or EU Standard Contractual Clauses (SCCs); and",
                "additional technical and organisational measures where appropriate.",
                "We do not sell your personal data.",
            ],
        },
        {
            type: "text",
            title: "6. Cookies and similar technologies",
            description:
                "We use cookies and similar technologies (including localStorage and sessionStorage) to:",
            bullets: [
                "run essential functions of the Service (for example, login sessions, security and preferences);",
                "remember your settings (such as language or currency);",
                "measure performance and reliability;",
                "where you consent, enable analytics and, if applicable, marketing or attribution.",
                "Essential cookies are necessary for core functionality and security and cannot be disabled through our consent tools. For more details on the types of cookies we use and how you can manage your preferences, please see our Cookies Policy (linked in the footer of the website).",
            ],
        },
        {
            type: "text",
            title: "7. Retention",
            description:
                "We keep personal data only for as long as necessary for the purposes described in this Policy or as required by law. In particular:",
            bullets: [
                "Career documents & Outputs: we retain CVs, cover letters and related Outputs for a limited period necessary to provide the Service (for example, to allow you to download results, view your history and troubleshoot issues) and then delete or anonymise them, unless you choose to store them for longer within your Account where that functionality is available. Retention periods may vary depending on the feature and will be kept no longer than necessary.",
                "Wallet, Tokens & transactions: at least 24 months and up to 6 years where needed for disputes, tax, accounting or enterprise records.",
                "Account & profile data: for as long as your Account is active and for a reasonable period after closure (typically up to 24 months), unless a longer period is required for legal, security or business continuity reasons.",
                "Logs & security telemetry: typically 6–24 months, depending on the purpose and risk level.",
                "Where feasible, we minimise, pseudonymise or anonymise data as early as possible and then securely delete or irreversibly anonymise it once it is no longer needed.",
            ],
        },
        {
            type: "text",
            title: "8. Your rights",
            description:
                "Subject to certain legal conditions and limitations, you have the following rights regarding your personal data:",
            bullets: [
                "Right of access – to obtain confirmation as to whether we process your personal data and to receive a copy.",
                "Right to rectification – to request correction of inaccurate or incomplete personal data.",
                "Right to erasure (“right to be forgotten”) – to request deletion of your personal data where there is no longer a legal basis for us to retain it.",
                "Right to restriction of processing – to request that we restrict processing in certain circumstances.",
                "Right to data portability – to receive certain personal data in a structured, commonly used and machine-readable format and to transmit it to another controller where technically feasible.",
                "Right to object – to object, on grounds relating to your particular situation, to processing based on our legitimate interests, and to object at any time to processing for direct marketing.",
                "Right to withdraw consent – where processing is based on your consent, you have the right to withdraw that consent at any time (for example, for marketing communications or special-category data).",
                `How to exercise your rights: You can exercise your rights by emailing ${COMPANY_EMAIL} from your Account email address. We may need to request additional information to verify your identity.`,
                "We aim to respond within one month of receiving your request. This period may be extended by up to two further months for complex or numerous requests, in which case we will inform you of the extension and reasons.",
            ],
        },
        {
            type: "text",
            title: "9. Security",
            description:
                "We implement appropriate technical and organisational measures designed to protect personal data against unauthorised access, loss, misuse or alteration. These measures include, where appropriate:",
            bullets: [
                "access controls, role-based permissions and multi-factor authentication for administrative interfaces;",
                "encryption in transit (HTTPS/TLS) and, where appropriate, at rest;",
                "network segregation, firewalls and regular backups;",
                "logging, monitoring and incident-response procedures;",
                "vendor due diligence and contractual obligations for processors.",
                "No system can be guaranteed to be 100% secure, but we continuously improve our controls and will promptly investigate and, where required, notify you and relevant authorities of any personal data breach.",
            ],
        },
        {
            type: "text",
            title: "10. Children’s data",
            description:
                `The Service is intended for users aged 18+. We do not knowingly collect personal data from children. If you believe that a child has provided personal data to us, please contact ${COMPANY_EMAIL} so that we can investigate and, where appropriate, delete the data and close any related Account.`,
        },
        {
            type: "text",
            title: "11. Changes to this Policy",
            bullets: [
                "We may update this Privacy Policy from time to time to reflect changes in the Service, applicable law or our data protection practices.",
                "Material changes will be notified by email (where appropriate) and/or via a prominent notice within the Service. Updated versions will be effective from the date indicated at the top of this Policy and will apply prospectively.",
            ],
        },
        {
            type: "text",
            title: "12. Contact & complaints",
            bullets: [
                "Controller:",
                `${COMPANY_LEGAL_NAME}`,
                ...String(COMPANY_ADDRESS).split(", ").map((line) => line.trim()),
                `Email (privacy): ${COMPANY_EMAIL}`,
                "If you have questions or concerns about how we handle your personal data, please contact us first so we can try to resolve the issue.",
                "If you are not satisfied with our response, you have the right to lodge a complaint with the Information Commissioner’s Office (ICO) in the UK. If you are resident in the EU, you may also have the right to complain to your local supervisory authority.",
            ],
        },
    ],
};

export default privacyPolicySchema;