import { cva, cx, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";

const navItemContainer = cva("flex items-center gap-2 rounded-md border px-3 py-2 transition-colors", {
  variants: {
    action: {
      primary: ["bg-primary-container", "text-on-primary-container", "border-on-primary-container"],
      secondary: ["bg-secondary-container", "text-on-secondary-container", "border-on-secondary-container"],
      tertiary: ["bg-tertiary-container", "text-on-tertiary-container", "border-on-tertiary-container"],
    },
    size: {
      sm: ["text-sm", "p-1"],
      md: ["text-base", "p-2"],
      lg: ["text-lg", "p-4"],
    },
    active: {
      true: ["ring-2 ring-offset-2 ring-primary"],
      false: [],
    },
  },
  defaultVariants: {
    action: "primary",
    size: "md",
    active: false,
  },
});

export interface NavItemProps extends VariantProps<typeof navItemContainer> {
  label: string;
  icon?: LucideIcon;
  route: string; // Add route property
}

export function NavItem({ label, icon: Icon, action, size, active }: NavItemProps) {
  return (
    <div className={cx(navItemContainer({ action, size, active }), "shrink-0")}>
      { Icon && <Icon role='img' className="w-5 h-5" /> }
     <span className="hidden sm:inline">{label}</span>
    </div>
  );
}