"use client";

import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import { CVOrderType } from "@/backend/types/cv.types";

// ───────────────────────────────────────────────────────────
// 1. Хелпер: розбиття тексту на параграфи
// ───────────────────────────────────────────────────────────
const renderParagraphs = (text?: string, style?: any) =>
    text
        ?.split(/\n{1,2}/)
        .filter((t) => t.trim())
        .map((p, i) => (
            <Text key={i} style={style}>
                {p.trim().replace(/\n/g, " ")}
            </Text>
        ));

// Для більш «жирного» форматування (буліти, **bold**)
const renderRichText = (text: string | undefined, style: any) => {
    if (!text) return null;

    const lines = text.split(/\n{2,}/).filter((l) => l.trim());
    return lines.map((line, i) => {
        if (line.trim().startsWith("- ")) {
            return (
                <View
                    key={i}
                    style={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        marginBottom: 4,
                    }}
                >
                    <Text style={{ marginRight: 6 }}>•</Text>
                    <Text style={[style, { flex: 1 }]}>
                        {line.replace(/^-\s*/, "")}
                    </Text>
                </View>
            );
        }

        const parts = line.split(/(\*\*.*?\*\*)/g).filter(Boolean);
        return (
            <Text key={i} style={[style, { marginBottom: 5, lineHeight: 1.7 }]}>
                {parts.map((p, j) =>
                    p.startsWith("**") && p.endsWith("**") ? (
                        <Text key={j} style={{ fontWeight: "bold" }}>
                            {p.replace(/\*\*/g, "")}
                        </Text>
                    ) : (
                        <Text key={j}>{p}</Text>
                    )
                )}
            </Text>
        );
    });
};

// ───────────────────────────────────────────────────────────
// 2. Витяг секцій з AI-відповіді (response)
//    Якщо не вдається — використовуємо дані з форми
// ───────────────────────────────────────────────────────────
type ParsedSections = {
    summary: string;
    workExperience: string;
    education: string;
    skills: string;
};

function parseResponseSections(o: CVOrderType): ParsedSections {
    const fallback: ParsedSections = {
        summary: o.summary,
        workExperience: o.workExperience,
        education: o.education,
        skills: o.skills,
    };

    if (!o.response) return fallback;

    const text = o.response.replace(/\r\n/g, "\n");
    const lines = text.split("\n");

    type Key = keyof ParsedSections;
    const buffers: Record<Key, string[]> = {
        summary: [],
        workExperience: [],
        education: [],
        skills: [],
    };

    let current: Key | null = null;

    const detectKey = (line: string): Key | null => {
        const upper = line.trim().toUpperCase();

        if (/SUMMARY|PROFESSIONAL SUMMARY|PROFILE/.test(upper)) return "summary";
        if (/EXPERIENCE|WORK EXPERIENCE|PROFESSIONAL EXPERIENCE/.test(upper))
            return "workExperience";
        if (/EDUCATION/.test(upper)) return "education";
        if (/SKILLS|KEY SKILLS|CORE SKILLS/.test(upper)) return "skills";

        return null;
    };

    for (const line of lines) {
        const k = detectKey(line);
        if (k) {
            current = k;
            continue;
        }
        if (current) buffers[current].push(line);
    }

    return {
        summary:
            buffers.summary.join("\n").trim() || fallback.summary || "",
        workExperience:
            buffers.workExperience.join("\n").trim() ||
            fallback.workExperience ||
            "",
        education:
            buffers.education.join("\n").trim() || fallback.education || "",
        skills:
            buffers.skills.join("\n").trim() || fallback.skills || "",
    };
}

