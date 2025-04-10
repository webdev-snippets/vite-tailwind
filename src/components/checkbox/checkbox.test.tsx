import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./";

describe("Checkbox", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders with label", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("can be checked and unchecked", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Subscribe" />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("renders with correct action and size classes", () => {
    render(<Checkbox label="Styled" action="tertiary" size="lg" />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveClass("bg-tertiary");
    expect(checkbox).toHaveClass("text-on-tertiary");
    expect(checkbox).toHaveClass("text-lg");
  });

  it("applies disabled styles and prevents interaction", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Can't touch this" disabled />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeDisabled(); // Radix handles this via aria-disabled or tabIndex
    expect(checkbox).toHaveClass("cursor-not-allowed");
    expect(checkbox).toHaveClass("!bg-gray-500");

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("calls onCheckedChange if provided", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(<Checkbox label="Notify me" onCheckedChange={onCheckedChange} />);

    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);
    expect(onCheckedChange).toHaveBeenCalledWith(true);

    await user.click(checkbox);
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });
});
