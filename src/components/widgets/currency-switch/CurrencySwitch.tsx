"use client";

import React from "react";
import styles from "./CurrencySwitch.module.scss";

const CurrencySwitch: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.trigger} style={{ cursor: "default" }}>
                <span className={styles.label}>EUR (€)</span>
            </div>
        </div>
    );
};

export default CurrencySwitch;
