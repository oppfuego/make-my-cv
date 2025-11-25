"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./TeamGrid.module.scss";
import { media as mediaMap } from "@/resources/media";
import Media from "@/components/constructor/image/Media";

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image: string;
}

interface Props {
    title?: string;
    description?: string;
    members: TeamMember[];
}

export default function TeamGrid({ title, description, members }: Props) {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                {title && <h2>{title}</h2>}
                {description && <p>{description}</p>}
            </div>

            <div className={styles.sliderWrapper}>
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={40}
                    slidesPerView={3}
                    autoplay={{ delay: 4500 }}
                    navigation={true}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1200: { slidesPerView: 3 },
                    }}
                    className={styles.slider}
                >
                    {members.map((m, i) => (
                        <SwiperSlide key={i}>
                            <motion.div
                                className={styles.card}
                                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                            >
                                <div className={styles.photo}>
                                    <Media
                                        src={m.image}
                                        type="image"
                                        objectFit="cover"
                                        alt={m.name}
                                    />
                                    <div className={styles.photoGlow}></div>
                                </div>

                                <div className={styles.info}>
                                    <h3>{m.name}</h3>
                                    <span className={styles.role}>{m.role}</span>
                                    <p >{m.bio}</p>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
