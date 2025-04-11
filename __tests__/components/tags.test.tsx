import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Tag, type TagProps } from "@/components/tags"; // adjust the path if needed

describe("Tag component", () => {
  const baseTag: TagProps = {
    label: "Test Tag",
    action: "primary",
    size: "md",
    disabled: false,
  };

  it("renders tag with label", () => {
    render(<Tag {...baseTag} />);
    expect(screen.getByRole("tag")).toHaveTextContent("Test Tag");
  });

  it("applies correct class for size and action", () => {
    render(<Tag {...baseTag} />);
    const tag = screen.getByRole("tag");
    expect(tag.className).toContain("bg-primary");
    expect(tag.className).toContain("text-on-primary");
    expect(tag.className).toContain("text-base");
  });

  it("renders disabled style when disabled is true", () => {
    render(<Tag {...baseTag} disabled />);
    const tag = screen.getByRole("tag");
    expect(tag.className).toContain("cursor-not-allowed");
    expect(tag.className).toContain("!bg-gray-500");
  });

  it("applies custom className", () => {
    render(<Tag {...baseTag} className="custom-class" />);
    expect(screen.getByRole("tag").className).toContain("custom-class");
  });
});
