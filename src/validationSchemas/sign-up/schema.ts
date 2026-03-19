import { AlertColor } from "@mui/material/Alert";
import {
    registrationInitialValues,
    validateRegistrationPayload,
    type RegistrationFormValues,
} from "@/resources/registration";

export const signUpInitialValues = registrationInitialValues;

type SignUpErrors = {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    email?: string;
    street?: string;
    city?: string;
    country?: string;
    postCode?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
};

export const signUpValidation = (values: RegistrationFormValues) => {
    const { errors } = validateRegistrationPayload(values, {
        confirmPassword: values.confirmPassword,
    });

    if (!values.terms)
        errors.terms = "You must agree to the Terms and Conditions";

    return errors as SignUpErrors;
};

export const signUpOnSubmit = async (
    values: RegistrationFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
    showAlert: (msg: string, desc?: string, severity?: AlertColor) => void,
    router: { replace: (url: string) => void; refresh: () => void }
) => {
    try {
        const payload = {
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            phoneNumber: values.phoneNumber.trim(),
            dateOfBirth: values.dateOfBirth,
            email: values.email.trim().toLowerCase(),
            street: values.street.trim(),
            city: values.city.trim(),
            country: values.country.trim().toUpperCase(),
            postCode: values.postCode.trim(),
            password: values.password,
        };

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (res.ok && data?.user) {
            showAlert("Registration successful!", "", "success");
            router.replace("/");
            router.refresh();
        } else {
            showAlert(data?.message || "Registration failed", "", "error");
        }
    } catch (e: any) {
        showAlert(e?.message || "Network error", "", "error");
    } finally {
        setSubmitting(false);
    }
};
