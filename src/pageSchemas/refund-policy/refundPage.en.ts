import type { PageSchema } from "@/components/constructor/page-render/types";

// Public policy copy from MakeMyCV_Updated_Policies_2026-10-22.md.
// Internal implementation notes are intentionally excluded.
const refundPolicySchema: PageSchema = {
    meta: {
        title: "Refund Policy – MakeMyCV",
        description: "How to request refunds of unused paid Points, cancel eligible orders and obtain free corrections for MakeMyCV service errors.",
        keywords: ["MakeMyCV", "refund policy", "Points", "career documents"],
        canonical: "/refund-policy",
        ogImage: {
            title: "MakeMyCV – Refund Policy",
            description: "How to request refunds of unused paid Points, cancel eligible orders and obtain free corrections for MakeMyCV service errors.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "custom",
            component: "PolicyContent",
            content: `
<h1>Refund Policy</h1>
<p>Effective date: 22 October 2026</p>
<h2>1. Scope</h2>
<p>1.1. This Policy applies to Points purchases and services ordered through MakeMyCV, operated by <strong>DOMESTIC DREAMS LIMITED</strong>, company number <strong>15925893</strong>, registered at <strong>11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom</strong>.</p>
<p>1.2. We provide digital career-document services. Completed documents and reports are supplied as PDFs by email and through the Account dashboard. There are no physical goods to return.</p>
<p>1.3. All paid services are ordered using Points, which are deducted when the service starts. We distinguish between a refund of unused paid Points, cancellation of a service order and a remedy for defective or undelivered work.</p>
<p>1.4. This Policy supplements your statutory rights. No provision makes a mandatory refund discretionary or substitutes Points for a money refund that you are legally entitled to receive.</p>
<h2>2. Refunds of unused paid Points</h2>
<p>2.1. <strong>You may request a refund of unused paid Points by emailing <a href="mailto:info@makemy-cv.co.uk">info@makemy-cv.co.uk</a>.</strong> This includes the unused paid portion of a partly used Points purchase. Purchased Points do not expire, and we do not impose a general expiry deadline on this commercial refund facility.</p>
<p>2.2. The amount is based on what you actually paid for the unused paid Points attributable to the relevant purchase, including any applicable purchase discount. It is not based on a later Points price or exchange rate. The refunded Points will be removed from your balance.</p>
<p>2.3. Where more than one purchase is involved, we identify the relevant original transactions from your payment and usage records. Each portion is refunded against its original payment. We will explain the calculation if you ask.</p>
<p>2.4. Separately identified free, promotional or goodwill Points have no refundable purchase price. A genuine refund of paid Points will not be refused simply because the same package or Account also contained free Points.</p>
<p>2.5. Points already used for an order are not part of the unused balance. However, a statutory cancellation, an incorrect deduction or a remedy for a service issue may entitle you to a separate adjustment or refund under the following sections.</p>
<p>2.6. You may request a refund while keeping your Account open or as part of Account closure. If we stop operating the Service, we will provide a means to claim the remaining unused paid balance.</p>
<h2>3. Service cancellation and consumer rights</h2>
<p>3.1. Once a service has started, we do not offer voluntary change-of-mind cancellation of that order. This is subject to statutory cancellation rights and rights arising from non-performance, defects or other breaches.</p>
<p>3.2. Where the UK statutory cooling-off rules apply, a consumer normally has 14 days after the day the relevant contract is entered into to notify us of cancellation. Your order records distinguish the Points purchase from an individual service order. Applicable rights depend on the contract concerned and its legal classification; describing the payment as Points does not remove those rights.</p>
<p>3.3. For digital content supplied during that period, the cancellation right is lost only where supply begins after the required prior express consent and acknowledgement, and the required confirmation is provided. Merely buying or spending Points does not establish this waiver.</p>
<p>3.4. For services supplied during that period, the cancellation right is lost on full performance only if the applicable early-performance request and acknowledgement requirements have been met. Where a valid early-start request permits a proportionate charge on cancellation, we will explain it; we will not automatically retain the full order price merely because work has started.</p>
<p>3.5. If the required early-supply conditions have not been met, we will not rely on an automatic loss of cancellation rights or impose a charge prohibited by the applicable rules. Any longer cancellation period required because mandatory information was not supplied also remains available.</p>
<p>3.6. To exercise an applicable cancellation right, send us a clear statement identifying the relevant purchase or order and saying that you wish to cancel. Email is the usual contact route, but use of a particular form is not compulsory and other legally valid notices remain effective.</p>
<h2>4. Missing results, errors and free corrections</h2>
<p>4.1. Contact us if an Output is missing, empty, corrupted, inaccessible or materially inconsistent with the agreed service or your supplied brief. The same applies to a duplicate or incorrect Points deduction and an order not delivered within an agreed timeframe.</p>
<p>4.2. <strong>We will correct our own errors, repeat the affected work or re-deliver the file free of charge.</strong> No additional Points are required for this corrective work. Corrections must be completed within a reasonable time and, where consumer law requires, without significant inconvenience to you.</p>
<p>4.3. Free correction covers defects in the service as ordered. A new vacancy, a different brief or new background information may require a separate order, but we will explain and obtain your confirmation before using additional Points.</p>
<p>4.4. A style preference or disappointment with a hiring outcome is not automatically a service defect. We will nevertheless assess whether the result matches the promised service, follows your instructions and was prepared with reasonable care and skill.</p>
<p>4.5. Free correction is our first remedy, not an exclusion of statutory remedies. If correction is impossible, is not completed within the legally required time or otherwise does not resolve a matter for which the law provides a further remedy, we will provide the appropriate price reduction or refund. We will not force you to accept more Points instead of a money refund to which you are entitled.</p>
<p>4.6. Report issues as soon as reasonably possible so that we can investigate. We do not impose a seven-day reporting limit that extinguishes your statutory rights.</p>
<h2>5. How to request help or a refund</h2>
<p>Email <strong><a href="mailto:info@makemy-cv.co.uk">info@makemy-cv.co.uk</a></strong> and provide:</p>
<ul>
<li>the email address used for your Account;</li>
<li>the payment or order reference, if available;</li>
<li>whether the request concerns unused Points, cancellation or a service problem;</li>
<li>a brief explanation and relevant supporting information, if needed.</li>
</ul>
<p>Do not send full card numbers, card security codes or unnecessary identity documents. We may ask for proportionate information to identify the payment, verify the request and prevent payment being returned to the wrong person. A missing order reference does not automatically invalidate an otherwise identifiable request.</p>
<p>We aim to acknowledge requests within five working days and resolve them promptly. If further investigation is necessary, we will explain what is needed. These service targets do not extend a statutory deadline.</p>
<h2>6. Payment method, currency and timing</h2>
<p>6.1. Refunds of purchased Points and money refunds for services are made to the <strong>original payment method</strong>, in the <strong>original transaction currency</strong>. We do not use the exchange rate prevailing on the refund date to reprice the original purchase.</p>
<p>6.2. For our commercial unused-Points refund facility, we aim to initiate payment within five working days after verifying the refundable amount, and in any event without undue delay. For statutory cancellation refunds, we comply with the applicable 14-day deadline measured from notice of cancellation. For statutory price-reduction refunds, we comply with the applicable 14-day deadline from agreement that the refund is due.</p>
<p>6.3. Your card issuer may need additional time to display a refund after we initiate it. We will provide available refund confirmation if you need to trace it.</p>
<p>6.4. We do not deduct a refund administration fee or our original card-processing fee from refunds under this Policy. Any independent exchange-rate difference or fee applied by your card issuer is outside our control and does not reduce the original-currency amount we refund.</p>
<p>6.5. If a refund to the original method cannot be completed, we will contact you to agree a lawful and verifiable alternative. We do not require you to accept a different refund method without your agreement.</p>
<p>6.6. Where a transaction has already been refunded or reversed through a card dispute, we account for that reversal to prevent duplicate reimbursement. We do not recover the same amount twice.</p>
<h2>7. Suspected misuse and payment disputes</h2>
<p>7.1. We may verify a request where there is a reasonable concern about an unauthorised payment, duplicate claim or misuse. We will not use a general suspicion or an open investigation to deny mandatory rights without a lawful basis.</p>
<p>7.2. You may contact your card issuer or use another available dispute procedure. Contacting us first may help resolve the issue, but it is not a condition that removes a legal right to dispute a payment.</p>
<p>7.3. Relevant payment, delivery and usage records may be supplied to payment providers to investigate a dispute, as explained in our Privacy Policy.</p>
<h2>8. Contact</h2>
<p><strong>DOMESTIC DREAMS LIMITED</strong><br />Company number: <strong>15925893</strong><br />Registered office: <strong>11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom</strong><br />Email: <strong><a href="mailto:info@makemy-cv.co.uk">info@makemy-cv.co.uk</a></strong><br />Telephone: <strong><a href="tel:+447418638973">+44 7418 638973</a></strong></p>
`,
        },
    ],
};

export default refundPolicySchema;
