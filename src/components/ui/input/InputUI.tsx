import * as React from "react";
import Input, { InputProps } from "@mui/joy/Input";
import { useField, useFormikContext } from "formik";

type SelectOption = {
    value: string;
    label: string;
};

type FormikInputProps = InputProps & {
    name: string;
    formik?: boolean;
    type?: string;
    options?: SelectOption[];
};

const fieldStyles = {
    minHeight: "48px",
    borderRadius: "12px",
    borderColor: "var(--border-color)",
    backgroundColor: "#fff",
    fontSize: "0.95rem",
    "--Input-placeholderColor": "var(--text-secondary)",
    "--Select-placeholderColor": "var(--text-secondary)",
    "&:hover": {
        borderColor: "var(--border-color)",
    },
    "&.Mui-focused, &:focus-within": {
        borderColor: "var(--primary-color)",
        boxShadow: "0 0 0 3px rgba(123, 97, 255, 0.12)",
    },
};

const selectWrapperStyles: React.CSSProperties = {
    position: "relative",
    width: "100%",
};

const selectStyles = (
    hasError: boolean,
    isFocused: boolean
): React.CSSProperties => ({
    width: "100%",
    minHeight: "48px",
    borderRadius: "12px",
    border: `1px solid ${hasError ? "#dc2626" : "var(--border-color)"}`,
    backgroundColor: "#fff",
    padding: "0 42px 0 14px",
    fontSize: "0.95rem",
    color: "var(--text-color)",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    boxShadow: hasError
        ? "none"
        : isFocused
            ? "0 0 0 3px rgba(123, 97, 255, 0.12)"
            : "none",
    borderColor: hasError
        ? "#dc2626"
        : isFocused
            ? "var(--primary-color)"
            : "var(--border-color)",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
});

const selectIconStyles: React.CSSProperties = {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "12px",
    color: "var(--text-secondary)",
    pointerEvents: "none",
};

const errorTextStyles: React.CSSProperties = {
    color: "red",
    fontSize: 12,
};

const InputUI: React.FC<FormikInputProps> = ({
    formik,
    options,
    type,
    ...props
}) => {
    const [isSelectFocused, setIsSelectFocused] = React.useState(false);

    if (formik && props.name) {
        const [field, meta] = useField(props.name);
        const { setFieldValue, setFieldTouched } = useFormikContext<Record<string, unknown>>();
        const hasError = !!meta.error && meta.touched;

        if (type === "select") {
            return (
                <>
                    <div style={selectWrapperStyles}>
                        <select
                            id={props.id}
                            name={props.name}
                            value={(field.value as string) || ""}
                            onChange={(event) => setFieldValue(props.name, event.target.value)}
                            onFocus={() => setIsSelectFocused(true)}
                            onBlur={() => {
                                setIsSelectFocused(false);
                                setFieldTouched(props.name, true);
                            }}
                            style={selectStyles(hasError, isSelectFocused)}
                        >
                            <option value="" disabled style={{ color: "var(--text-secondary)" }}>
                                {props.placeholder || "Select an option"}
                            </option>
                            {(options || []).map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <span style={selectIconStyles}>▾</span>
                    </div>
                    {hasError && (
                        <div style={errorTextStyles}>{meta.error}</div>
                    )}
                </>
            );
        }

        return (
            <>
                <Input {...field} {...props} type={type} error={hasError} sx={fieldStyles} />
                {hasError && (
                    <div style={errorTextStyles}>{meta.error}</div>
                )}
            </>
        );
    }
    if (type === "select") {
        return (
            <div style={selectWrapperStyles}>
                <select
                    name={props.name}
                    defaultValue=""
                    onFocus={() => setIsSelectFocused(true)}
                    onBlur={() => setIsSelectFocused(false)}
                    style={selectStyles(false, isSelectFocused)}
                >
                    <option value="" disabled style={{ color: "var(--text-secondary)" }}>
                        {props.placeholder || "Select an option"}
                    </option>
                    {(options || []).map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <span style={selectIconStyles}>▾</span>
            </div>
        );
    }
    return <Input {...props} type={type} sx={fieldStyles} />;
};

export default InputUI;
