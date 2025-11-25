"use client";

import React from "react";
import styles from "./MissionBanner.module.scss";
import Media from "../image/Media";
import Text from "../text/Text";
import ButtonUI from "@/components/ui/button/ButtonUI";

interface MissionBannerProps {
    title: string;
    description: string;
    image?: string;

    // 🟦 нові параметри
    buttonText?: string;
    buttonLink?: string;
}

const MissionBanner: React.FC<MissionBannerProps> = ({
                                                         title,
                                                         description,
                                                         image,
                                                         buttonText,
                                                         buttonLink,
                                                     }) => {
    return (
        <section className={styles.banner}>
            <div className={styles.inner}>

                <div className={styles.left}>
                    <Text
                        title={title}
                        description={description}
                        centerTitle={false}
                        centerDescription={false}
                    />

                    {buttonText && (
                        <ButtonUI
                            className={styles.button}
                            href={buttonLink || "#"}
                        >
                            {buttonText}
                        </ButtonUI>
                    )}
                </div>

                {image && (
                    <div className={styles.right}>
                        <Media
                            src={image}
                            type="image"
                            width="100%"
                            height="100%"
                            objectFit="cover"
                            alt="Mission image"
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default MissionBanner;