// ───────────────────────────────────────────────────────────
// 3. Тема (колір + шрифт) — тільки реальні PDF-шрифти
// ───────────────────────────────────────────────────────────
const getTheme = (o: CVOrderType) => {
    // допустимі назви: "Helvetica", "Times-Roman", "Courier"
    const font =
        o.fontStyle && o.fontStyle !== "Default" ? o.fontStyle : "Helvetica";

    let primary = "#2563EB"; // default blue
    switch (o.themeColor) {
        case "Red":
            primary = "#DC2626";
            break;
        case "Green":
            primary = "#059669";
            break;
        case "Purple":
            primary = "#7C3AED";
            break;
        case "Yellow":
            primary = "#F59E0B";
            break;
        default:
            // "Default" | "Blue"
            primary = "#2563EB";
    }

    const accent =
        primary === "#DC2626"
            ? "#FEE2E2"
            : primary === "#059669"
                ? "#D1FAE5"
                : primary === "#7C3AED"
                    ? "#EDE9FE"
                    : primary === "#F59E0B"
                        ? "#FEF3C7"
                        : "#DBEAFE";

    return {
        primary,
        accent,
        font,
        text: "#111827",
        bg: "#FFFFFF",
    };
};

// ───────────────────────────────────────────────────────────
// 4. Сторінки для extras (coverLetter, linkedin, etc.)
// ───────────────────────────────────────────────────────────
const renderExtrasPages = (o: CVOrderType, theme: ReturnType<typeof getTheme>) => {
    if (!o.extrasData || Object.keys(o.extrasData).length === 0) return null;

    const titles: Record<string, string> = {
        coverLetter: "COVER LETTER",
        linkedin: "LINKEDIN SUMMARY",
        keywords: "KEYWORD OPTIMIZATION",
        atsCheck: "ATS COMPATIBILITY",
        jobAdaptation: "JOB-TAILORED VERSION",
        achievements: "ACHIEVEMENTS BOOST",
        skillsGap: "SKILLS GAP REPORT",
    };

    return Object.entries(o.extrasData).map(([key, raw]) => {
        const title = titles[key] || key.toUpperCase();
        const value = String(raw)
            .replace(/\*\*(.*?)\*\*/g, "$1")
            .replace(/```[a-z]*\n?/g, "")
            .replace(/```/g, "");

        return (
            <Page
                key={key}
                size="A4"
                style={{
                    padding: 50,
                    backgroundColor: theme.bg,
                    fontFamily: theme.font,
                    color: theme.text,
                }}
            >
                <View
                    style={{
                        borderBottom: `3pt solid ${theme.primary}`,
                        marginBottom: 16,
                        paddingBottom: 6,
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 18,
                            color: theme.primary,
                            fontWeight: "bold",
                            letterSpacing: 1,
                        }}
                    >
                        {title}
                    </Text>
                </View>

                {renderParagraphs(value, {
                    fontSize: 11,
                    marginBottom: 8,
                    textAlign: "justify",
                    lineHeight: 1.5,
                })}
            </Page>
        );
    });
};

// ───────────────────────────────────────────────────────────
// 5. CLASSIC CV — строгий, мінімалістичний
// ───────────────────────────────────────────────────────────
export const ClassicCV = (o: CVOrderType) => {
    const theme = getTheme(o);
    const sections = parseResponseSections(o);

    const s = StyleSheet.create({
        page: {
            padding: 35,
            fontFamily: theme.font,
            color: theme.text,
            backgroundColor: theme.bg,
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 18,
            borderBottom: `2pt solid ${theme.primary}`,
            paddingBottom: 10,
        },
        avatar: {
            width: 75,
            height: 75,
            borderRadius: 38,
            border: `2pt solid ${theme.primary}`,
            marginRight: 18,
        },
        h1: {
            fontSize: 24,
            fontWeight: "bold",
            color: theme.primary,
            marginBottom: 4,
        },
        small: {
            fontSize: 11,
            color: "#4B5563",
        },
        h2: {
            fontSize: 14,
            color: theme.primary,
            marginTop: 18,
            marginBottom: 8,
            borderBottom: `1.5pt solid ${theme.primary}`,
            paddingBottom: 4,
            textTransform: "uppercase",
        },
        p: {
            fontSize: 11.5,
            marginBottom: 10,
            textAlign: "justify",
            lineHeight: 1.6,
        },
    });

    return (
        <Document>
            <Page size="A4" style={s.page}>
                <View style={s.header}>
                    {o.photo && <Image src={o.photo} style={s.avatar} />}
                    <View>
                        <Text style={s.h1}>{o.fullName}</Text>
                        <Text style={s.small}>
                            {o.email} • {o.phone}
                        </Text>
                        <Text style={s.small}>
                            {o.industry} • {o.experienceLevel}
                        </Text>
                    </View>
                </View>

                <Text style={s.h2}>Professional Summary</Text>
                {renderParagraphs(sections.summary, s.p)}

                <Text style={s.h2}>Experience</Text>
                {renderParagraphs(sections.workExperience, s.p)}

                <Text style={s.h2}>Education</Text>
                {renderParagraphs(sections.education, s.p)}

                <Text style={s.h2}>Skills</Text>
                {renderParagraphs(sections.skills, s.p)}
            </Page>

            {renderExtrasPages(o, theme)}
        </Document>
    );
};

