import { render, screen } from "@testing-library/react";
import Tag from "./index";

describe("Tag", () => {
  test("renders with default size styles", () => {
    render(<Tag>Action</Tag>);
    const tag = screen.getByText("Action");

    expect(tag).toHaveClass("bg-pink-500");
    expect(tag).toHaveClass("px-1", "rounded-xs", "text-xs");
  });

  test("renders with large size styles", () => {
    render(<Tag size="lg">Drama</Tag>);
    const tag = screen.getByText("Drama");

    expect(tag).toHaveClass("px-2", "py-0.5", "rounded-sm", "text-sm");
  });

  test("applies custom className", () => {
    render(<Tag className="text-white">Comedy</Tag>);
    const tag = screen.getByText("Comedy");

    expect(tag).toHaveClass("text-white");
  });

  test("spreads additional props", () => {
    render(<Tag data-testid="custom-tag">Sci-Fi</Tag>);
    const tag = screen.getByTestId("custom-tag");

    expect(tag).toBeInTheDocument();
    expect(tag).toHaveTextContent("Sci-Fi");
  });
});
