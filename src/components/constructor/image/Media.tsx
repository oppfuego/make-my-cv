"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./Media.module.scss";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { media as mediaMap } from "@/resources/media";

export interface MediaProps {
    src: string | StaticImageData;
    type?: "image" | "video";
    alt?: string;
    className?: string;
    objectFit?: "cover" | "contain" | "fill";

    width?: string;
    height?: string;
    aspectRatio?: string;

    controls?: boolean;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;

    hoverEnabled?: boolean;
    hoverText?: string;
    hoverButton?: { text: string; link: string };
}

const Media: React.FC<MediaProps> = ({
                                         src,
                                         type = "image",
                                         alt = "media",
                                         className = "",
                                         objectFit = "cover",

                                         width,
                                         height,
                                         aspectRatio = "16/9",

                                         controls = true,
                                         autoPlay = false,
                                         loop = false,
                                         muted = false,

                                         hoverEnabled = false,
                                         hoverText,
                                         hoverButton,
                                     }) => {
    if (!src) return null;

    // 🟣 Якщо src — string key → беремо реальний asset
    const resolvedSrc: StaticImageData | string =
        typeof src === "string" && mediaMap[src] ? mediaMap[src] : src;

    return (
        <div
            className={`${styles.mediaWrapper} ${hoverEnabled ? styles.hoverable : ""} ${className}`}
            style={{
                width: width || "100%",
                height: height,              // ⬅ ТЕПЕР НЕ ПЕРЕЗАПИСУЄ InfoBlock
                minHeight: "220px",          // ⬅ fallback
                position: "relative",
                aspectRatio: height ? undefined : aspectRatio,
            }}
        >

        {type === "image" ? (
                <Image
                    src={resolvedSrc}
                    alt={alt}
                    fill                               // ⬅ Робить фото adaptive
                    sizes="100vw"
                    priority={false}
                    className={styles.image}
                    style={{ objectFit }}
                />
            ) : (
                typeof resolvedSrc === "string" && (
                    <video
                        src={resolvedSrc}
                        controls={controls}
                        autoPlay={autoPlay}
                        loop={loop}
                        muted={muted}
                        className={styles.video}
                        style={{ objectFit }}
                    />
                )
            )}

            {hoverEnabled && (hoverText || hoverButton) && (
                <div className={styles.overlay}>
                    {hoverText && <p className={styles.hoverText}>{hoverText}</p>}

                    {hoverButton && (
                        <a href={hoverButton.link}>
                            <ButtonUI
                                text={hoverButton.text}
                                variant="solid"
                                color="primary"
                                size="md"
                                hoverEffect="scale"
                            />
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

export default Media;
