import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Card } from "./";

describe("Card", () => {
  const baseProps = {
    title: "Cool Product",
    tags: ["New", "Hot"],
    price: 49.99,
    children: <p>Some cool description here</p>,
  };

  beforeEach(() => {
    cleanup();
  });

  it("renders title, tags, price and children", () => {
    render(<Card {...baseProps} />);

    expect(screen.getByRole("card")).toBeInTheDocument();
    expect(screen.getByText("Cool Product")).toBeInTheDocument();
    expect(screen.getByText("49.99")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("Hot")).toBeInTheDocument();
    expect(screen.getByText("Some cool description here")).toBeInTheDocument();
  });

  it("renders image if imageSrc is provided", () => {
    render(
      <Card
        {...baseProps}
        imageSrc="https://via.placeholder.com/150"
        imageAlt="Product image"
      />
    );

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://via.placeholder.com/150");
    expect(img).toHaveAttribute("alt", "Product image");
  });

  it("renders 'See more' button if no imageSrc is provided", () => {
    render(<Card {...baseProps} />);
    expect(screen.getByRole("button", { name: "See more" })).toBeInTheDocument();
  });

  it("calls onClick when 'See more' is clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Card {...baseProps} onClick={onClick} />);
    const button = screen.getByRole("button", { name: "See more" });

    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies elevated styles when elevated is true", () => {
    render(<Card {...baseProps} elevated />);
    const card = screen.getByRole("card");
    expect(card).toHaveClass("shadow-2xl");
  });

  it("renders correct action and size styles", () => {
    render(
      <Card
        {...baseProps}
        action="tertiary"
        size="lg"
      />
    );

    const button = screen.getByRole("button", { name: "See more" });
    expect(button).toHaveClass("bg-tertiary");
    expect(button).toHaveClass("text-on-tertiary");
    expect(button).toHaveClass("text-lg");
  });

  it("does not render button if image is shown", () => {
    render(
      <Card
        {...baseProps}
        imageSrc="https://via.placeholder.com/150"
      />
    );

    expect(screen.queryByRole("button", { name: "See more" })).not.toBeInTheDocument();
  });
});
