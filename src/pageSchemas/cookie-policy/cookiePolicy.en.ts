import type { PageSchema } from "@/components/constructor/page-render/types";

// Public policy copy from MakeMyCV_Updated_Policies_2026-10-22.md.
// Internal implementation notes are intentionally excluded.
const cookiePolicyEn: PageSchema = {
    meta: {
        title: "Cookies Policy – MakeMyCV",
        description: "How MakeMyCV uses cookies and similar technologies for authentication, security and necessary transaction functions, and how to control them.",
        keywords: ["MakeMyCV", "cookies policy", "Points", "career documents"],
        canonical: "/cookie-policy",
        ogImage: {
            title: "MakeMyCV – Cookies Policy",
            description: "How MakeMyCV uses cookies and similar technologies for authentication, security and necessary transaction functions, and how to control them.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "custom",
            component: "PolicyContent",
            content: `
<h1>Cookies Policy</h1>
<p>Effective date: 22 October 2026</p>
<h2>1. About this Policy</h2>
<p>This Policy explains cookies and similar technologies used on <a href="https://www.makemy-cv.co.uk/">https://www.makemy-cv.co.uk/</a>, operated by <strong>DOMESTIC DREAMS LIMITED</strong>, company number <strong>15925893</strong>, registered at <strong>11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom</strong>.</p>
<p>Contact <strong><a href="mailto:info@makemy-cv.co.uk">info@makemy-cv.co.uk</a></strong> with questions. Our Privacy Policy explains the wider processing of personal information.</p>
<h2>2. What these technologies do</h2>
<p>Cookies are small pieces of information stored by a website in your browser. Similar technologies include session storage and local storage, which can hold information needed for a website function.</p>
<p>A session cookie usually lasts for a browsing session. A persistent cookie remains until its configured expiry or until deleted. Session storage and local storage can behave differently, and clearing cookies alone may not clear all website data.</p>
<h2>3. Purposes on MakeMyCV</h2>
<p>We use storage and access technologies for functions needed to provide the Service you request, including:</p>
<ul>
<li>recognising an authenticated session and protecting Account access;</li>
<li>preventing request forgery and other security threats;</li>
<li>maintaining necessary state during a Points purchase or service-order process;</li>
<li>supporting secure and reliable delivery of the page or function being used;</li>
<li>carrying out necessary payment authentication and fraud checks when you use payment functions.</li>
</ul>
<p>We do not use cookies, tracking pixels or similar identifiers for advertising, remarketing, cross-site advertising profiles or visitor analytics. Necessary technical error and security records are addressed separately in our Privacy Policy.</p>
<h2>4. Consent</h2>
<p>Technologies that are strictly necessary to provide a requested function may be used without optional cookie consent where the law permits. A technology is not strictly necessary merely because it is convenient for us or our providers.</p>
<p>We do not rely on continued browsing or acceptance of our Terms as consent to non-essential cookies. If we introduce non-exempt purposes in the future, we will update the information provided and obtain any consent required before those technologies operate, with an appropriate way to refuse or withdraw it.</p>
<h2>5. Payment and external services</h2>
<p>Payment providers may use necessary technologies to authenticate a payment and prevent fraud when you use their payment functions. A provider&#x27;s own privacy and cookie information explains processing on its separately operated pages.</p>
<p>An external provider&#x27;s involvement does not automatically make every technology it uses necessary. Non-essential activity on our website remains subject to the applicable consent requirements.</p>
<p>Using a server-side AI service to process a CV is a personal-data processing activity described in our Privacy Policy. It does not, by itself, mean that an AI provider places cookies in your browser.</p>
<h2>6. Duration and controls</h2>
<p>The duration of a storage item depends on its function and configuration. Authentication and transaction state may be limited to a session, while a necessary persistent security or login item may last longer where justified. You can inspect the cookies and storage items present on your device, including available expiry information, through your browser&#x27;s website-data controls. Contact us for details of a particular item or provider.</p>
<p>You can use your browser to delete or block cookies and clear site storage. Doing so may sign you out, interrupt a purchase or prevent an Account function from working. Browser controls do not replace any consent we are legally required to obtain.</p>
<p>Deleting browser storage does not itself delete your Account, saved CVs or payment records. For those requests, email <strong><a href="mailto:info@makemy-cv.co.uk">info@makemy-cv.co.uk</a></strong>.</p>
<h2>7. Updates and contact</h2>
<p>We will update this Policy if our use of these technologies changes. A policy update alone does not authorise new non-essential tracking.</p>
<p><strong>DOMESTIC DREAMS LIMITED</strong><br />Company number: <strong>15925893</strong><br />Registered office: <strong>11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom</strong><br />Email: <strong><a href="mailto:info@makemy-cv.co.uk">info@makemy-cv.co.uk</a></strong><br />Telephone: <strong><a href="tel:+447418638973">+44 7418 638973</a></strong></p>
`,
        },
    ],
};

export default cookiePolicyEn;
