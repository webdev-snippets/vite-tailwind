import React from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { Select as SelectPrimitive } from "radix-ui";
import { CheckIcon } from "lucide-react";


const selectitem = cva("selectItem  rounded-2xl ", {
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

export interface SelectItemProps
    extends Omit<React.ComponentProps<typeof SelectPrimitive.Item>, 'disabled'>,
    VariantProps<typeof selectitem> { }

export interface SelectProps extends React.ComponentProps<typeof SelectPrimitive.Root> {
    selectItems: SelectItemProps[]
    children: React.ReactNode
    // className?: string
}


export function Select({ selectItems, children, ...props }: SelectProps) {
    return (
        <>
            <SelectPrimitive.Root {...props}>
                <SelectPrimitive.Trigger asChild>
                    {children} 
                </SelectPrimitive.Trigger>
                {/* <SelectPrimitive.Portal > */}
                    <SelectPrimitive.Content >
                        <SelectPrimitive.Viewport>
                            {selectItems.map((_) => {
                                // console.log(_.value)
                                return (
                                    <div key={_.value}  className={cx(selectitem({ action: _.action, disabled: props.disabled }), "items-center gap-2 border-2 rounded-full p-2")}>
                                        <SelectPrimitive.Item id={_.value} key={_.value + '-item'} value={_.value} className={selectitem({action: _.action, disabled:  _.disabled})} >
                                            <div className="flex flex-row gap-2 justify-end">
                                            <SelectPrimitive.ItemIndicator key={_.value + '-indicator'} className="" asChild>
                                                <CheckIcon />
                                            </SelectPrimitive.ItemIndicator>
                                            <SelectPrimitive.ItemText key={_.value + '-text'} asChild >
                                            <p>
                                                {_.value}
                                            </p>
                                            </SelectPrimitive.ItemText>
                                            </div>
                                        </SelectPrimitive.Item>
                                    </div>
                                )
                            })}
                        </SelectPrimitive.Viewport>
                    </SelectPrimitive.Content>
                {/* </SelectPrimitive.Portal> */}
            </SelectPrimitive.Root>
        </>
    )
} 