import { render, screen } from "@testing-library/react";
import { Mock, vi } from "vitest";
import { useQuery } from "@tanstack/react-query";
import Home from "./index";

vi.mock("../../components/molecules/banner", () => ({
  default: () => <div data-testid="banner">Banner</div>,
}));

vi.mock("../../components/molecules/slider", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="slider">{title}</div>
  ),
}));

vi.mock("../../integrations/movie", () => ({
  getNowPlaying: { key: "now-playing", fetch: vi.fn() },
  getPopular: { key: "popular", fetch: vi.fn() },
  getPopularIndo: { key: "popular-indo", fetch: vi.fn() },
}));

vi.mock("@tanstack/react-query", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-query")>();
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

describe("Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Banner and all Sliders correctly when data is loaded", () => {
    (useQuery as Mock).mockImplementation(({ queryKey }) => {
      if (queryKey[0] === "now-playing") {
        return { isPending: false, data: { results: [{ id: 1 }] } };
      }
      if (queryKey[0] === "popular") {
        return { isPending: false, data: { results: [{ id: 2 }] } };
      }
      if (queryKey[0] === "popular-indo") {
        return { isPending: false, data: { results: [{ id: 3 }] } };
      }
      return { isPending: true, data: { results: [] } };
    });

    render(<Home />);

    expect(screen.getByTestId("banner")).toBeInTheDocument();

    const sliders = screen.getAllByTestId("slider");
    expect(sliders).toHaveLength(3);

    expect(sliders[0]).toHaveTextContent("Now Playing");
    expect(sliders[1]).toHaveTextContent("Trending Now");
    expect(sliders[2]).toHaveTextContent("Indonesian Movies");
  });

  it("renders loading state correctly when data is pending", () => {
    (useQuery as Mock).mockImplementation(() => ({
      isPending: true,
      data: { results: [] },
    }));

    render(<Home />);

    expect(screen.getByTestId("banner")).toBeInTheDocument();
    const sliders = screen.getAllByTestId("slider");
    expect(sliders).toHaveLength(3);

    expect(sliders[0]).toHaveTextContent("Now Playing");
    expect(sliders[1]).toHaveTextContent("Trending Now");
    expect(sliders[2]).toHaveTextContent("Indonesian Movies");
  });

  it("renders safely when data is undefined", () => {
    (useQuery as Mock).mockImplementation(() => ({
      isPending: false,
      data: undefined,
    }));

    render(<Home />);

    expect(screen.getByTestId("banner")).toBeInTheDocument();
    const sliders = screen.getAllByTestId("slider");
    expect(sliders).toHaveLength(3);

    expect(sliders[0]).toHaveTextContent("Now Playing");
    expect(sliders[1]).toHaveTextContent("Trending Now");
    expect(sliders[2]).toHaveTextContent("Indonesian Movies");
  });
});
