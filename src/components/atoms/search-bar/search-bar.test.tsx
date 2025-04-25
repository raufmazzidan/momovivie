import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./index";
import { vi } from "vitest";

describe("SearchBar", () => {
  const mockSubmit = vi.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  test("renders input with placeholder and default value", () => {
    render(<SearchBar onSubmit={mockSubmit} defaultValue="Batman" />);

    const input = screen.getByPlaceholderText(/search for a movie/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("Batman");
  });

  test("calls onSubmit with correct value when form is submitted", () => {
    render(<SearchBar onSubmit={mockSubmit} />);

    const input = screen.getByPlaceholderText(/search for a movie/i);
    const form = input.closest("form")!;

    fireEvent.change(input, { target: { value: "Inception" } });
    fireEvent.submit(form);

    expect(mockSubmit).toHaveBeenCalledWith("Inception");
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  test("calls onSubmit when search button is clicked", () => {
    render(<SearchBar onSubmit={mockSubmit} />);

    const input = screen.getByPlaceholderText(/search for a movie/i);
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Oppenheimer" } });
    fireEvent.click(button);

    expect(mockSubmit).toHaveBeenCalledWith("Oppenheimer");
  });
});