// ───────────────────────────────────────────────────────────
// 6. MODERN CV — дві колонки, акцент на skills
// ───────────────────────────────────────────────────────────
export const ModernCV = (o: CVOrderType) => {
    const theme = getTheme(o);
    const sections = parseResponseSections(o);

    const s = StyleSheet.create({
        page: {
            padding: 30,
            backgroundColor: theme.bg,
            fontFamily: theme.font,
            color: theme.text,
        },
        layout: {
            flexDirection: "row",
        },
        left: {
            width: "28%",
            backgroundColor: theme.accent,
            padding: 16,
            borderRadius: 10,
        },
        right: { width: "72%", paddingLeft: 25 },
        avatar: {
            width: 95,
            height: 95,
            borderRadius: 48,
            marginBottom: 18,
            border: `3pt solid ${theme.primary}`,
            alignSelf: "center",
        },
        chip: {
            backgroundColor: theme.primary,
            color: "white",
            fontSize: 10,
            padding: 5,
            borderRadius: 4,
            textAlign: "center",
            marginBottom: 12,
        },
        h1: {
            fontSize: 22,
            fontWeight: "bold",
            color: theme.primary,
            marginBottom: 8,
        },
        h2: {
            fontSize: 13,
            marginTop: 18,
            marginBottom: 8,
            color: theme.primary,
            borderBottom: `1.5pt solid ${theme.primary}`,
            paddingBottom: 4,
            textTransform: "uppercase",
        },
        p: {
            fontSize: 11.5,
            marginBottom: 10,
            textAlign: "justify",
            lineHeight: 1.6,
        },
        small: { fontSize: 10.5, marginBottom: 4 },
    });

    return (
        <Document>
            <Page size="A4" style={s.page}>
                <View style={s.layout}>
                    <View style={s.left}>
                        {o.photo && <Image src={o.photo} style={s.avatar} />}

                        <Text style={s.chip}>
                            {o.industry} • {o.experienceLevel}
                        </Text>

                        <Text style={s.small}>{o.email}</Text>
                        <Text style={s.small}>{o.phone}</Text>

                        <Text style={s.h2}>Skills</Text>
                        {renderParagraphs(sections.skills, s.p)}

                        <Text style={s.h2}>Education</Text>
                        {renderParagraphs(sections.education, s.p)}
                    </View>

                    <View style={s.right}>
                        <Text style={s.h1}>{o.fullName}</Text>

                        <Text style={s.h2}>Summary</Text>
                        {renderParagraphs(sections.summary, s.p)}

                        <Text style={s.h2}>Experience</Text>
                        {renderParagraphs(sections.workExperience, s.p)}
                    </View>
                </View>
            </Page>

            {renderExtrasPages(o, theme)}
        </Document>
    );
};

