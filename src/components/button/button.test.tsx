import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./";

describe("Button", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders with default props", () => {
    render(<Button label="Click me" />);
    const button = screen.getByRole("button", { name: "Click me" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("text-on-primary");
  });

  it("renders different action variants", () => {
    render(<>
      <Button label="Primary" action="primary" />
      <Button label="Secondary" action="secondary" />
      <Button label="Tertiary" action="tertiary" />
      <Button label="Error" action="error" />
    </>);

    expect(screen.getByText("Primary")).toHaveClass("bg-primary");
    expect(screen.getByText("Secondary")).toHaveClass("bg-secondary");
    expect(screen.getByText("Tertiary")).toHaveClass("bg-tertiary");
    expect(screen.getByText("Error")).toHaveClass("bg-error");
  });

  it("applies size variants", () => {
    render(<>
      <Button label="Small" size="sm" />
      <Button label="Medium" size="md" />
      <Button label="Large" size="lg" />
    </>);

    expect(screen.getByText("Small")).toHaveClass("text-sm");
    expect(screen.getByText("Medium")).toHaveClass("text-base");
    expect(screen.getByText("Large")).toHaveClass("text-lg");
  });

  it("applies outline styles with compound variants", () => {
    render(<Button label="Outlined Primary" action="primary" outline />);
    const btn = screen.getByText("Outlined Primary");

    expect(btn).toHaveClass("border-2");
    expect(btn).toHaveClass("bg-primary-container");
    expect(btn).toHaveClass("border-primary");
    expect(btn).toHaveClass("text-on-primary-container");
  });

  it("renders as disabled", () => {
    render(<Button label="Can't click this" disabled />);
    const btn = screen.getByText("Can't click this");

    expect(btn).toBeDisabled();
    expect(btn).toHaveClass("cursor-not-allowed");
    expect(btn).toHaveClass("!text-on-surface");
    expect(btn).toHaveClass("!bg-gray-500");
  });

  it("handles onClick events", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button label="Click me" onClick={onClick} />);
    const btn = screen.getByText("Click me");

    await user.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not trigger onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button label="Don't click me" disabled onClick={onClick} />);
    const btn = screen.getByText("Don't click me");

    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });
});
