"use client";

import React, {useState} from "react";
import {Formik, Form, Field, FormikHelpers} from "formik";
import {motion, AnimatePresence} from "framer-motion";
import ButtonUI from "@/components/ui/button/ButtonUI";
import {validationSchema, initialValues, sendContactRequest} from "./schema";
import {useAlert} from "@/context/AlertContext";

import {FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaQuestionCircle} from "react-icons/fa";

import Text from "@/components/constructor/text/Text"; // <-- ТУТ МИ ЮЗАЄМО ТВОЮ КОМПОНЕНТУ
import styles from "./ContactForm.module.scss";
import {COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_NAME, COMPANY_PHONE} from "@/resources/constants";

interface ContactFormValues {
    name: string;
    secondName: string;
    email: string;
    phone: string;
    message?: string;
}

const ContactForm: React.FC = () => {
    const {showAlert} = useAlert();
    const [sent, setSent] = useState(false);

    const handleSubmit = async (
        values: ContactFormValues,
        {setSubmitting, resetForm}: FormikHelpers<ContactFormValues>
    ) => {
        try {
            await sendContactRequest(values);
            resetForm();
            setSent(true);
            showAlert("Success", "Message sent!", "success");
        } catch {
            showAlert("Error", "Something went wrong.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className={styles.wrapper}>
            {/* ============== HEADER TEXT USING <Text /> ============== */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.45}}
            >
                <Text
                    title="Need Help With Your CV?"
                    description="Write to us if you’re experiencing issues with AI generation, templates, tokens or PDF export. Our support team responds within 12–24 hours."
                    centerTitle
                    centerDescription
                    textGap="1rem"
                    titleSize="2.2rem"
                    titleWeight={800}
                    descriptionSize="1.08rem"
                    descriptionColor="var(--text-secondary)"
                />
            </motion.div>

            {/* ============== INFO STRIP ============== */}
            <div className={styles.infoStrip}>
                <div className={styles.infoItem}>
                    <FaEnvelope/>
                    <span>
            <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
        </span>
                </div>

                <div className={styles.infoItem}>
                    <FaPhoneAlt/>
                    <span>
            {COMPANY_PHONE}
        </span>
                </div>

                <div className={styles.infoItem}>
                    <FaMapMarkerAlt/>
                    <span className={styles.address}>{COMPANY_ADDRESS}</span>
                </div>
            </div>


            {/* ============== FORM CARD ============== */}
            <motion.div
                className={styles.formBox}
                initial={{opacity: 0, scale: 0.95}}
                whileInView={{opacity: 1, scale: 1}}
                transition={{duration: 0.45}}
            >
                <AnimatePresence mode="wait">
                    {!sent ? (
                        <Formik<ContactFormValues>
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({isSubmitting}) => (
                                <Form className={styles.form}>
                                    <div className={styles.twoCols}>
                                        <Field name="name" placeholder="First name"/>
                                        <Field name="secondName" placeholder="Last name"/>
                                    </div>

                                    <Field name="email" type="email" placeholder="Email address"/>
                                    <Field name="phone" type="tel" placeholder="Phone number"/>

                                    <Field
                                        as="textarea"
                                        name="message"
                                        rows={4}
                                        placeholder="How can we help you?"
                                    />

                                    <ButtonUI
                                        type="submit"
                                        fullWidth
                                        loading={isSubmitting}
                                        text="Send Message"
                                        color="primary"
                                        hoverEffect="glow"
                                    />
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        <motion.div
                            className={styles.successBox}
                            initial={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                        >
                            <h3>🎉 Message Sent</h3>
                            <p>Thank you! Our support team will get back to you soon.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default ContactForm;
