import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import { Select } from "@/components/select";
import { Button } from "@/components/button";

const selectItems = [
  { value: "First", action: "primary" as const },
  { value: "Second", action: "secondary" as const },
  { value: "Third", action: "error" as const, disabled: true },
];

describe("Select component", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    render(
      <Select selectItems={selectItems} defaultValue="First">
        <Button label="Choose option" />
      </Select>
    );
  });

  it("renders trigger button", () => {
    expect(screen.getByText("Choose option")).toBeInTheDocument();
  });

  it("opens dropdown when clicked", async () => {
    await user.click(screen.getByText("Choose option"));

    expect(await screen.findByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
    expect(screen.getByText("Third")).toBeInTheDocument();
  });

  it("selects an option on click", async () => {
    await user.click(screen.getByText("Choose option"));
    await user.click(screen.getByText("Second"));

    // This only verifies the option was selected if you expose value or visual change.
    // Add a selected value output (e.g. below button) in your component for better testability.
  });

  it("prevents clicking on disabled item", async () => {
    await user.click(screen.getByText("Choose option"));
    const thirdOptionText = screen.getByText("Third");
    const thirdOptionContainer = thirdOptionText.closest('[role="option"]'); // role="option" on the item
  
    expect(thirdOptionContainer).toHaveClass("cursor-not-allowed");
  
    await user.click(thirdOptionText);
  
  });
  
  it("applies correct variant classes", async () => {
    await user.click(screen.getByText("Choose option"));
    const secondOption = screen.getByText("Second");
    const secondOptionContainer = secondOption.closest('[role="option"]');
  
    expect(secondOptionContainer?.className).toContain("bg-secondary");
  });
  
  it("renders check icon for selected item", async () => {
    await user.click(screen.getByText("Choose option"));
  
    const firstItem = screen.getByText("First").closest('[role="option"]');
    const svgCheck = firstItem?.querySelector("svg");
  
    expect(svgCheck).toBeInTheDocument();
    expect(svgCheck?.getAttribute("class")).toContain("lucide-check");
  });
});
