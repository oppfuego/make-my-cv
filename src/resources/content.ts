import {media} from "@/resources/media";
import {FaTwitter, FaFacebook, FaLinkedin} from "react-icons/fa";
import {COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_LEGAL_NAME, COMPANY_NUMBER, COMPANY_PHONE} from "@/resources/constants";

export const baseURL =
    typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

export const headerContent = {
    logo: {
        src: media.logo.src,
        alt: "Site Logo",
        href: "/"
    },
    links: [
        {label: "About Us", href: "/about-us"},
        {label: "Plans", href: "/pricing"},
        {label: "How It Works", href: "/get-started"},
        {label: "Faq", href: "/faq"},
        {label: "Contact Us", href: "/contact-us"},
        {label: "Templates", href: "/templates"},
    ]
};

export const footerContent = {
    logo: {src: media.logo.src, alt: "Site Logo", href: "/"},
    columns: [
        {
            title: "Navigate",
            links: [
                {label: "About Us", href: "/about-us"},
                {label: "Plans", href: "/pricing"},
                {label: "Contact Us", href: "/contact-us"},
                {label: "Faq", href: "/faq"},

            ]
        },
        {
            title: "Services",
            links: [
                {label: "Technical Website Audit", href: "/cases/audit"},
                {label: "On-Page SEO", href: "/cases/on-page"},
                {label: "Off-Page SEO", href: "/cases/off-page"},
                {label: "Local SEO", href: "/cases/local"},
                {label: "SEO Copywriting", href: "/cases/copywriting"},
                {label: "Competitor Analysis", href: "/cases/analysis"},
            ]
        },
        {
            title: "Legal",
            links: [
                {label: "Terms & Conditions", href: "/terms-and-conditions"},
                {label: "Cookie Policy", href: "/cookie-policy"},
                {label: "Refund Policy", href: "/refund-policy"},
                {label: "Privacy Policy", href: "/privacy-policy"},
            ],
        },
    ],
    contact: {
        email: COMPANY_EMAIL,
        phone: COMPANY_PHONE,
        address: COMPANY_ADDRESS,
    },

    legal: {
        companyName: COMPANY_LEGAL_NAME,
        companyNumber: COMPANY_NUMBER,
        address: COMPANY_ADDRESS,
        email: COMPANY_EMAIL,
        phone: COMPANY_PHONE,
    },
    socials: [],
};

