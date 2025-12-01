"use client";

import { Formik, FormikHelpers } from "formik";
import { useAlert } from "@/context/AlertContext";
import { useRouter } from "next/navigation";
import {
    signUpValidation,
    signUpInitialValues,
    signUpOnSubmit,
} from "@/validationSchemas/sign-up/schema";

import FormUI from "@/components/ui/form/FormUI";
import Avatar from "@mui/material/Avatar";
import styles from "./SignUp.module.scss";

export type SignUpValues = {
    name: string;
    email: string;
    password: string;
    terms: boolean;
};

export default function SignUpPage() {
    const { showAlert } = useAlert();
    const router = useRouter();

    return (
        <div className={styles.cover}>
            <div className={styles.cvCard}>

                {/* === LEFT — ONBOARDING SIDEBAR === */}
                <div className={styles.sidebar}>
                    <Avatar
                        sx={{
                            width: 74,
                            height: 74,
                            bgcolor: "rgba(255,255,255,0.26)",
                            color: "#fff",
                            fontSize: "1.9rem",
                            fontWeight: 700,
                            border: "2px solid rgba(255,255,255,0.45)",
                            boxShadow: "0 0 12px rgba(255,255,255,0.28)",
                        }}
                    >
                        ★
                    </Avatar>

                    <h3>Create Your Account</h3>
                    <p>Start building beautiful resumes powered by AI.</p>

                    <ul>
                        <li>✨ AI CV Generator</li>
                        <li>🌈 Full Template Library</li>
                        <li>💾 Saved Versions</li>
                        <li>📄 One-click PDF Export</li>
                    </ul>
                </div>

                {/* === RIGHT — FORM === */}
                <div className={styles.formArea}>
                    <Formik<SignUpValues>
                        initialValues={signUpInitialValues}
                        validate={signUpValidation}
                        onSubmit={(values, helpers: FormikHelpers<SignUpValues>) =>
                            signUpOnSubmit(values, helpers, showAlert, router)
                        }
                    >
                        {({ isSubmitting }) => (
                            <FormUI
                                title="Sign Up"
                                description="Create your account and start generating your perfect CV."
                                isSubmitting={isSubmitting}
                                fields={[
                                    { name: "name", type: "text", placeholder: "Full Name" },
                                    { name: "email", type: "email", placeholder: "Email" },
                                    { name: "password", type: "password", placeholder: "Password" },
                                ]}
                                submitLabel="Create Account"
                                showTerms
                            />
                        )}
                    </Formik>
                </div>

            </div>
        </div>
    );
}
