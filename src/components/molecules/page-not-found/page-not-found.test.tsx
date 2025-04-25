import { render, screen } from "@testing-library/react";
import PageNotFound from "./index";

describe("PageNotFound", () => {
  test("renders page not found text with correct styling", () => {
    render(<PageNotFound />);

    const text404 = screen.getByText("404");
    expect(text404).toBeInTheDocument();
    expect(text404).toHaveClass("text-pink-500");

    const textNotFound = screen.getByText("Page Not Found");
    expect(textNotFound).toBeInTheDocument();
  });
});
