"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./TestimonialsSlider.module.scss";
import { media } from "@/resources/media";
import Text from "@/components/constructor/text/Text";

interface Testimonial {
    name: string;
    role?: string;
    image?: string;
    text: string;
    rating?: number;
}

interface Props {
    title?: string;
    description?: string;
    testimonials: Testimonial[];
}

export default function TestimonialsSlider({
                                               title,
                                               description,
                                               testimonials,
                                           }: Props) {
    const resolveImage = (key?: string) => {
        if (!key) return undefined;
        const img = media[key as keyof typeof media];
        return typeof img === "string" ? img : (img as any)?.src ?? "";
    };

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <Text
                    title={title}
                    description={description}
                    titleLevel={2}
                    centerTitle
                    centerDescription
                />
            </div>

            <div className={styles.sliderWrapper}>
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={40}
                    slidesPerView={3}
                    autoplay={{ delay: 4500 }}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1200: { slidesPerView: 3 },
                    }}
                    className={styles.slider}
                >
                    {testimonials.map((t, i) => (
                        <SwiperSlide key={i}>
                            <motion.div
                                className={styles.card}
                                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                            >
                                {/* Аватар */}
                                {t.image && (
                                    <div className={styles.avatarWrapper}>
                                        <img
                                            src={resolveImage(t.image)}
                                            alt={t.name}
                                            className={styles.avatar}
                                        />
                                        <div className={styles.glow}></div>
                                    </div>
                                )}

                                {/* Цитата */}
                                <p className={styles.text}>“{t.text}”</p>

                                {/* Ім’я + роль */}
                                <div className={styles.footer}>
                                    <h3 className={styles.name}>{t.name}</h3>
                                    {t.role && (
                                        <span className={styles.role}>{t.role}</span>
                                    )}
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
