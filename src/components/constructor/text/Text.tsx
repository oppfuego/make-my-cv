import React, { JSX } from "react";
import styles from "./Text.module.scss";
import clsx from "clsx";

interface TextProps {
    title?: string;
    titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    description?: string;
    bullets?: string[];
    descriptionWithBullets?: string[];
    centerTitle?: boolean;
    centerDescription?: boolean;
    centerBullets?: boolean;

    /** NEW — spacing between title, description, bullets */
    textGap?: string;

    /** NEW — TITLE styling */
    titleSize?: string;
    titleWeight?: number | string;
    titleColor?: string;

    /** NEW — DESCRIPTION styling */
    descriptionSize?: string;
    descriptionWeight?: number | string;
    descriptionColor?: string;
}

const Text: React.FC<TextProps> = ({
                                       title,
                                       titleLevel = 2,
                                       description,
                                       bullets,
                                       descriptionWithBullets,

                                       centerTitle = false,
                                       centerDescription = false,
                                       centerBullets = false,

                                       textGap,

                                       titleSize,
                                       titleWeight,
                                       titleColor,

                                       descriptionSize,
                                       descriptionWeight,
                                       descriptionColor,
                                   }) => {
    const headingTag = `h${titleLevel}` as keyof JSX.IntrinsicElements;

    return (
        <div
            className={styles.textBlock}
            style={{
                gap: textGap ?? undefined,
            }}
        >
            {title &&
                React.createElement(
                    headingTag,
                    {
                        className: clsx(styles.title, centerTitle && styles.center),
                        style: {
                            fontSize: titleSize,
                            fontWeight: titleWeight,
                            color: titleColor,
                        },
                    },
                    title
                )}

            {description && (
                <p
                    className={clsx(styles.description, centerDescription && styles.center)}
                    style={{
                        fontSize: descriptionSize,
                        fontWeight: descriptionWeight,
                        color: descriptionColor,
                    }}
                >
                    {description}
                </p>
            )}

            {Array.isArray(bullets) && bullets.length > 0 && (
                <ul className={clsx(styles.bulletList, centerBullets && styles.center)}>
                    {bullets.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            )}

            {Array.isArray(descriptionWithBullets) &&
                descriptionWithBullets.length > 0 && (
                    <div className={styles.descriptionWithBullets}>
                        <p
                            className={clsx(styles.description, centerDescription && styles.center)}
                            style={{
                                fontSize: descriptionSize,
                                fontWeight: descriptionWeight,
                                color: descriptionColor,
                            }}
                        >
                            Key points:
                        </p>

                        <ul className={clsx(styles.bulletList, centerBullets && styles.center)}>
                            {descriptionWithBullets.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
        </div>
    );
};

export default Text;
