import type { PageSchema } from "@/components/constructor/page-render/types";

// Public policy copy from MakeMyCV_Updated_Policies_2026-10-22.md.
// Internal implementation notes are intentionally excluded.
const privacyPolicySchema: PageSchema = {
    meta: {
        title: "Privacy Policy – MakeMyCV",
        description: "How MakeMyCV processes Account information, CV content, AI requests, payments and documents, including retention and your privacy rights.",
        keywords: ["MakeMyCV", "privacy policy", "Points", "career documents"],
        canonical: "/privacy-policy",
        ogImage: {
            title: "MakeMyCV – Privacy Policy",
            description: "How MakeMyCV processes Account information, CV content, AI requests, payments and documents, including retention and your privacy rights.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "custom",
            component: "PolicyContent",
            content: `
<h1>Privacy Policy</h1>
<p>Effective date: 22 October 2026</p>
<h2>1. Who is responsible for your information</h2>
<p>1.1. <strong>DOMESTIC DREAMS LIMITED</strong>, company number <strong>15925893</strong>, with its registered office at <strong>11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom</strong>, is the controller of personal information processed in operating MakeMyCV at <a href="https://www.makemy-cv.co.uk/">https://www.makemy-cv.co.uk/</a>.</p>
<p>1.2. Contact <strong><a href="mailto:info@makemy-cv.co.uk">info@makemy-cv.co.uk</a></strong> about privacy, deletion requests, access requests or concerns. You may also contact us at <strong><a href="tel:+447418638973">+44 7418 638973</a></strong> or by post at the address above.</p>
<p>1.3. This Policy explains processing for Accounts, Points payments, specialist services, AI features, PDF delivery and support. The Service is intended for people aged 18 and over.</p>
<h2>2. Information we process</h2>
<h3>2.1 Account information</h3>
<p>Your email address, login credentials in the form used by our authentication system, name and contact details you provide, Account identifiers and relevant Account settings.</p>
<h3>2.2 CV content and service inputs</h3>
<p>Information you type or upload, such as your name and contact details, employment and education history, qualifications, skills, achievements, professional interests, existing CVs, cover letters, job descriptions, LinkedIn text and instructions. Uploaded documents may also contain photographs, metadata or information about other people.</p>
<h3>2.3 Outputs and order records</h3>
<p>Generated or specialist-prepared documents, reports, PDFs, order references, selected services, Points deductions, processing status and relevant records of delivery or correction.</p>
<h3>2.4 Payments and Points</h3>
<p>Points purchases, balances and usage, billing details, transaction currencies and amounts, payment references, payment status, refunds and dispute records. Payment providers process card information. We do not store your full card number or card security code; we may receive limited transaction details needed to confirm or investigate a payment.</p>
<h3>2.5 Communications</h3>
<p>Messages, attachments and information you provide when contacting us about support, complaints, refunds or privacy rights.</p>
<h3>2.6 Technical and security information</h3>
<p>Information needed to operate and protect the Service, including IP address, browser or device information, authentication events, service errors and relevant transaction or security logs. We do not use this information for advertising profiles or behavioural advertising, and we do not use advertising or visitor-analytics tracking tools on the Service.</p>
<h2>3. Purposes and legal bases</h2>
<p>We use personal information for the following purposes:</p>
<div data-policy-table role="region" aria-label="3. Purposes and legal bases" tabindex="0">
<table>
<thead><tr><th scope="col">Purpose</th><th scope="col">Information involved</th><th scope="col">Principal legal basis</th></tr></thead>
<tbody>
<tr><td>Create and operate your Account</td><td>Account and authentication information</td><td>Performance of our contract with you, or steps you request before entering it</td></tr>
<tr><td>Prepare, generate and deliver your selected services</td><td>CV inputs, uploaded files, instructions, relevant profile information and Outputs</td><td>Performance of our contract with you</td></tr>
<tr><td>Process Points purchases, orders and refunds</td><td>Billing, payment, Points and order information</td><td>Performance of our contract; legal obligation where required for financial records</td></tr>
<tr><td>Answer support requests and correct work</td><td>Communications, relevant inputs, Outputs and order details</td><td>Performance of our contract; legitimate interests in resolving enquiries where no contract applies</td></tr>
<tr><td>Protect Accounts, investigate misuse and maintain technical reliability</td><td>Necessary technical, transaction and security records</td><td>Legitimate interests in preventing fraud and protecting the Service; legal obligation where applicable</td></tr>
<tr><td>Maintain required records and respond to lawful requests</td><td>Relevant financial, complaint and compliance information</td><td>Legal obligation</td></tr>
<tr><td>Establish, exercise or defend legal claims</td><td>Information relevant to the particular claim</td><td>Legitimate interests in resolving disputes and protecting legal rights</td></tr>
</tbody>
</table>
</div>
<p>Our legitimate interests do not automatically override your rights. You may object to processing based on legitimate interests as explained in section 10.</p>
<p>Where a business orders a service for another person, processing that person&#x27;s information requires an appropriate legal basis in its own right; a contract with the business does not automatically make the individual a contracting party. We assess the relevant basis, including legitimate interests where appropriate, and the need to provide privacy information to that person.</p>
<p>We do not treat acceptance of this Policy as blanket consent. Where a particular activity requires consent, it must be obtained for that activity and can be withdrawn without affecting earlier lawful processing.</p>
<h2>4. How AI features process personal information</h2>
<p>4.1. We use <strong>third-party providers of artificial intelligence and language-model processing</strong> to support features such as CV generation and rewriting, cover letters, LinkedIn text, job adaptation, ATS-related analysis, achievement enhancement and skills analysis.</p>
<p>4.2. When an AI feature is used, relevant information from your request is transmitted to an external AI service for processing. This can include the text of uploaded CVs and other documents, your professional history, skills, instructions, job descriptions and the context needed to generate or analyse the requested content. <strong>If those materials contain your name, contact details or other personal information, that information may be included in the processing.</strong> We do not represent that all submissions are anonymised before transmission.</p>
<p>4.3. The provider processes the request and returns generated text or analysis to MakeMyCV so that we can prepare and deliver your Output. Relevant requests and responses may also be processed to investigate a reported error, maintain security or resolve abuse, subject to the applicable purpose and legal basis.</p>
<p>4.4. AI processing involves an external provider even where the final result is shown only in your private dashboard. It is different from making your CV public or sending it to employers. You should nevertheless avoid including unnecessary personal or sensitive information in your inputs.</p>
<p>4.5. Provider-side processing locations, retention and any additional permitted processing depend on the service configuration and applicable contractual arrangements. You may contact us for information about the providers involved in processing your data and the applicable arrangements, including retention and international transfers. We will supply information required by applicable data protection law.</p>
<p>4.6. Using the Service is not, by itself, permission to repurpose your CV for unrelated AI-model training. Any separate use for model development or training would need an appropriate legal basis and any additional information or consent required by law. This Policy does not grant a blanket licence for such a purpose.</p>
<p>4.7. We do not use the Service to make hiring decisions about you. AI Outputs are assistance for preparing documents; employers and recruiters make their own decisions. You remain responsible for reviewing an Output before using it, and you can contact us about an error or concern.</p>
<h2>5. Human specialists and other recipients</h2>
<p>5.1. <strong>Professional CV Creation is performed by a human specialist.</strong> The specialist needs access to the information and instructions relevant to that order to prepare the CV. Necessary access may also be required to correct the work or resolve a support issue. Your documents are not made accessible to other customers.</p>
<p>5.2. In addition to specialists and the AI providers described above, information may be processed by:</p>
<ul>
<li><strong>Hosting, database and infrastructure providers</strong>, which support storage and operation of the website, Account records and documents;</li>
<li><strong>Email and delivery providers</strong>, which transmit PDFs and essential order or Account communications;</li>
<li><strong>Payment and fraud-prevention providers</strong>, which process card payments, refunds and relevant payment checks;</li>
<li><strong>Authorised support personnel and technical providers</strong>, to the extent needed to resolve the issue concerned or maintain security;</li>
<li><strong>Professional advisers, authorities and dispute-handling parties</strong>, where necessary for legal obligations, claims or payment disputes.</li>
</ul>
<p>5.3. We restrict access to what is necessary for the relevant task. A provider acting on our instructions must process information under applicable data protection obligations. A provider that determines its own purposes, for example for certain payment or legal compliance functions, may act as a separate controller for that processing.</p>
<p>5.4. We do not sell your CV or personal information. We do not provide CVs to employers or recruiters as part of the listed services and do not share personal information for third-party advertising.</p>
<p>5.5. If the business is transferred, information needed to continue the Service may form part of the transfer. Any such disclosure remains subject to applicable data protection requirements and the purposes for which the information is held.</p>
<h2>6. International processing</h2>
<p>6.1. External providers may process information outside the United Kingdom and, where relevant, outside the European Economic Area. This can include AI inference, infrastructure or email processing.</p>
<p>6.2. Restricted international transfers require a lawful transfer mechanism. Depending on the destination and applicable law, this may be an adequacy decision or regulation, the UK International Data Transfer Agreement, the UK Addendum to EU Standard Contractual Clauses, or EU Standard Contractual Clauses for a transfer subject to EU GDPR, together with any required assessments and supplementary measures.</p>
<p>6.3. Contact <a href="mailto:info@makemy-cv.co.uk">info@makemy-cv.co.uk</a> to request details of transfers relevant to your information and the applicable safeguards, including how to obtain a copy where required. This section does not suggest that all processing occurs in the UK or that every provider uses the same mechanism.</p>
<h2>7. Sensitive information and information about others</h2>
<p>7.1. We do not ask you to provide health information, political opinions, religious beliefs or other special-category information for ordinary CV preparation. Do not include it unless it is genuinely necessary for the service you request. Do not upload identity documents, financial account credentials or payment-card information as part of a CV brief.</p>
<p>7.2. Uploading sensitive information does not automatically constitute valid explicit consent. If such information is brought to our attention, we will assess whether it is needed and whether a lawful basis and the additional legal condition required for that information exist. We may ask you to remove it, delete it where appropriate or obtain valid additional permission before processing it further.</p>
<p>7.3. If you include another person&#x27;s information, such as a referee&#x27;s contact details, ensure that you are entitled to provide it and that the person has been appropriately informed. Remove details that are unnecessary. This does not remove our own responsibilities when we process that information.</p>
<h2>8. Storage and retention</h2>
<p>8.1. CV inputs, Outputs and related Account records are stored in the systems and databases used to provide the Service. We keep saved documents while they are needed to provide your Account history, document access and related support. We do not promise permanent archiving or retain all categories of information for a single blanket period.</p>
<p>8.2. Retention is determined by the purpose for which the information is still needed, the status of your Account and orders, your deletion requests, legal record-keeping requirements and any ongoing dispute. In particular:</p>
<ul>
<li><strong>Saved CVs, documents and Outputs:</strong> retained as needed for the document-access and support functions of your Account. You may request deletion without necessarily closing the Account;</li>
<li><strong>Account details:</strong> retained as needed to operate the Account, including administration of any remaining paid Points. A non-expiring Points balance does not, by itself, require us to keep all of your CV content;</li>
<li><strong>Payment and financial records:</strong> retained for the period required by applicable accounting, tax and record-keeping law, with limited additional retention where necessary for a specific dispute or claim;</li>
<li><strong>Support and complaint records:</strong> retained as needed to resolve the matter and maintain an appropriate record of its outcome or a related claim;</li>
<li><strong>Technical and security records:</strong> retained for as long as needed to investigate faults, protect Accounts and address identified security risks, rather than for advertising or visitor profiling.</li>
</ul>
<p>8.3. You may request deletion or Account closure at <strong><a href="mailto:info@makemy-cv.co.uk">info@makemy-cv.co.uk</a></strong>. We assess and action valid erasure requests without undue delay and respond within the applicable legal timeframe. We explain if particular records must be retained and restrict their use to the remaining lawful purpose.</p>
<p>8.4. Information in restricted backups may remain until it is overwritten or deleted through the backup cycle. It must not be used for ordinary service purposes after deletion from active systems, and a restoration must not reintroduce information that should remain deleted. Your own downloaded or emailed copies remain under your control.</p>
<p>8.5. Retention by external providers is also relevant. You may ask us about their applicable arrangements and how a deletion request is addressed across the recipients involved in your service.</p>
<h2>9. Cookies and technical security</h2>
<p>9.1. We use cookies and similar technologies for the operation, authentication, security and necessary transaction functions of the Service, as described in our Cookies Policy. We do not use them for advertising, remarketing or visitor analytics.</p>
<p>9.2. We use appropriate technical and organisational measures to protect personal information, including limiting access to the relevant purpose and protecting authenticated Account access. The measures applied depend on the system and processing involved. No online system can be guaranteed completely secure.</p>
<p>9.3. Contact us promptly if you suspect unauthorised access or accidental disclosure. We will investigate and make any notifications required by law.</p>
<h2>10. Your rights</h2>
<p>Depending on the circumstances and applicable law, you may have rights to:</p>
<ul>
<li>access your personal information and obtain a copy;</li>
<li>correct inaccurate or incomplete information;</li>
<li>request erasure;</li>
<li>restrict processing;</li>
<li>receive certain information in a portable format;</li>
<li>object to processing based on legitimate interests;</li>
<li>withdraw consent where consent is the basis for processing;</li>
<li>obtain the protections applicable to relevant solely automated decisions.</li>
</ul>
<p><strong>You may object to processing based on legitimate interests on grounds relating to your particular situation.</strong> You may also object to direct marketing at any time if we ever undertake it; no advertising-tracking or marketing-data use is introduced by this Policy.</p>
<p>Send requests to <strong><a href="mailto:info@makemy-cv.co.uk">info@makemy-cv.co.uk</a></strong>. We may need proportionate information to verify identity or clarify the request. Using the Account email helps, but is not the only means of making a valid request.</p>
<p>We normally respond within one month. Where the law allows additional time because a request is complex or because of the number of requests, we will explain the extension. These rights are subject to applicable conditions; for example, erasure may not extend to financial records we must retain by law.</p>
<h2>11. Children</h2>
<p>The Service is intended for people aged 18 and over. If you believe a child has submitted personal information, contact us so that we can investigate and take appropriate steps, including deleting information or closing an Account where necessary.</p>
<h2>12. Complaints and changes</h2>
<p>12.1. Contact us if you have a concern about personal information. You also have the right to complain to the <strong>Information Commissioner&#x27;s Office</strong> in the UK at <strong><a href="https://ico.org.uk/make-a-complaint/">https://ico.org.uk/make-a-complaint/</a></strong>. Where EU GDPR applies, you may also complain to the competent supervisory authority in the EEA. You do not have to obtain our permission before contacting a regulator.</p>
<p>12.2. We will update this Policy when our processing changes. We will explain material changes through an appropriate notice and provide any additional notice or request for consent required before a new use begins. A change to this Policy does not itself authorise an incompatible new use of existing CV data.</p>
<h2>13. Contact</h2>
<p><strong>DOMESTIC DREAMS LIMITED</strong><br />Company number: <strong>15925893</strong><br />Registered office: <strong>11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom</strong><br />Email: <strong><a href="mailto:info@makemy-cv.co.uk">info@makemy-cv.co.uk</a></strong><br />Telephone: <strong><a href="tel:+447418638973">+44 7418 638973</a></strong></p>
`,
        },
    ],
};

export default privacyPolicySchema;
