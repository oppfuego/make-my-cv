/**
 * Script to regenerate creative.pdf example
 * Run: npx tsx scripts/generate-creative-pdf.tsx
 */

import React from "react";
import { Document, Page, Text, View, Image, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import fs from "fs";
import path from "path";

// ── Sample data ──────────────────────────────────────────────

const sampleData = {
    fullName: "John Doe",
    phone: "+1 234 567 890",
    email: "test777@gmail.com",
    photo: path.resolve(__dirname, "../public/templates/man.png"),
    cvStyle: "Creative" as const,
    fontStyle: "Helvetica",
    themeColor: "Blue",
    industry: "IT",
    experienceLevel: "Mid-level",
    summary:
        "Software Developer with 2+ years of hands-on experience in building web applications. Strong problem-solving skills, attention to detail, and a passion for clean, maintainable code. Comfortable working in Agile teams and learning new technologies quickly.",
    workExperience: `Front-End Developer
NovaTech Solutions
June 2023 - Present
- Developed responsive UI components using React and TypeScript
- Collaborated with the backend team to integrate REST APIs
- Improved application performance by optimizing rendering logic (up to +25%)
- Participated in code reviews and contributed to UI/UX improvements

Junior Web Developer
DigitalWave Agency
April 2022 - May 2023
- Created landing pages and small web apps using HTML, SCSS, and JavaScript
- Maintained and updated client websites
- Implemented basic animations and interactive UI elements
- Assisted senior developers with debugging and testing tasks`,
    education: `Bachelor's Degree in Computer Science
Kyiv Technical University
2021 - 2025 (in progress)
Completed courses: Algorithms & Data Structures, Databases, Web Development, Software Engineering.`,
    skills: "JavaScript, TypeScript, React, Next.js, HTML5, CSS3",
};

// ── Theme ────────────────────────────────────────────────────

const primary = "#2563EB";
const accent = "#DBEAFE";
const font = "Helvetica";
const textColor = "#111827";
const bg = "#FBF5EE";
const card = "#F3E5D8";
const line = "#D4BFAA";

// ── Styles ───────────────────────────────────────────────────

const s = StyleSheet.create({
    page: {
        fontFamily: font,
        color: textColor,
        backgroundColor: bg,
        padding: 28,
        fontSize: 10.5,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    avatarWrapper: {
        width: 110,
        height: 110,
        borderRadius: 55,
        border: `4pt solid ${card}`,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 18,
    },
    avatar: {
        width: 102,
        height: 102,
        borderRadius: 51,
        objectFit: "cover" as const,
        objectPosition: "center center",
    },
    nameBlock: {
        flex: 1,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 3,
    },
    subtitle: {
        fontSize: 11,
        color: primary,
        marginBottom: 6,
    },
    introText: {
        fontSize: 10.5,
        lineHeight: 1.55,
        marginBottom: 3,
    },
    layout: {
        flexDirection: "row",
    },
    leftCol: {
        width: "42%",
        paddingRight: 10,
    },
    rightCol: {
        width: "58%",
        paddingLeft: 10,
    },
    card: {
        backgroundColor: card,
        borderRadius: 14,
        padding: 10,
        marginBottom: 10,
        border: `1pt solid ${line}`,
    },
    cardTitle: {
        fontSize: 11,
        fontWeight: "bold",
        textTransform: "uppercase" as const,
        color: primary,
        marginBottom: 6,
    },
    contactLine: {
        fontSize: 10,
        marginBottom: 2,
    },
    skillBarRow: {
        marginBottom: 5,
    },
    skillBarLabel: {
        fontSize: 10,
        marginBottom: 2,
    },
    skillBarTrack: {
        height: 4,
        borderRadius: 999,
        backgroundColor: "#E5D4C5",
        overflow: "hidden" as const,
    },
    skillBarFill: {
        height: 4,
        borderRadius: 999,
        backgroundColor: primary,
        width: "75%",
    },
    sectionHeader: {
        fontSize: 11,
        fontWeight: "bold",
        textTransform: "uppercase" as const,
        marginBottom: 5,
        color: primary,
    },
    text: {
        fontSize: 10.5,
        lineHeight: 1.55,
        marginBottom: 3,
    },
    eduTimelineRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 4,
    },
    eduDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: primary,
        marginTop: 3,
        marginRight: 6,
    },
    eduText: {
        fontSize: 10,
        lineHeight: 1.4,
        marginBottom: 2,
    },
    bulletRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        marginBottom: 3,
    },
});

