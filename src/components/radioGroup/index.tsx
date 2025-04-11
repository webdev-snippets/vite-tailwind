import React from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";


const radioitem = cva("radioItem  rounded-2xl", {
    variants: {
        action: {
            primary: ["bg-primary", "text-on-primary",],
            secondary: ["bg-secondary", "text-on-secondary",],
            tertiary: ["bg-tertiary", "text-on-tertiary",],
            error: ["bg-error", "text-on-error",],
        },
        disabled: {
            false: null,
            true: ["opacity-80", "cursor-not-allowed", "!text-on-surface", "border-gray-400", "!bg-gray-500"],
        },
    },

    defaultVariants: {
        disabled: false,
        action: "primary",
    },
});

export interface RadioItemProps
    extends Omit<React.ComponentProps<typeof RadioGroupPrimitive.Item>, 'disabled'>,
    VariantProps<typeof radioitem> { }

export interface RadioGroupProps extends React.ComponentProps<typeof RadioGroupPrimitive.Root> {
    radioItems: RadioItemProps[]
}


export function RadioGroup({ radioItems, ...props }: RadioGroupProps) {
    return (
        <>
            <RadioGroupPrimitive.Root {...props} className="flex flex-col gap-2 bg-surface-container p-2 rounded-lg">
                {radioItems.map((_) => {
                    return (
                        <div key={_.id} role="radiobutton" className={cx(radioitem({ action: _.action, disabled: props.disabled }), "flex items-center gap-2 border-2 rounded-full p-2")}>
                            <RadioGroupPrimitive.Item id={_.id} key={_.id} value={_.value} className={cx("","size-6")} >
                                <RadioGroupPrimitive.Indicator key={_.id} className=" flex size-3 rounded-full  bg-black" />
                            </RadioGroupPrimitive.Item>
                            <label key={_.id + '-label'} htmlFor={_.id}>
                                {_.value}
                            </label>
                        </div>
                    )
                })}
            </RadioGroupPrimitive.Root>
        </>
    )
} 