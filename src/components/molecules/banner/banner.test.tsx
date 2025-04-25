import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Banner from "./index";
import { vi } from "vitest";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Banner", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    mockNavigate.mockClear();
  });

  test("renders banner with correct text and background", () => {
    render(
      <MemoryRouter>
        <Banner />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Only the Hits. No Flops. Just Great Movies./i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/search for a movie/i)
    ).toBeInTheDocument();
  });

  test("calls navigate with search query when search is submitted", () => {
    render(
      <MemoryRouter>
        <Banner />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search for a movie/i);
    const form = input.closest("form")!;

    fireEvent.change(input, { target: { value: "Interstellar" } });
    fireEvent.submit(form);

    expect(mockNavigate).toHaveBeenCalledWith("/search?q=Interstellar");
  });
});
