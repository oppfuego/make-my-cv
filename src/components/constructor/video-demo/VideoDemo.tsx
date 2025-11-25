"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "../container/Container";
import Text from "../text/Text";
import Media from "../image/Media";
import { media as mediaMap } from "@/resources/media";
import { StaticImageData } from "next/image";
import styles from "./VideoDemo.module.scss";

interface Props {
    title?: string;
    description?: string;
    video: string;

    align?: "left" | "center" | "right";

    textGap?: string;
    mediaGap?: string;
    wrapperGap?: string;

    /** NEW — text styling */
    titleSize?: string;
    titleWeight?: number | string;
    titleColor?: string;

    descriptionSize?: string;
    descriptionWeight?: number | string;
    descriptionColor?: string;
}

const VideoDemo: React.FC<Props> = ({
                                        title,
                                        description,
                                        video,
                                        align = "center",

                                        textGap = "12px",
                                        mediaGap = "30px",
                                        wrapperGap = "0px",

                                        titleSize,
                                        titleWeight,
                                        titleColor,

                                        descriptionSize,
                                        descriptionWeight,
                                        descriptionColor,
                                    }) => {
    const resolvedVideo =
        (mediaMap as Record<string, string | StaticImageData>)[video];

    const ref = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.2 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <Container
            display="flex"
            flexDirection="column"
            alignItems={
                align === "left"
                    ? "flex-start"
                    : align === "right"
                        ? "flex-end"
                        : "center"
            }
            gap={wrapperGap}
            style={{
                width: "100%",
                maxWidth: "1100px",
                margin: "0 auto",
                textAlign: align,
            }}
        >
            <div
                ref={ref}
                className={`${styles.fadeBlock} ${isVisible ? styles.visible : ""}`}
                style={{ gap: mediaGap, textAlign: align }}
            >
                <Text
                    title={title}
                    description={description}
                    centerTitle={align === "center"}
                    centerDescription={align === "center"}

                    textGap={textGap}

                    titleSize={titleSize}
                    titleWeight={titleWeight}
                    titleColor={titleColor}

                    descriptionSize={descriptionSize}
                    descriptionWeight={descriptionWeight}
                    descriptionColor={descriptionColor}
                />

                <Media
                    type="video"
                    src={resolvedVideo}
                    aspectRatio="12/8"
                    autoPlay
                    loop
                    muted
                    controls={false}
                />
            </div>
        </Container>
    );
};

export default VideoDemo;
