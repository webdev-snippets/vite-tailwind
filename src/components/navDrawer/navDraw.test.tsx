import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NavDrawer} from "./";

// Mock NavItem so we don’t need to test its internals
vi.mock("@/components/navItem", () => ({
  NavItem: ({ label, active }: { label: string; active?: boolean }) => (
    <div data-testid="nav-item">{label}{active ? " (active)" : ""}</div>
  ),
}));



const items = [
  { label: "Home", route: "/" },
  { label: "Profile", route: "/profile" },
  { label: "Settings", route: "/settings" },
];

describe("NavDrawer", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders nav items", () => {
    render(
      <NavDrawer items={items} pathname="/" open={true}>
        <button type="button">Open</button>
      </NavDrawer>
    );

    expect(screen.getAllByTestId("nav-item")).toHaveLength(3);
    expect(screen.getByText("Home (active)")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("calls onItemClick when item is clicked", async () => {
    const user = userEvent.setup();
    const onItemClick = vi.fn();

    render(
      <NavDrawer items={items} pathname="/" open={true} onItemClick={onItemClick}>
        <button type="button">Open</button>
      </NavDrawer>
    );

    const profileItem = screen.getByText("Profile");
    await user.click(profileItem);

    expect(onItemClick).toHaveBeenCalledWith({ label: "Profile", route: "/profile" });
  });

  it("toggles open state with trigger", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <NavDrawer
        items={items}
        pathname="/"
        open={false}
        onOpenChange={onOpenChange}
      >
        <button type="button">Trigger</button>
      </NavDrawer>
    );

    const trigger = screen.getByRole("button", { name: "Trigger" });
    await user.click(trigger);

    // `vaul` handles internal state, but for controlled components, onOpenChange should fire
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("renders closed when open is false", () => {
    render(
      <NavDrawer items={items} pathname="/" open={false}>
        <button type="button">Trigger</button>
      </NavDrawer>
    );

    // Content shouldn't be visible
    const navItem = screen.queryByText("Home");
    expect(navItem).not.toBeInTheDocument();
  });
});
