import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DateInput } from "@/components/dateInput";
import { vi } from "vitest";

describe("DateInput", () => {
  it("renders with label", () => {
    render(<DateInput label="Start Date" />);
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  });

  it("shows required icon when required is true", () => {
    render(<DateInput label="Due" required />);
    expect(screen.getByRole("img")).toBeInTheDocument(); // AsteriskIcon
  });

  it("does not show required icon when required is false", () => {
    render(<DateInput label="Due" required={false} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("applies the correct variant classes", () => {
    render(<DateInput label="Deadline" action="error" size="lg" />);
    const input = screen.getByLabelText("Deadline");
    expect(input).toHaveClass("bg-error");
    expect(input).toHaveClass("text-on-error");
    expect(input).toHaveClass("text-lg");
  });

  it("handles disabled state", async () => {
    render(<DateInput label="Time" disabled />);
    const input = screen.getByLabelText("Time");
    expect(input).toBeDisabled();
    expect(input).toHaveClass("cursor-not-allowed");
  });

  it("calls onChange handler", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<DateInput label="Meeting" onChange={onChange} />);
    const input = screen.getByLabelText("Meeting");

    await user.type(input, "2024-12-31T12:00");
    expect(onChange).toHaveBeenCalled();
    expect((input as HTMLInputElement).value).toBe("2024-12-31T12:00");
  });
});
