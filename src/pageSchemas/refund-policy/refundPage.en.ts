import { PageSchema } from "@/components/constructor/page-render/types";
import {COMPANY_ADDRESS, COMPANY_PHONE} from "@/resources/constants";

const refundPolicySchema: PageSchema = {
    meta: {
        title: "Refund / Return Policy – MakeMyCV",
        description:
            "Official Refund / Return Policy for MakeMyCV: refunds for tokens, CV services, digital content, and consumer rights.",
        keywords: [
            "refund policy",
            "return policy",
            "makemycv",
            "tokens",
            "CV builder",
            "digital content",
            "consumer rights",
        ],
        canonical: "/refund-policy",
        ogImage: {
            title: "MakeMyCV – Refund / Return Policy",
            description:
                "Transparent refund and return policy for MakeMyCV token purchases and digital document services.",
            bg: "#ffffff",
            color: "#000000",
        },
    },

    blocks: [
        {
            type: "text",
            title: "Refund & Return Policy",
            bullets: [
                "Effective date: 1 September 2025"
            ],
        },

        {
            type: "text",
            title: "1. Summary",
            bullets: [
                "Refund requests are handled under this Policy and applicable UK consumer law.",
                "Typical processing time is 5–10 business days after approval.",
                "Any refund will not exceed the amount originally paid for the relevant Token top-up or paid feature.",
                "Tokens already used for CVs, cover letters or other digital services are non-refundable.",
                "Wallet Credit is linked to your Account only and cannot be transferred or exchanged for cash.",
                "Promotional, bonus or goodwill credits are non-refundable.",
                "The Service provides digital tools and digital career documents only; there are no physical items to return.",
                "To submit a request, email info@makemy-cv.co.uk with your account email, order reference and a description of the issue.",
                "Accepted currencies: GBP (£), EUR (€), USD ($). Payment methods: Visa, Mastercard.",
                "Reference exchange rate for Tokens: 100 Tokens = £1.00 / €1.17 / $1.29."
            ],
        },

        {
            type: "text",
            title: "2. Scope and legal notice",
            bullets: [
                "This Policy explains how cancellations and refunds are handled for purchases made via makemy-cv.co.uk, including Wallet top-ups and paid features.",
                "The Service supplies digital-only tools and outputs such as CVs, resumes, cover letters, LinkedIn text and related documents.",
                "There are no physical goods supplied or accepted under this Policy.",
                "Nothing in this Policy limits your statutory rights under UK law, including the Consumer Contracts Regulations 2013 and the Consumer Rights Act 2015."
            ],
        },

        {
            type: "text",
            title: "3. Key definitions",
            bullets: [
                "Wallet / Wallet Credit – prepaid Token balance in your Account used for paid features.",
                "Tokens – units deducted from your Wallet when you use paid features.",
                "Documents / Outputs – digital documents and related files generated or prepared using your information.",
                "Order / Transaction – a confirmed Wallet top-up or purchase of a paid feature.",
                "Abuse / Fraud – activity that breaches the Terms, such as unauthorised payments or attempts to bypass limits."
            ],
        },

        {
            type: "text",
            title: "4. General refund principles",
            bullets: [
                "Any refund will not exceed the original amount paid for the relevant Order, minus non-recoverable processor fees where legally permitted.",
                "By purchasing Tokens and using them to start a service, you agree that performance may begin immediately and statutory cooling-off rights may no longer apply where allowed by law.",
                "Consumed Tokens are non-returnable and non-refundable.",
                "If your inputs are incorrect, incomplete, outdated or misleading, additional revisions or regenerated versions will consume new Tokens and are not refundable.",
                "Refunds are normally made in the original payment currency and to the original payment method.",
                "We do not control or reimburse FX differences or card-provider fees.",
                "Promotional, bonus or trial credits are non-refundable and may expire under separate promotion terms.",
                "We may refuse refunds and suspend or terminate Accounts where we reasonably suspect fraud, abuse or chargeback abuse."
            ],
        },

        {
            type: "text",
            title: "5. Wallet top-ups (Tokens)",
            bullets: [
                "Wallet top-ups are prepayments for access to digital features of the Service.",
                "Your Wallet is not a bank account, payment account or e-money account.",
                "Unused Token balances are generally not withdrawable and not redeemable for cash.",
                "In exceptional cases such as technical errors or duplicate payments, unused Tokens may be refunded at our reasonable discretion.",
                "If a top-up has been partly used, only the unused portion may be considered for refund, up to the original amount paid for that top-up.",
                "Wallet Credit is personal to your Account and cannot be sold, gifted, exchanged or transferred."
            ],
        },

        {
            type: "text",
            title: "6. Cancellations of paid features",
            bullets: [
                "If no Tokens have been consumed and no work or generation has begun, you may request cancellation and a refund.",
                "Once performance begins, such as AI generation, specialist drafting or Token deduction, cancellation and refunds are generally not available.",
                "Any non-excludable statutory consumer rights still apply."
            ],
        },

        {
            type: "text",
            title: "7. Quality issues and re-runs",
            bullets: [
                "If you believe a Document or Output is materially defective due to a technical issue, contact us within 7 days of generation or delivery.",
                "Please include screenshots, timestamps, file names and error messages where relevant.",
                "If we confirm a technical fault on our side, our primary remedy is to re-run or re-deliver the affected service at no extra Token cost.",
                "If a re-run is not reasonably possible, we may credit your Wallet with an equivalent number of Tokens.",
                "Lack of interviews, offers or third-party acceptance is not by itself a defect in the Service and does not entitle you to a refund."
            ],
        },

        {
            type: "text",
            title: "8. How to request a refund",
            bullets: [
                "Send your request to info@makemy-cv.co.uk.",
                "Include your Account email address and Order / Transaction reference.",
                "Specify whether the request relates to a Wallet top-up or a specific paid feature.",
                "Provide a clear description of the issue and any supporting evidence such as screenshots, timestamps, error messages or bank confirmations.",
                "We will acknowledge receipt within 5 business days.",
                "We may request additional information if needed.",
                "If approved, we will initiate the refund within 5–10 business days, although your bank or provider may take longer."
            ],
        },

        {
            type: "text",
            title: "9. Chargebacks, disputes and investigations",
            bullets: [
                "If you initiate a chargeback or payment dispute, we may treat it as a formal dispute and provide supporting evidence to the payment provider.",
                "We may temporarily suspend or limit your Account while the dispute is being investigated.",
                "If a chargeback results in reversed funds, we may remove equivalent Wallet Credit or Tokens from your Account.",
                "We may also seek recovery of any outstanding amounts lawfully due, including reasonable investigation and administrative costs.",
                "In many cases, contacting support first leads to a faster resolution."
            ],
        },

        {
            type: "text",
            title: "10. Taxes and invoicing",
            bullets: [
                "We issue electronic receipts and/or invoices for Token purchases and paid features.",
                "Applicable VAT or other indirect taxes are displayed where required based on your billing details and our tax obligations.",
                "Where a refund is processed, the refunded amount may be net of taxes we are legally unable to reclaim, unless law requires those taxes to be refunded as well."
            ],
        },

        {
            type: "text",
            title: "11. Record-keeping and data protection",
            bullets: [
                "We keep records relevant to refunds, chargebacks and disputes, including order identifiers, payment data, Token usage, timestamps, device or IP information and error traces.",
                "These records are retained for at least 24 months, and up to 6 years for enterprise clients or disputed transactions.",
                "Personal data is processed under the UK GDPR and the Data Protection Act 2018.",
                "Further details are set out in our Privacy Policy."
            ],
        },

        {
            type: "text",
            title: "12. Illustrative examples",
            bullets: [
                "Immediate performance: if you purchase Tokens and immediately generate CVs or cover letters, used Tokens are not refundable.",
                "Not yet performed: if you purchase a Cover Letter package and cancel before any work starts and before any Tokens are deducted, we may refund the relevant amount.",
                "Technical fault: if a generated file is empty or corrupted due to a system issue, we may re-run the generation or credit equivalent Tokens.",
                "Unused top-up: if you top up your Wallet and never use the Tokens, we may at our discretion refund the unused amount minus non-recoverable processing fees.",
                "No job offer: if you use the Service but do not receive interviews or offers, this alone does not entitle you to a refund."
            ],
        },

        {
            type: "text",
            title: "13. Changes to this Policy",
            bullets: [
                "We may update this Policy from time to time.",
                "Material changes will be communicated by email and/or a prominent notice within the Service.",
                "Changes apply on a forward-looking basis and do not affect refunds already processed or completed Orders unless required by law."
            ],
        },

        {
            type: "text",
            title: "14. Contact details",
            bullets: [
                "MakeMyCV",
                "Operated by DOMESTIC DREAMS LIMITED",
                `${COMPANY_ADDRESS}`,
                "Company number: 15925893",
                "Email (support): info@makemy-cv.co.uk",
                `Tel: ${COMPANY_PHONE}`,
                "Accepted currencies: GBP (£), EUR (€), USD ($)",
                "Payment methods: Visa, Mastercard"
            ],
        },
    ],
};

export default refundPolicySchema;