// ───────────────────────────────────────────────────────────
// 7. CREATIVE CV — кольоровий хедер + sidebar
// ───────────────────────────────────────────────────────────
export const CreativeCV = (o: CVOrderType) => {
    const theme = getTheme(o);
    const sections = parseResponseSections(o);

    const s = StyleSheet.create({
        page: {
            fontFamily: theme.font,
            color: theme.text,
            backgroundColor: theme.bg,
            padding: 0,
        },
        header: {
            backgroundColor: theme.primary,
            color: "white",
            padding: 35,
            flexDirection: "row",
            alignItems: "center",
        },
        avatar: {
            width: 100,
            height: 100,
            borderRadius: 50,
            border: "3pt solid white",
            marginRight: 25,
        },
        nameBlock: { flexGrow: 1 },
        name: { fontSize: 26, fontWeight: "bold", color: "white", marginBottom: 4 },
        subtitle: { fontSize: 12, color: "#E5E7EB" },
        contact: { fontSize: 10.5, color: "#F3F4F6", marginTop: 6 },
        content: { flexDirection: "row", padding: 30 },
        sidebar: {
            width: "34%",
            backgroundColor: theme.accent,
            padding: 22,
            borderRadius: 10,
            marginRight: 25,
            minHeight: "90%",
        },
        main: { width: "66%", paddingRight: 15 },
        h2: {
            fontSize: 14,
            color: theme.primary,
            fontWeight: "bold",
            marginBottom: 8,
            textTransform: "uppercase",
            borderBottom: `1.5pt solid ${theme.primary}`,
            paddingBottom: 4,
        },
        p: {
            fontSize: 11.5,
            marginBottom: 10,
            textAlign: "justify",
            lineHeight: 1.7,
        },
        skillTag: {
            backgroundColor: theme.primary,
            color: "white",
            fontSize: 10,
            padding: "5 8",
            borderRadius: 4,
            marginRight: 5,
            marginBottom: 6,
        },
        skillContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 6 },
        block: { marginBottom: 18 },
    });

    const skillsList =
        sections.skills ||
        o.skills ||
        "";

    return (
        <Document>
            <Page size="A4" style={s.page}>
                <View style={s.header}>
                    {o.photo && <Image src={o.photo} style={s.avatar} />}

                    <View style={s.nameBlock}>
                        <Text style={s.name}>{o.fullName}</Text>
                        <Text style={s.subtitle}>
                            {o.industry} • {o.experienceLevel}
                        </Text>
                        <Text style={s.contact}>
                            {o.email} • {o.phone}
                        </Text>
                    </View>
                </View>

                <View style={s.content}>
                    <View style={s.sidebar}>
                        <Text style={s.h2}>Skills</Text>
                        <View style={s.skillContainer}>
                            {skillsList
                                .split(/[,;\n]/)
                                .filter((s) => s.trim())
                                .map((skill, i) => (
                                    <Text key={i} style={s.skillTag}>
                                        {skill.trim()}
                                    </Text>
                                ))}
                        </View>

                        <View style={[s.block, { marginTop: 25 }]}>
                            <Text style={s.h2}>Education</Text>
                            {renderParagraphs(sections.education, s.p)}
                        </View>

                        <View style={s.block}>
                            <Text style={s.h2}>Highlights</Text>
                            <Text style={[s.p, { fontStyle: "italic" }]}>
                                Innovative • Team Player • Fast Learner
                            </Text>
                        </View>
                    </View>

                    <View style={s.main}>
                        <View style={s.block}>
                            <Text style={s.h2}>Summary</Text>
                            {renderParagraphs(sections.summary, s.p)}
                        </View>

                        <View style={s.block}>
                            <Text style={s.h2}>Experience</Text>
                            {renderParagraphs(sections.workExperience, s.p)}
                        </View>
                    </View>
                </View>
            </Page>

            {renderExtrasPages(o, theme)}
        </Document>
    );
};

