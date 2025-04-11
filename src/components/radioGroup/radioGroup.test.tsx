import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioGroup, RadioItemProps } from "./";

describe("RadioGroup", () => {
    const items: RadioItemProps[] = [
        { id: "option-1", value: "Option 1", action: "primary" },
        { id: "option-2", value: "Option 2", action: "secondary" },
        { id: "option-3", value: "Option 3", action: "tertiary" }
      ];
      

  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("renders all radio items with labels", () => {
    render(<RadioGroup radioItems={items} />);
    items.forEach(({ value }) => {
      expect(screen.getByLabelText(value)).toBeInTheDocument();
    });
  });

  it("allows selecting a radio option", async () => {
    render(<RadioGroup radioItems={items} />);
    const option = screen.getByLabelText("Option 2");

    await user.click(option);
    expect((option as HTMLInputElement)).toBeChecked()
  });

  it("only allows one selection at a time", async () => {
    render(<RadioGroup radioItems={items} />);
    const opt1 = screen.getByLabelText("Option 1");
    const opt2 = screen.getByLabelText("Option 2");

    await user.click(opt1);
    expect((opt1 as HTMLInputElement)).toBeChecked()

    await user.click(opt2);
    expect((opt2 as HTMLInputElement)).toBeChecked()
    expect((opt1 as HTMLInputElement)).not.toBeChecked();
  });

  it("disables interaction when parent is disabled", async () => {
    render(<RadioGroup radioItems={items} disabled />);
    const opt1 = screen.getByLabelText("Option 1");

    await user.click(opt1);
    // Radix UI disabled inputs can't be clicked, so we check that it's not selected
    expect((opt1 as HTMLInputElement)).not.toBeChecked()
  });
});
