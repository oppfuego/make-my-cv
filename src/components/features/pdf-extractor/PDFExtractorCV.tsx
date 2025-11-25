"use client";

import { pdf } from "@react-pdf/renderer";
import {
    ClassicCV,
    CreativeCV,
    ModernCV,
    ManagerReviewedCV,
} from "@/components/features/cvTemplates/cvTemplates";
import { CVOrderType } from "@/backend/types/cv.types";

// 🧾 Головна функція завантаження PDF
export async function downloadCVPDF(order: CVOrderType) {
    console.log("🧾 [downloadCVPDF] Start for:", order.fullName);
    console.log("📝 Response preview:", order.response?.slice(0, 200));
    console.log("🗂️ Extras data:", order.extrasData);

    // гарантуємо валідний шрифт
    const allowedFonts = ["Helvetica", "Times-Roman", "Courier"];
    if (!allowedFonts.includes(order.fontStyle)) {
        order.fontStyle = "Helvetica";
    }

    let doc;

    if (order.reviewType === "manager") {
        doc = ManagerReviewedCV(order);
    } else {
        switch (order.cvStyle) {
            case "Modern":
                doc = ModernCV(order);
                break;
            case "Creative":
                doc = CreativeCV(order);
                break;
            default:
                doc = ClassicCV(order);
        }
    }

    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cv-${order.cvStyle.toLowerCase()}-${order._id}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
}
