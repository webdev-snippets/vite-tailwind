import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextInput, type TextInputProps } from "@/components/textInput"; // adjust import if needed

describe("TextInput component", () => {
  const baseProps: TextInputProps = {
    label: "Username",
    required: true,
    action: "primary",
    size: "md",
  };

  it("renders input with label", () => {
    render(<TextInput {...baseProps} />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("shows the required icon when required is true", () => {
    render(<TextInput {...baseProps} />);
    expect(screen.getByRole('img')).toBeInTheDocument(); // lucide icons default to `data-testid="lucide-iconname"`
  });

  it("does not show the required icon when required is false", () => {
    render(<TextInput {...baseProps} required={false} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("handles input changes", async () => {
    const user = userEvent.setup();
    render(<TextInput {...baseProps} />);
    const input = screen.getByLabelText("Username") as HTMLInputElement;
    await user.type(input, "dev");
    expect(input).toHaveValue("dev");
  });

  it("applies disabled styles and disables input", () => {
    render(<TextInput {...baseProps} disabled />);
    const input = screen.getByLabelText("Username");
    expect(input).toBeDisabled();
    expect(input.className).toContain("cursor-not-allowed");
    expect(input.className).toContain("!bg-gray-500");
  });

  it("supports different types", () => {
    render(<TextInput {...baseProps} type="email" />);
    const input = screen.getByLabelText("Username");
    expect(input).toHaveAttribute("type", "email");
  });
});
