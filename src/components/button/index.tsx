import React from "react";
import { cva, type VariantProps } from "class-variance-authority";


const button = cva("button rounded-2xl hover:opacity-75 text-nowrap", {
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
        outline: {
            true: ["border-2"],
            false: null
        }
    },
    compoundVariants: [
        {
            action: 'primary',
            outline: true,
            className: "bg-primary-container border-primary text-on-primary-container"
        },
        {
            action: 'secondary',
            outline: true,
            className: 'bg-secondary-container border-secondary text-on-secondary-container'
        },
        {
            action: 'tertiary',
            outline: true,
            className: 'bg-tertiary-container border-tertiary text-on-tertiary-container'
        }
    ],
    defaultVariants: {
        disabled: false,
        action: "primary",
        size: "md",
        outline: false
    },
});

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof button> {
    label?: string
}

export function Button({
    label,
    className,
    action,
    size,
    disabled,
    outline,
    type = 'button',
    ...props
}: ButtonProps) {
    return (

        <>
            <button
                type={type}
                className={button({ action, size, disabled, className, outline })}
                disabled={disabled || undefined}
                {...props}
            >
                {label}
            </button>
        </>
    )
};