// ───────────────────────────────────────────────────────────
// 8. MANAGER REVIEWED CV — корпоративний, з нотатками менеджера
// ───────────────────────────────────────────────────────────
export const ManagerReviewedCV = (o: CVOrderType) => {
    const themeColor =
        o.themeColor && o.themeColor !== "Default" ? getTheme(o).primary : "#1E40AF";
    const accent = "#F3F4F6";
    const font =
        o.fontStyle && o.fontStyle !== "Default" ? o.fontStyle : "Helvetica";

    const sections = parseResponseSections(o);
    const languages = (o as any).languages as string | undefined;

    const s = StyleSheet.create({
        page: {
            fontFamily: font,
            color: "#111827",
            backgroundColor: "#FFFFFF",
            fontSize: 11.5,
            lineHeight: 1.6,
            flexDirection: "row",
            border: "1pt solid #E5E7EB",
            borderRadius: 6,
        },
        sidebar: {
            width: "30%",
            backgroundColor: themeColor,
            color: "white",
            padding: 26,
            flexDirection: "column",
        },
        avatar: {
            width: 95,
            height: 95,
            borderRadius: 48,
            border: "2pt solid white",
            alignSelf: "center",
            marginBottom: 20,
        },
        name: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 4 },
        position: {
            fontSize: 10.5,
            textAlign: "center",
            color: "#E0E7FF",
            marginBottom: 18,
            letterSpacing: 0.3,
        },
        sectionLabel: {
            marginTop: 14,
            marginBottom: 6,
            fontSize: 10.5,
            fontWeight: "bold",
            textTransform: "uppercase",
            borderBottom: "1pt solid #FFFFFF55",
            paddingBottom: 4,
        },
        sidebarText: {
            fontSize: 9.5,
            marginBottom: 4,
            color: "#E5E7EB",
            lineHeight: 1.4,
        },
        main: {
            width: "70%",
            padding: 36,
        },
        sectionTitle: {
            fontSize: 14,
            fontWeight: "bold",
            color: themeColor,
            marginTop: 14,
            marginBottom: 8,
            borderBottom: `1.5pt solid ${themeColor}`,
            paddingBottom: 3,
            textTransform: "uppercase",
        },
        paragraph: { fontSize: 11, marginBottom: 6, textAlign: "justify", lineHeight: 1.7 },
        divider: {
            borderBottom: `1.5pt solid ${themeColor}`,
            marginVertical: 12,
            opacity: 0.8,
        },
        footerBox: {
            backgroundColor: accent,
            borderRadius: 14,
            padding: 24,
            marginTop: 24,
            border: `2pt solid ${themeColor}`,
        },
        footerTitle: {
            fontSize: 16,
            fontWeight: "bold",
            color: themeColor,
            textAlign: "center",
            marginBottom: 14,
            letterSpacing: 1.2,
            textTransform: "uppercase",
        },
    });

    const renderSkillsSidebar = (skills: string | undefined) =>
        skills
            ?.split(/[,;\n]/)
            .filter((s) => s.trim())
            .map((skill, i) => (
                <Text key={i} style={s.sidebarText}>
                    • {skill.trim()}
                </Text>
            ));

    return (
        <Document>
            <Page size="A4" style={s.page}>
                <View style={s.sidebar}>
                    {o.photo && <Image src={o.photo} style={s.avatar} />}
                    <Text style={s.name}>{o.fullName}</Text>
                    <Text style={s.position}>
                        {o.industry} • {o.experienceLevel}
                    </Text>

                    <Text style={s.sectionLabel}>Contact</Text>
                    <Text style={s.sidebarText}>{o.email}</Text>
                    <Text style={s.sidebarText}>{o.phone}</Text>

                    <Text style={s.sectionLabel}>Education</Text>
                    <Text style={s.sidebarText}>{sections.education}</Text>

                    <Text style={s.sectionLabel}>Skills</Text>
                    {renderSkillsSidebar(sections.skills || o.skills)}

                    <Text style={s.sectionLabel}>Languages</Text>
                    <Text style={s.sidebarText}>
                        {languages || "English (Fluent)"}
                    </Text>
                </View>

                <View style={s.main}>
                    <Text style={s.sectionTitle}>Professional Summary</Text>
                    {renderRichText(sections.summary, s.paragraph)}

                    <View style={s.divider} />

                    <Text style={s.sectionTitle}>Work Experience</Text>
                    {renderRichText(sections.workExperience, s.paragraph)}

                    <View style={s.divider} />

                    <Text style={s.sectionTitle}>Skills</Text>
                    {renderRichText(sections.skills, s.paragraph)}

                    <View style={s.footerBox}>
                        <Text style={s.footerTitle}>Manager’s Evaluation</Text>
                        <Text
                            style={{
                                fontSize: 12,
                                textAlign: "justify",
                                lineHeight: 1.7,
                                color: "#1F2937",
                            }}
                        >
                            This CV has been professionally reviewed for clarity,
                            structure, and compliance with international HR standards.
                            The achievements were evaluated for measurable impact,
                            presentation quality, and professionalism.
                        </Text>
                    </View>
                </View>
            </Page>

            {renderExtrasPages(o, {
                primary: themeColor,
                accent,
                font,
                text: "#111827",
                bg: "#FFFFFF",
            })}
        </Document>
    );
};
