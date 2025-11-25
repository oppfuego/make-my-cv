"use client";

import React from "react";
import { useAllOrders } from "@/context/AllOrdersContext";
import styles from "./AllOrders.module.scss";
import { FaFileDownload, FaRegClock, FaCoins } from "react-icons/fa";
import ButtonUI from "@/components/ui/button/ButtonUI";
import Link from "next/link";
import { downloadCVPDF } from "@/components/features/pdf-extractor/PDFExtractorCV";
import { CVOrderType } from "@/backend/types/cv.types";

const AllOrders: React.FC = () => {
    const { cvOrders, loading, refreshOrders } = useAllOrders();

    const formatDate = (d: string) =>
        new Date(d).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    const formatTime = (d: string) =>
        new Date(d).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });

    const shortId = (id: string) => id.slice(-6);

    const handleDownload = async (order: CVOrderType) => {
        try {
            // якщо extrasData є вже в об'єкті → створюємо PDF локально
            if (order.extrasData && Object.keys(order.extrasData).length > 0) {
                await downloadCVPDF(order);
                return;
            }
            // інакше фечимо ордер по ID
            const res = await fetch(`/api/cv/get-order?id=${order._id}`);
            const data = await res.json();
            if (data?.order) await downloadCVPDF(data.order);
        } catch (err: any) {
            console.error("❌ Error downloading CV:", err.message);
        }
    };

    if (loading) return <p className={styles.loading}>Loading your CV orders...</p>;

    if (cvOrders.length === 0)
        return (
            <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>📭</span>
                <p>You have no CV orders yet.</p>
                <Link href="/dashboard">
                    <ButtonUI color="primary" size="md" shape="rounded" hoverEffect="shadow">
                        Create your first CV
                    </ButtonUI>
                </Link>
            </div>
        );

    return (
        <section className={styles.ordersSection}>
            <div className={styles.header}>
                <h3>Your CV Orders</h3>
                <p>View, track and download your generated CVs</p>
                <ButtonUI color="primary" size="sm" onClick={refreshOrders}>
                    Refresh
                </ButtonUI>
            </div>

            <div className={styles.ordersGrid}>
                {cvOrders.map((order) => (
                    <div key={order._id} className={styles.card}>
                        {/* HEADER */}
                        <div className={styles.cardHeader}>
                            <div className={styles.idWrapper}>
                                <span className={styles.orderId}>#{shortId(order._id)}</span>

                                <span
                                    className={`${styles.badge} ${
                                        order.reviewType === "manager"
                                            ? styles.manager
                                            : styles.instant
                                    }`}
                                >
                                    {order.reviewType === "manager" ? "Human Review" : "AI Instant"}
                                </span>
                            </div>

                            <button
                                className={styles.downloadBtn}
                                onClick={() => handleDownload(order)}
                                aria-label="Download CV"
                            >
                                <FaFileDownload />
                            </button>
                        </div>

                        {/* BODY */}
                        <div className={styles.cardBody}>
                            <p className={styles.email}>{order.email}</p>

                            <div className={styles.meta}>
                                <span className={styles.date}>
                                    <FaRegClock /> {formatDate(order.createdAt)} at {formatTime(order.createdAt)}
                                </span>

                                <span className={styles.tokens}>
                                    <FaCoins /> -{order.totalTokens} tokens
                                </span>
                            </div>

                            <p className={styles.extraInfo}>
                                Style: <strong>{order.cvStyle}</strong>
                                &nbsp;|&nbsp;
                                Experience: <strong>{order.experienceLevel}</strong>
                            </p>

                            {order.extras?.length > 0 && (
                                <p className={styles.extrasList}>
                                    Extras: {order.extras.join(", ")}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AllOrders;