// ── Helpers ──────────────────────────────────────────────────

const renderParagraphs = (raw: string, style: any) => {
    if (!raw) return null;
    return raw
        .split(/\n{1,2}/)
        .filter((t: string) => t.trim())
        .map((p: string, i: number) => (
            <Text key={i} style={style}>
                {p.trim().replace(/\n/g, " ")}
            </Text>
        ));
};

const renderRichText = (raw: string, style: any) => {
    if (!raw) return null;

    const lines = raw.split(/\n/).filter((l: string) => l.trim());
    return lines.map((line: string, i: number) => {
        if (line.trim().startsWith("- ")) {
            return (
                <View key={i} style={s.bulletRow}>
                    <Text style={{ marginRight: 6 }}>-</Text>
                    <Text style={[style, { flex: 1 }]}>{line.replace(/^-\s*/, "")}</Text>
                </View>
            );
        }
        return (
            <Text key={i} style={[style, { marginBottom: 5, lineHeight: 1.7 }]}>
                {line}
            </Text>
        );
    });
};

// ── Document ─────────────────────────────────────────────────

const skillItems = sampleData.skills.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 6);

const educationLines = sampleData.education
    .split(/\n/)
    .filter((l) => l.trim());

const CreativeCVDocument = () => (
    <Document>
        <Page size="A4" style={s.page}>
            {/* HEADER */}
            <View style={s.header}>
                <View style={s.avatarWrapper}>
                    <Image src={sampleData.photo} style={s.avatar} />
                </View>
                <View style={s.nameBlock}>
                    <Text style={s.name}>{sampleData.fullName}</Text>
                    <Text style={s.subtitle}>
                        {sampleData.industry} - {sampleData.experienceLevel}
                    </Text>
                    {renderParagraphs(sampleData.summary, s.introText)}
                </View>
            </View>

            <View style={s.layout}>
                {/* LEFT COLUMN */}
                <View style={s.leftCol}>
                    {/* PROFILE */}
                    <View style={s.card}>
                        <Text style={s.cardTitle}>My Profile</Text>
                        {renderParagraphs(sampleData.summary, s.text)}
                    </View>

                    {/* SKILLS */}
                    <View style={s.card}>
                        <Text style={s.cardTitle}>Skills</Text>
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
                        <Text style={s.cardTitle}>Contact</Text>
                        <Text style={s.contactLine}>{sampleData.phone}</Text>
                        <Text style={s.contactLine}>{sampleData.email}</Text>
                    </View>
                </View>

                {/* RIGHT COLUMN */}
                <View style={s.rightCol}>
                    <View style={{ marginBottom: 14 }}>
                        <Text style={s.sectionHeader}>Experience</Text>
                        {renderRichText(sampleData.workExperience, s.text)}
                    </View>

                    <View>
                        <Text style={s.sectionHeader}>Education</Text>
                        {educationLines.map((line, i) => (
                            <View key={i} style={s.eduTimelineRow}>
                                <View style={s.eduDot} />
                                <Text style={s.eduText}>{line}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

// ── Main ─────────────────────────────────────────────────────

async function main() {
    console.log("Generating creative.pdf...");

    const buffer = await renderToBuffer(<CreativeCVDocument />);

    const outputPath = path.resolve(__dirname, "../public/pdf/creative.pdf");
    fs.writeFileSync(outputPath, buffer);

    console.log(`Done! Saved to ${outputPath}`);
}

main().catch((err) => {
    console.error("Failed to generate PDF:", err);
    process.exit(1);
});

