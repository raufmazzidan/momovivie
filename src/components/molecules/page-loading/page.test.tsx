import { render, screen } from "@testing-library/react";
import PageLoading from "./index";

describe("PageLoading", () => {
  test("renders loading text with correct styling", () => {
    render(<PageLoading />);

    const loadingText = screen.getByTestId("page-loading-wordings");
    expect(loadingText).toBeInTheDocument();
    expect(loadingText).toHaveClass("animate-bounce");
  });

  test("contains highlighted momo span", () => {
    render(<PageLoading />);

    const highlighted = screen.getByText("momo");
    expect(highlighted).toBeInTheDocument();
    expect(highlighted).toHaveClass("text-pink-500");
  });
});
