import { useQuery } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { LinkProps, useNavigate, useSearchParams } from "react-router-dom";
import { expect, Mock, vi } from "vitest";
import Search from "./index";

const MOVIE_LIST = {
  adult: false,
  backdrop_path: "/5saKQdU7JHNLmcLqVRmHGZ2Zj0E.jpg",
  genre_ids: [27, 53],
  id: 1355126,
  original_language: "id",
  original_title: "Pabrik Gula",
  overview:
    "A group of young men and women who work as seasonal workers in a sugar factory face terror from the kingdom of demons where the factory is located. They must find out the cause of the demons' anger, before the terror ends their lives.",
  popularity: 13.6711,
  poster_path: "/nwmR5EL5m8tcPBud6OwUyt8p5z1.jpg",
  release_date: "2025-03-31",
  title: "Pabrik Gula",
  video: false,
  vote_average: 8.4,
  vote_count: 18,
};

vi.mock("../../integrations/movie", () => ({
  getSearch: { key: "now-playing", fetch: vi.fn() },
}));

vi.mock("@tanstack/react-query", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-query")>();
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

vi.mock("react-router-dom", () => {
  return {
    useSearchParams: vi.fn(),
    useNavigate: vi.fn(),
    useParams: vi.fn(),
    Link: ({ to, ...p }: LinkProps) => <a {...p} href={to as string} />,
  };
});

vi.mock("../../components/atoms/search-bar", () => ({
  default: ({ onSubmit }: any) => (
    <div data-testid="search-bar" onClick={() => onSubmit("search")}>
      Mock Search Bar
    </div>
  ),
}));

const setSearchParamsMock = vi.fn();
const navigateMock = vi.fn();

describe("Search Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders header and movie posters correctly when data is loaded", () => {
    (useQuery as jest.Mock).mockImplementation(() => {
      return { isPending: false, data: { results: [MOVIE_LIST] } };
    });

    // (useNavigate as unknown as Mock).mockReturnValue(navigateMock);
    (useSearchParams as unknown as Mock).mockReturnValue([
      { get: () => "jumbo" },
      vi.fn(),
    ]);

    render(<Search />);

    expect(screen.getByText(/"jumbo"/i)).toBeInTheDocument();
  });

  it("renders loading", () => {
    (useQuery as jest.Mock).mockImplementation(() => {
      return { isPending: true, data: { results: [MOVIE_LIST] } };
    });

    // (useNavigate as unknown as Mock).mockReturnValue(navigateMock);
    (useSearchParams as unknown as Mock).mockReturnValue([
      { get: () => "jumbo" },
      vi.fn(),
    ]);

    render(<Search />);

    expect(screen.getByTestId("loading-list-search")).toBeInTheDocument();
  });

  it("renders loading", () => {
    (useQuery as jest.Mock).mockImplementation(() => {
      return { isPending: false, data: { results: undefined } };
    });

    // (useNavigate as unknown as Mock).mockReturnValue(navigateMock);
    (useSearchParams as unknown as Mock).mockReturnValue([
      { get: () => "jumbo" },
      vi.fn(),
    ]);

    render(<Search />);

    expect(
      screen.getByText("No movies found. Try a different keyword")
    ).toBeInTheDocument();
  });

  it("handle onBack and onSearch", async () => {
    (useQuery as jest.Mock).mockImplementation(() => {
      return { isPending: false, data: { results: undefined } };
    });

    (useNavigate as unknown as Mock).mockReturnValue(navigateMock);
    (useSearchParams as unknown as Mock).mockReturnValue([
      { get: () => "jumbo" },
      setSearchParamsMock,
    ]);

    render(<Search />);

    const searchBar = screen.getByTestId("search-bar");

    fireEvent.click(searchBar);

    expect(setSearchParamsMock).toBeCalled();

    const backButton = await screen.findByText(/Back to Previous Page/i);

    fireEvent.click(backButton);

    expect(navigateMock).toHaveBeenCalledWith(-1);
  });
});
