import React from "react";
import styles from './InfoBlock.module.scss';
import Media from "../image/Media";
import Text from "../text/Text";

interface InfoBlockProps {
    title?: string;
    description?: string;
    icon?: string;
    image?: string;
    bullets?: string[];
    align?: "left" | "center" | "right";
    imageHeight?: string;   // <-- НОВЕ
}

import { media as mediaMap } from "@/resources/media";

const InfoBlock: React.FC<InfoBlockProps> = ({
                                                 title,
                                                 description,
                                                 icon,
                                                 image,
                                                 bullets,
                                                 align = "left",
                                                 imageHeight
                                             }) => {
    const resolvedImage = image ? mediaMap[image] : undefined;

    return (
        <div className={`${styles.infoBlock} ${styles[align]}`}>
            {icon && <div className={styles.icon}>{icon}</div>}

            {resolvedImage && (
                <div
                    className={styles.imageWrapper}
                    style={{ height: imageHeight || "220px" }}
                >
                    <Media
                        src={resolvedImage}
                        type="image"
                        alt={title || "Info"}
                        objectFit="cover"
                    />
                </div>
            )}

            <Text
                title={title}
                description={description}
                bullets={bullets}
                centerTitle={align === "center"}
                centerDescription={align === "center"}
                centerBullets={align === "center"}
            />
        </div>
    );
};

export default InfoBlock;
