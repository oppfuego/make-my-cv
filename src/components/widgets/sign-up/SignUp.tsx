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
import { getRegistrationCountryOptions } from "@/resources/registration";

export type SignUpValues = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: string;
    email: string;
    street: string;
    city: string;
    country: string;
    postCode: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
};

const countryOptions = getRegistrationCountryOptions().map((country) => ({
    value: country.code,
    label: country.name,
}));

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
                                containerClassName={styles.signUpFormContainer}
                                formClassName={styles.signUpFormGrid}
                                fields={[
                                    { name: "firstName", label: "First name", type: "text", placeholder: "Enter your first name" },
                                    { name: "lastName", label: "Last name", type: "text", placeholder: "Enter your last name" },
                                    { name: "dateOfBirth", label: "Date of birth", type: "date", placeholder: "YYYY-MM-DD" },
                                    { name: "email", label: "Email", type: "email", placeholder: "Enter your email address" },
                                    { name: "phoneNumber", label: "Phone number", type: "text", placeholder: "Enter your phone number" },
                                    { name: "street", label: "Street", type: "text", placeholder: "Enter your street address" },
                                    { name: "city", label: "City", type: "text", placeholder: "Enter your city" },
                                    {
                                        name: "country",
                                        label: "Country",
                                        type: "select",
                                        placeholder: "Select your country",
                                        options: countryOptions,
                                    },
                                    { name: "postCode", label: "Post code", type: "text", placeholder: "Enter your post code" },
                                    { name: "password", label: "Password", type: "password", placeholder: "Create a password" },
                                    { name: "confirmPassword", label: "Confirm password", type: "password", placeholder: "Confirm your password" },
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
