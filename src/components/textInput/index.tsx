import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AsteriskIcon } from "lucide-react";


const textInput = cva("textInput rounded-2xl  text-nowrap", {
    variants: {
        action: {
            primary: ["bg-primary", "text-on-primary",],
            secondary: ["bg-secondary", "text-on-secondary",],
            tertiary: ["bg-tertiary", "text-on-tertiary",],
            error: ["bg-error", "text-on-error",],
        },
        size: {
            sm: ["text-sm", "py-1", "px-2"],
            md: ["text-base", "py-2", "px-4"],
            lg: ["text-lg", "py-2", "px-6"]
        },
        disabled: {
            false: null,
            true: ["opacity-80", "cursor-not-allowed", "!text-on-surface", "border-gray-400", "!bg-gray-500"],
        },

    },
    defaultVariants: {
        disabled: false,
        action: "primary",
        size: "md",
    },
});


export interface TextInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "disabled" | "size">,
    VariantProps<typeof textInput> {
    label?: string;
    className?: string;
    type?: "text" | "email" | "password"
    required?: boolean
}


export const TextInput: React.FC<TextInputProps> = ({
    label,
    className,
    action,
    size,
    disabled,
    type = 'text',
    required,
    ...props
}) => (
    <>
        <div className="flex flex-col bg-surface-container-low rounded-lg p-2">
            <label className={"text-bold text-on-surface"} id={label + 'label'} htmlFor={label + 'input'}>{label}</label>
            <div className="flex flex-row items-center">

                <input
                    id={label + 'input'}
                    type={type}
                    role='textbox'
                    aria-labelledby={label + 'label'}
                    className={textInput({ action, size, disabled, className, })}
                    disabled={disabled || undefined}
                    {...props}
                />
                {
                    required && <AsteriskIcon role="img"/>
                }
            </div>
        </div>
    </>
);