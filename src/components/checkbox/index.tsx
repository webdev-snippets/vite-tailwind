import React from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

const checkbox = cva("checkbox rounded-md hover:opacity-75", {
    variants: {
        action: {
            primary: ["bg-primary", "text-on-primary"],
            secondary: ["bg-secondary", "text-on-secondary"],
            tertiary: ["bg-tertiary", "text-on-tertiary"],
            error: ["bg-error", "text-on-error"],
        },
        size: {
            sm: ["text-sm", "py-1", "px-2"],
            md: ["text-base", "py-2", "px-4"],
            lg: ["text-lg", "py-2", "px-6"],
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

const checkboxContainer = cva("flex items-center p-2 rounded-md border-1", {
    variants: {
        action: {
            primary: ["bg-primary-container", "text-on-primary-container", "border-on-primary-container"],
            secondary: ["bg-secondary-container", "text-on-secondary-container", "border-on-secondary-container"],
            tertiary: ["bg-tertiary-container", "text-on-tertiary-container", "border-on-tertiary-container"],
            error: ["bg-error-container", "text-on-error-container", "border-on-error-container"],
        },
        disabled: {
            true: ["!bg-gray-200", "!border-gray-500"],
            false: null,
        },
        size: {
            sm: ["text-sm", "py-1", "px-2"],
            md: ["text-base", "py-2", "px-4"],
            lg: ["text-lg", "py-2", "px-6"],
        },
    },
    defaultVariants: {
        action: "primary",
        disabled: false,
        size: "md",
    },
});

export interface CheckboxProps
    extends Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, 'disabled'>,
        VariantProps<typeof checkbox> {
    label: string;
    disabled?: boolean;
}

export function Checkbox({
    action,
    disabled = false,
    size,
    label,
    ...props
}: CheckboxProps) {
    return (
        <div className={checkboxContainer({ action, disabled, size })}>
            <CheckboxPrimitive.Root
                className={cx(
                    checkbox({ action, disabled, size }),
                    "flex size-[25px] appearance-none items-center justify-center rounded outline-none"
                )}
                disabled={disabled}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : 0}
                {...props}
            >
                <CheckboxPrimitive.Indicator>
                    <CheckIcon />
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
            <label className="pl-[15px] text-[15px] leading-none">{label}</label>
        </div>
    );
}
