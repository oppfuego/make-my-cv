"use client";

import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import { CVOrderType } from "@/backend/types/cv.types";

// ───────────────────────────────────────────────────────────
// 0. ХЕЛПЕР ОЧИЩЕННЯ ПЛЕЙСХОЛДЕРІВ
// ───────────────────────────────────────────────────────────

const sanitizeText = (raw?: string): string => {
    if (!raw) return "";

    let text = raw.replace(/```[\s\S]*?```/g, "");

    const placeholderLines = [
        /^[-–—]{2,}\s*$/,
        /^\*\*?\s*$/,
        /^EXPERTISE\s*$/i,
        /^LANGUAGE\s*$/i,
        /^SKILLS\s*$/i,
        /^—+$/i,
        /^-+$/i,
        /^\u2022?\s*-{2,}\s*$/,
        /^\*\*?References available upon request\.?\*\*?$/i,
        /^References available upon request\.?$/i,
    ];

    const lines = text.split("\n");

    const cleaned = lines
        .map((line) => line.replace(/\s*---\s*/g, " "))
        .map((line) => line.replace(/^\s*•\s*$/, ""))
        .filter((line) => {
            const t = line.trim();
            if (!t) return false;
            if (placeholderLines.some((re) => re.test(t))) return false;
            return true;
        });

    return cleaned.join("\n").trim();
};


// ───────────────────────────────────────────────────────────
// 1. Хелпери: параграфи / rich text
// ───────────────────────────────────────────────────────────

const renderParagraphs = (raw?: string, style?: any) => {
    const text = sanitizeText(raw);
    if (!text) return null;

    return text
        .split(/\n{1,2}/)
        .filter((t) => t.trim())
        .map((p, i) => (
            <Text key={i} style={style}>
                {p.trim().replace(/\n/g, " ")}
            </Text>
        ));
};

