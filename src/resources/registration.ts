import { ALLOWED_COUNTRIES, isAllowedCountryCode } from "@/resources/countries";

export type RegistrationPayload = {
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
};

export type RegistrationFormValues = RegistrationPayload & {
    confirmPassword: string;
    terms: boolean;
};

export const registrationInitialValues: RegistrationFormValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    email: "",
    street: "",
    city: "",
    country: "",
    postCode: "",
    password: "",
    confirmPassword: "",
    terms: false,
};

export function normalizeRegistrationPayload(
    values: Partial<RegistrationPayload>
): RegistrationPayload {
    return {
        firstName: (values.firstName ?? "").trim(),
        lastName: (values.lastName ?? "").trim(),
        phoneNumber: (values.phoneNumber ?? "").trim(),
        dateOfBirth: (values.dateOfBirth ?? "").trim(),
        email: (values.email ?? "").trim().toLowerCase(),
        street: (values.street ?? "").trim(),
        city: (values.city ?? "").trim(),
        country: (values.country ?? "").trim().toUpperCase(),
        postCode: (values.postCode ?? "").trim(),
        password: values.password ?? "",
    };
}

export function validateRegistrationPayload(
    values: Partial<RegistrationPayload>,
    options?: { confirmPassword?: string }
) {
    const normalized = normalizeRegistrationPayload(values);
    const errors: Record<string, string> = {};

    if (!normalized.firstName) errors.firstName = "First name is required";
    if (!normalized.lastName) errors.lastName = "Last name is required";
    if (!normalized.phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!normalized.email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
        errors.email = "Enter a valid email address";
    }
    if (!normalized.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    else if (!isValidDateInput(normalized.dateOfBirth)) {
        errors.dateOfBirth = "Enter a valid date of birth";
    }
    if (!normalized.street) errors.street = "Street is required";
    if (!normalized.city) errors.city = "City is required";
    if (!normalized.country) errors.country = "Country is required";
    else if (!isAllowedCountryCode(normalized.country)) {
        errors.country = "Selected country is not supported";
    }
    if (!normalized.postCode) errors.postCode = "Post code is required";
    if (!normalized.password) errors.password = "Password is required";
    if (options?.confirmPassword !== undefined) {
        if (!options.confirmPassword) errors.confirmPassword = "Confirm your password";
        else if (normalized.password !== options.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }
    }

    return { normalized, errors };
}

export function isValidDateInput(value: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

    const date = new Date(`${value}T00:00:00.000Z`);
    if (Number.isNaN(date.getTime())) return false;

    return date.toISOString().slice(0, 10) === value;
}

export function getDateOfBirthAsDate(value: string): Date {
    return new Date(`${value}T00:00:00.000Z`);
}

export function getRegistrationCountryOptions() {
    return ALLOWED_COUNTRIES;
}
