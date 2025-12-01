"use client";

import { Formik, FormikHelpers } from "formik";
import { useAlert } from "@/context/AlertContext";
import { useRouter } from "next/navigation";
import {
    signInValidation,
    signInInitialValues,
    signInOnSubmit
} from "@/validationSchemas/sign-in/schema";

import FormUI from "@/components/ui/form/FormUI";
import styles from "./SignIn.module.scss";
import {Avatar} from "@mui/material";

export type SignInValues = { email: string; password: string };

export default function SignInPage() {
    const { showAlert } = useAlert();
    const router = useRouter();

    return (
        <div className={styles.cover}>
            <div className={styles.cvCard}>
                {/* === LEFT CV SIDEBAR === */}
                <div className={styles.sidebar}>
                    <Avatar
                        sx={{
                            width: 72,
                            height: 72,
                            bgcolor: "rgba(255,255,255,0.25)",
                            fontSize: "1.8rem",
                            fontWeight: 600,
                            color: "#fff",
                            border: "2px solid rgba(255,255,255,0.4)",
                            boxShadow: "0 0 12px rgba(255,255,255,0.25)",
                            backdropFilter: "blur(4px)",
                        }}
                    >
                        CV
                    </Avatar>


                    <h3>Your CV Dashboard</h3>
                    <p>Sign in to manage your resumes, templates & AI tools.</p>

                    <ul>
                        <li>📄 Saved CV Versions</li>
                        <li>✨ AI Improvement Tools</li>
                        <li>🎨 Premium Templates</li>
                        <li>📥 PDF Export</li>
                    </ul>
                </div>

                {/* === RIGHT SIDE — ACTUAL FORM === */}
                <div className={styles.formArea}>
                    <Formik<SignInValues>
                        initialValues={signInInitialValues}
                        validate={signInValidation}
                        onSubmit={(values, helpers: FormikHelpers<SignInValues>) =>
                            signInOnSubmit(values, helpers, showAlert, router)
                        }
                    >
                        {({ isSubmitting }) => (
                            <FormUI
                                title="Sign In"
                                description="Welcome back! Continue building your perfect CV."
                                isSubmitting={isSubmitting}
                                fields={[
                                    { name: "email", type: "email", placeholder: "Email address" },
                                    { name: "password", type: "password", placeholder: "Password" }
                                ]}
                                submitLabel="Sign In"
                            />
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