// підтримка "- " булітів + **bold**
const renderRichText = (raw: string | undefined, style: any) => {
    const text = sanitizeText(raw);
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
                    <Text style={[style, { flex: 1 }]}>{line.replace(/^-\s*/, "")}</Text>
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
// 2. Парсинг секцій з AI-відповіді
// ───────────────────────────────────────────────────────────

type ParsedSections = {
    summary: string;
    workExperience: string;
    education: string;
    skills: string;
};

function parseResponseSections(o: CVOrderType): ParsedSections {
    const fallback: ParsedSections = {
        summary: sanitizeText(o.summary),
        workExperience: sanitizeText(o.workExperience),
        education: sanitizeText(o.education),
        skills: sanitizeText(o.skills),
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
            sanitizeText(buffers.summary.join("\n")) ||
            fallback.summary ||
            "",
        workExperience:
            sanitizeText(buffers.workExperience.join("\n")) ||
            fallback.workExperience ||
            "",
        education:
            sanitizeText(buffers.education.join("\n")) ||
            fallback.education ||
            "",
        skills:
            sanitizeText(buffers.skills.join("\n")) ||
            fallback.skills ||
            "",
    };
}

// ───────────────────────────────────────────────────────────
// 3. Тема (кольори + шрифт)
// ───────────────────────────────────────────────────────────

const getTheme = (o: CVOrderType) => {
    const font = o.fontStyle && o.fontStyle !== "Default" ? o.fontStyle : "Helvetica";

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
// 4. Додаткові сторінки (cover letter, keywords, …)
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
        const value = sanitizeText(
            String(raw)
                .replace(/\*\*(.*?)\*\*/g, "$1")
                .replace(/```[a-z]*\n?/g, "")
                .replace(/```/g, "")
        );

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
// 5. CLASSIC CV — референс 1 (EnhanCV style)
// ───────────────────────────────────────────────────────────

export const ClassicCV = (o: CVOrderType) => {
    const theme = getTheme(o);
    const sections = parseResponseSections(o);

    const s = StyleSheet.create({
        page: {
            paddingTop: 40,
            paddingBottom: 40,
            paddingHorizontal: 50,
            fontFamily: theme.font,
            color: theme.text,
            backgroundColor: theme.bg,
            fontSize: 11.5,
            lineHeight: 1.6,
        },
        topHeader: {
            alignItems: "center",
            marginBottom: 22,
        },
        name: {
            fontSize: 22,
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 6,  // готовий відступ
        },
        role: {
            fontSize: 12,
            color: theme.primary,
            marginTop: 4,
        },
        contactLine: {
            fontSize: 10,
            color: "#4B5563",
            marginTop: 6,
        },
        sectionWrapper: {
            marginTop: 16,
            marginBottom: 4,
        },
        sectionTitle: {
            fontSize: 12,
            fontWeight: "bold",
            textAlign: "center",
            textTransform: "uppercase",
            marginBottom: 3,
        },
        sectionDivider: {
            borderBottom: "1pt solid #9CA3AF",
            marginHorizontal: 80,
            marginBottom: 6,
        },
        paragraph: {
            fontSize: 11.5,
            marginBottom: 6,
            textAlign: "justify",
            lineHeight: 1.7,
        },
    });

    // === ФІКС 1: Skills без дубляжу ===
    const skillsText = sanitizeText(sections.skills || o.skills || "");
    const skillsLines = skillsText
        .split(/[,;\n]/)
        .map((s) => s.trim())
        .filter(Boolean);

    const renderSkills = () =>
        skillsLines.map((sk, i) => (
            <Text key={i} style={s.paragraph}>
                • {sk}
            </Text>
        ));

    return (
        <Document>
            <Page size="A4" style={s.page}>
                {/* HEADER */}
                <View style={s.topHeader}>
                    <Text style={s.name}>{o.fullName}</Text>

                    <Text style={s.role}>
                        {o.industry || "Specialist"} • {o.experienceLevel || "Professional"}
                    </Text>

                    <Text style={s.contactLine}>
                        {o.email} • {o.phone}
                    </Text>
                </View>

                {/* SUMMARY */}
                <View style={s.sectionWrapper}>
                    <Text style={s.sectionTitle}>Summary</Text>
                    <View style={s.sectionDivider} />
                </View>
                {renderRichText(sections.summary, s.paragraph)}

                {/* EXPERIENCE */}
                <View style={s.sectionWrapper}>
                    <Text style={s.sectionTitle}>Experience</Text>
                    <View style={s.sectionDivider} />
                </View>
                {renderRichText(sections.workExperience, s.paragraph)}

                {/* EDUCATION */}
                <View style={s.sectionWrapper}>
                    <Text style={s.sectionTitle}>Education</Text>
                    <View style={s.sectionDivider} />
                </View>
                {renderRichText(sections.education, s.paragraph)}

                {/* SKILLS */}
                <View style={s.sectionWrapper}>
                    <Text style={s.sectionTitle}>Skills</Text>
                    <View style={s.sectionDivider} />
                </View>
                {renderSkills()}
            </Page>

            {renderExtrasPages(o, theme)}
        </Document>
    );
};

// ───────────────────────────────────────────────────────────
// 6. MODERN CV — референс 2 (dark sidebar + "градієнт")
// ───────────────────────────────────────────────────────────

export const ModernCV = (o: CVOrderType) => {
    const theme = getTheme(o);
    const sections = parseResponseSections(o);

    // палітра для «градієнта» сайдбару
    let sidebarMain = "#0F172A";
    let sidebarAccent = "#1F2937";

    switch (o.themeColor) {
        case "Red":
            sidebarMain = "#111827";
            sidebarAccent = "#7F1D1D";
            break;
        case "Green":
            sidebarMain = "#022C22";
            sidebarAccent = "#047857";
            break;
        case "Purple":
            sidebarMain = "#111827";
            sidebarAccent = "#4C1D95";
            break;
        case "Yellow":
            sidebarMain = "#78350F";
            sidebarAccent = "#F59E0B";
            break;
        default:
            sidebarMain = "#0F172A";
            sidebarAccent = "#1D4ED8";
    }

    const s = StyleSheet.create({
        page: {
            padding: 0,
            backgroundColor: "#F9FAFB",
            fontFamily: theme.font,
            color: theme.text,
            fontSize: 11.5,
        },
        layout: {
            flexDirection: "row",
            height: "100%",
        },
        left: {
            width: "30%",
            backgroundColor: sidebarMain,
            backgroundImage: `linear-gradient(to bottom, ${sidebarMain}, ${sidebarAccent})`,
            color: "white",
            paddingVertical: 30,
            paddingHorizontal: 24,
            justifyContent: "flex-start",
        },
        right: {
            width: "70%",
            paddingVertical: 32,
            paddingHorizontal: 36,
            backgroundColor: "#FFFFFF",
        },
        avatar: {
            width: 100,
            height: 100,
            borderRadius: 50,
            border: "3pt solid white",
            marginBottom: 18,
            alignSelf: "center",
            objectFit: "cover",
            objectPosition: "center center",
        },
        leftTitle: {
            fontSize: 11,
            fontWeight: "bold",
            textTransform: "uppercase",
            marginTop: 18,
            marginBottom: 6,
            borderBottom: "1pt solid #4B5563",
            paddingBottom: 4,
        },
        leftText: {
            fontSize: 10,
            color: "#E5E7EB",
            marginBottom: 4,
            lineHeight: 1.4,
        },
        name: {
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 2,
        },
        position: {
            fontSize: 12,
            color: theme.primary,
            marginBottom: 10,
        },
        summary: {
            fontSize: 11.5,
            marginBottom: 10,
            lineHeight: 1.7,
            textAlign: "justify",
        },
        sectionHeader: {
            fontSize: 12,
            fontWeight: "bold",
            textTransform: "uppercase",
            marginTop: 18,
            marginBottom: 6,
            borderBottom: "1pt solid #E5E7EB",
            paddingBottom: 4,
        },
        timelineRow: {
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 10,
        },
        timelineDot: {
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: theme.primary,
            marginTop: 4,
            marginRight: 8,
        },
        timelineLine: {
            position: "absolute",
            left: 3.5,
            top: 12,
            bottom: -4,
            width: 1.5,
            backgroundColor: "#E5E7EB",
        },
        timelineContent: {
            flex: 1,
        },
    });

    const skillsText = sanitizeText(sections.skills || o.skills || "");
    const skillsLines = skillsText
        .split(/[,;\n]/)
        .map(s => s.trim())
        .filter(Boolean);
    const languages = (o as any).languages as string | undefined;

    return (
        <Document>
            <Page size="A4" style={s.page}>
                <View style={s.layout}>
                    {/* LEFT SIDEBAR */}
                    <View style={s.left}>
                        <View style={s.leftOverlay} />
                        <View style={s.leftContent}>
                            {o.photo && <Image src={o.photo} style={s.avatar} />}

                            <Text style={s.leftTitle}>Contact</Text>
                            <Text style={s.leftText}>{o.phone}</Text>
                            <Text style={s.leftText}>{o.email}</Text>

                            <Text style={s.leftTitle}>Education</Text>
                            {renderParagraphs(sections.education, s.leftText)}

                            <Text style={s.leftTitle}>Expertise</Text>
                            {skillsLines.map((sk, i) => (
                                <Text key={i} style={s.leftText}>
                                    • {sk}
                                </Text>
                            ))}

                            <Text style={s.leftTitle}>Language</Text>
                            <Text style={s.leftText}>{languages || "English"}</Text>
                        </View>
                    </View>

                    {/* RIGHT CONTENT */}
                    <View style={s.right}>
                        <Text style={s.name}>{o.fullName}</Text>
                        <Text style={s.position}>
                            {o.industry || "Professional"} • {o.experienceLevel || "Level"}
                        </Text>

                        <Text style={s.sectionHeader}>Summary</Text>
                        {renderRichText(sections.summary, s.summary)}

                        <Text style={s.sectionHeader}>Experience</Text>

                        {/* робимо зі всього досвіду “таймлайн” блоки */}
                        <View>
                            <View style={s.timelineLine} />
                            {renderParagraphs(sections.workExperience, s.summary)?.map(
                                (node: any, index: number) => (
                                    <View key={index} style={s.timelineRow}>
                                        <View style={s.timelineDot} />
                                        <View style={s.timelineContent}>{node}</View>
                                    </View>
                                )
                            )}
                        </View>
                    </View>
                </View>
            </Page>

            {renderExtrasPages(o, theme)}
        </Document>
    );
};

// ───────────────────────────────────────────────────────────
// 7. CREATIVE CV — референс 3 (beige + rounded)
// ───────────────────────────────────────────────────────────

export const CreativeCV = (o: CVOrderType) => {
    const baseTheme = getTheme(o);
    const sections = parseResponseSections(o);

    const bg = "#FBF5EE";
    const card = "#F3E5D8";
    const line = "#D4BFAA";

    const s = StyleSheet.create({
        page: {
            fontFamily: baseTheme.font,
            color: baseTheme.text,
            backgroundColor: bg,
            padding: 32,
            fontSize: 11.5,
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 24,
        },
        avatarWrapper: {
            width: 130,
            height: 130,
            borderRadius: 65,
            border: `4pt solid ${card}`,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 24,
        },
        avatar: {
            width: 120,
            height: 120,
            borderRadius: 60,
            objectFit: "cover",
            objectPosition: "center center",
        },
        nameBlock: {
            flex: 1,
        },
        name: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 4,
        },
        subtitle: {
            fontSize: 12,
            color: baseTheme.primary,
            marginBottom: 8,
        },
        introText: {
            fontSize: 11.5,
            lineHeight: 1.7,
        },
        layout: {
            flexDirection: "row",
        },
        leftCol: {
            width: "48%",
            paddingRight: 12,
        },
        rightCol: {
            width: "52%",
            paddingLeft: 12,
        },
        card: {
            backgroundColor: card,
            borderRadius: 18,
            padding: 14,
            marginBottom: 16,
            border: `1pt solid ${line}`,
        },
        cardTitleRow: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
        },
        cardTitle: {
            fontSize: 12,
            fontWeight: "bold",
            textTransform: "uppercase",
            color: baseTheme.primary,
        },
        cardIcon: {
            fontSize: 12,
            marginRight: 6,
        },
        contactLine: {
            fontSize: 10.5,
            marginBottom: 2,
        },
        skillBarRow: {
            marginBottom: 6,
        },
        skillBarLabel: {
            fontSize: 10.5,
            marginBottom: 2,
        },
        skillBarTrack: {
            height: 5,
            borderRadius: 999,
            backgroundColor: "#E5D4C5",
            overflow: "hidden",
        },
        skillBarFill: {
            height: 5,
            borderRadius: 999,
            backgroundColor: baseTheme.primary,
            width: "75%",
        },
        sectionHeader: {
            fontSize: 12,
            fontWeight: "bold",
            textTransform: "uppercase",
            marginBottom: 6,
            color: baseTheme.primary,
        },
        text: {
            fontSize: 11.5,
            lineHeight: 1.7,
        },
        eduTimelineRow: {
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 6,
        },
        eduDot: {
            width: 7,
            height: 7,
            borderRadius: 3.5,
            backgroundColor: baseTheme.primary,
            marginTop: 4,
            marginRight: 8,
        },
        eduText: {
            fontSize: 11,
            lineHeight: 1.5,
        },
    });

    const skillsRaw = sections.skills || o.skills || "";
    const skillItems = skillsRaw
        .split(/[,;\n]/)
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 6);

    return (
        <Document>
            <Page size="A4" style={s.page}>
                {/* HEADER з великим фото */}
                <View style={s.header}>
                    <View style={s.avatarWrapper}>
                        {o.photo && <Image src={o.photo} style={s.avatar} />}
                    </View>
                    <View style={s.nameBlock}>
                        <Text style={s.name}>{o.fullName}</Text>
                        <Text style={s.subtitle}>
                            {o.industry || "Professional"} • {o.experienceLevel || "Level"}
                        </Text>
                        {renderParagraphs(sections.summary, s.introText)}
                    </View>
                </View>

                <View style={s.layout}>
                    {/* LEFT COLUMN: Profile + Skills + Contact */}
                    <View style={s.leftCol}>
                        {/* PROFILE */}
                        <View style={s.card}>
                            <View style={s.cardTitleRow}>
                                <Text style={s.cardIcon}>👤</Text>
                                <Text style={s.cardTitle}>My Profile</Text>
                            </View>
                            {renderParagraphs(sections.summary, s.text)}
                        </View>

                        {/* SKILLS */}
                        <View style={s.card}>
                            <View style={s.cardTitleRow}>
                                <Text style={s.cardIcon}>⚙️</Text>
                                <Text style={s.cardTitle}>Skills</Text>
                            </View>
                            <View>
                                {skillItems.map((sk, i) => (
                                    <View key={i} style={s.skillBarRow}>
                                        <Text style={s.skillBarLabel}>{sk}</Text>
                                        <View style={s.skillBarTrack}>
                                            <View style={s.skillBarFill} />
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* CONTACT */}
                        <View style={s.card}>
                            <View style={s.cardTitleRow}>
                                <Text style={s.cardIcon}>☎️</Text>
                                <Text style={s.cardTitle}>Contact</Text>
                            </View>
                            <Text style={s.contactLine}>{o.phone}</Text>
                            <Text style={s.contactLine}>{o.email}</Text>
                        </View>
                    </View>

                    {/* RIGHT COLUMN: Experience + Education */}
                    <View style={s.rightCol}>
                        <View style={{ marginBottom: 14 }}>
                            <Text style={s.sectionHeader}>Experience</Text>
                            {renderRichText(sections.workExperience, s.text)}
                        </View>

                        <View>
                            <Text style={s.sectionHeader}>Education</Text>
                            {renderParagraphs(sections.education, s.eduText)?.map(
                                (node: any, i: number) => (
                                    <View key={i} style={s.eduTimelineRow}>
                                        <View style={s.eduDot} />
                                        <View>{node}</View>
                                    </View>
                                )
                            )}
                        </View>
                    </View>
                </View>
            </Page>

            {renderExtrasPages(o, baseTheme)}
        </Document>
    );
};

// ───────────────────────────────────────────────────────────
// 8. MANAGER REVIEWED CV
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
            objectFit: "cover",
            objectPosition: "center center",
        },
        name: {
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 4,
        },
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
        paragraph: {
            fontSize: 11,
            marginBottom: 6,
            textAlign: "justify",
            lineHeight: 1.7,
        },
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
        sanitizeText(skills)
            .split(/[,;\n]/)
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
                    <Text style={s.sidebarText}>{languages || "English (Fluent)"}</Text>
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
                            This CV has been professionally reviewed for clarity, structure,
                            and compliance with international HR standards. The achievements
                            were evaluated for measurable impact, presentation quality, and
                            professionalism.
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
