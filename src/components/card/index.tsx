import React from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { Button } from "@/components/button";
import { Tag } from "@/components/tags";




const card = cva("card rounded-md text-pretty overflow-hidden ", {
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
        }
    },
    defaultVariants: {
        action: "primary",
        size: "md",
    },
});

const cardcontainer = cva("bg-surface-container-highest text-on-surface rounded-lg p-5 flex flex-col", {
    variants: {
        elevated: {
            true: ["shadow-2xl shadow-shadow"],
            false: null
        }
    },
    defaultVariants:{
        elevated: false
    }
})

export interface CardProps
    extends VariantProps<typeof card>, VariantProps<typeof cardcontainer> {
    title: string
    imageSrc?: string
    price: number 
    imageAlt?: string
    className?: string
    children: React.ReactNode
    tags: string[]
    onClick?: () => void
}


export function Card({ action, tags, title, size, price, elevated, className, imageSrc, imageAlt, onClick, children, ...props }: CardProps) {
    return (
        <div  className={cx(cardcontainer({elevated}), className)} {...props} role="card">
            <h1 className="text-lg text-bold">{title}</h1>
            <div className="flex flex-row gap-1 justify-start">
            {
                tags.map((_)=>{
                    return (
                        <Tag label={_} key={_} action={action}  />
                    )
                })
            }
            </div>
            <div className="flex-row flex gap-1">
            <div className={card({action, size})}>
                <div className="flex flex-row gap-2">

                {children}
                {
                    !imageSrc && <Button action={action} outline={true} size={size} onClick={onClick} label={"See more"} />
                }
                </div>
            </div>
            {
                imageSrc && <img className="rounded-md object-center w-60" src={imageSrc} alt={imageAlt} ></img>
            }
            </div>
            <Tag className="max-w-20 mt-1 text-right" label={price.toString()} action={'secondary'} />
        </div>

    )
} 