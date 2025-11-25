"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { motion, AnimatePresence } from "framer-motion";
import styles from "./SideSliderShow.module.scss";

interface Slide {
    image: any;
    title: string;
    description: string;
}

interface Props {
    slides: Slide[];
}

const SideSliderShow: React.FC<Props> = ({ slides }) => {
    const [active, setActive] = useState(0);

    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div className={styles.wrapper}>
            {/* LEFT — SLIDER */}
            <div className={styles.slider}>
                {/* CUSTOM ARROWS */}
                <button ref={prevRef} className={styles.arrowPrev}></button>
                <button ref={nextRef} className={styles.arrowNext}></button>

                <Swiper
                    modules={[Navigation, Pagination, EffectFade]}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    pagination={{ clickable: true }}
                    onBeforeInit={(swiper) => {
                        // прив’язуємо рефи до swiper
                        // @ts-ignore
                        swiper.params.navigation.prevEl = prevRef.current;
                        // @ts-ignore
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    onSlideChange={(swiper) => setActive(swiper.realIndex)}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    loop
                    speed={700}
                    className={styles.swiper}
                >
                    {slides.map((s, i) => (
                        <SwiperSlide key={i}>
                            <img
                                src={typeof s.image === "string" ? s.image : s.image.src}
                                alt={s.title}
                                className={styles.image}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* RIGHT — TEXT */}
            <div className={styles.textBlock}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.45 }}
                    >
                        <h3 className={styles.title}>{slides[active].title}</h3>
                        <p className={styles.description}>{slides[active].description}</p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SideSliderShow;
