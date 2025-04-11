import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavItem, type NavItemProps } from "@/components/navItem";
import { Home } from "lucide-react"; // Dummy icon

describe("NavItem", () => {
  const baseProps: NavItemProps = {
    label: "Home",
    route: "/home",
    icon: Home,
  };

  it("renders label correctly", () => {
    render(<NavItem {...baseProps} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders icon if provided", () => {
    render(<NavItem {...baseProps} />);
    const svg = screen.getByRole("img", { hidden: true });
    expect(svg).toBeInTheDocument();
    expect(svg.tagName.toLowerCase()).toBe("svg");
  });

  it("renders with correct variants", () => {
    render(<NavItem {...baseProps} action="secondary" size="lg" active />);
    const container = screen.getByText("Home").closest("div");
    expect(container?.className).toMatch(/bg-secondary-container/);
    expect(container?.className).toMatch(/text-on-secondary-container/);
    expect(container?.className).toMatch(/ring-2/);
  });

  it("does not render icon when not provided", () => {
    render(<NavItem label="No Icon" route="/none" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
