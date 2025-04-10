import { cva, cx, VariantProps } from "class-variance-authority";

const tag = cva("tag rounded-full hover:opacity-75 mb-1 overflow-hidden", {
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

export interface TagProps
    extends VariantProps<typeof tag> {
    label: string
    className?: string
}

export function Tag({action, disabled, size, label, className, ...props}: TagProps) {
    return(
        <div {...props} className={cx(tag({action, disabled, size}), className)} role="tag">
            {label}
        </div>
    )
}
