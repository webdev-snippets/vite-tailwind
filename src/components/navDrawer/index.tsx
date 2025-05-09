import { Drawer } from "vaul";
import { NavItem, NavItemProps } from "@/components/navItem";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Add this for hidden accessibility text

export interface NavDrawerProps {
  items: NavItemProps[];
  onItemClick?: (item: NavItemProps) => void;
  children: React.ReactNode;
  pathname: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function NavDrawer({ items, onItemClick, open, onOpenChange, children, pathname, ...props }: NavDrawerProps) {
  return (
    <Drawer.Root direction="left" open={open} onOpenChange={onOpenChange} {...props}>
      <Drawer.Trigger asChild>
        {children}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="fixed left-0 top-0 h-full w-[80px] sm:w-[200px] bg-surface-container shadow-lg p-4 flex flex-col gap-4"
          aria-describedby="drawer-description"
        >
          <Drawer.Title>
            <VisuallyHidden>Navigation Menu</VisuallyHidden>
          </Drawer.Title>
          <Drawer.Description id="drawer-description">
            <VisuallyHidden>Choose a page to navigate to</VisuallyHidden>
          </Drawer.Description>

          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div key={item.route} onClick={() => onItemClick?.(item)}>
                <NavItem {...item} active={pathname === item.route} />
              </div>
            ))}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
