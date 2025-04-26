import { fireEvent, render, screen } from "@testing-library/react";
import { LinkProps, useNavigate, useParams } from "react-router-dom";
import { beforeEach, describe, it, Mock, vi } from "vitest";

vi.mock("@tanstack/react-query", () => {
  return {
    useQuery: vi.fn(),
  };
});

import { useQuery } from "@tanstack/react-query";
import Home from "./index";

const MOVIE = {
  adult: false,
  backdrop_path: "/8MCBwKgWYaFjedlDHzKTPzl3HTy.jpg",
  belongs_to_collection: null,
  budget: 1200000,
  genres: [
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
  ],
  homepage: "https://www.filmjumbo.com",
  id: 1049082,
  imdb_id: "tt27433995",
  origin_country: ["ID"],
  original_language: "id",
  original_title: "Jumbo",
  overview:
    "Desperate to prove to his peers that he’s more than a chubby kid that never wins at anything, little Don wishes to win his local talent show by performing a stageplay inspired from a storybook written by his late parents. When unfortunately a bully stole that book, at the same time a little ghost appeared from the spirit world asking for Don’s help to reunite her with her parents’ spirits. The two new friends then embark on an exciting adventure to help each other and learn the true meaning of friendship.",
  popularity: 7.9583,
  poster_path: "/8Wzkp1jHJda9M8q96tAfFIbQLvB.jpg",
  production_companies: [
    {
      id: 244636,
      logo_path: "/uIfNrqp08IUH2JHifGLBQI0gOIt.png",
      name: "Visinema Studios",
      origin_country: "ID",
    },
    {
      id: 107948,
      logo_path: null,
      name: "Anami Films",
      origin_country: "ID",
    },
    {
      id: 253136,
      logo_path: null,
      name: "Springboard Entertainment",
      origin_country: "ID",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "ID",
      name: "Indonesia",
    },
  ],
  release_date: "2025-03-31",
  revenue: 12995482,
  runtime: 102,
  spoken_languages: [
    {
      english_name: "Indonesian",
      iso_639_1: "id",
      name: "Bahasa indonesia",
    },
    {
      english_name: "German",
      iso_639_1: "de",
      name: "Deutsch",
    },
  ],
  status: "Released",
  tagline: "",
  title: "Jumbo",
  video: false,
  vote_average: 7.7,
  vote_count: 5,
};

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
  getDetail: { key: "detail-movie", fetch: vi.fn() },
  getRecommendation: { key: "recommendation-movie", fetch: vi.fn() },
}));

vi.mock("@tanstack/react-query", async (importActual) => {
  const actual = await importActual<typeof import("@tanstack/react-query")>();
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});
const navigateMock = vi.fn();

vi.mock("react-router-dom", () => {
  return {
    useNavigate: vi.fn(),
    useParams: vi.fn(),
    Link: ({ to, ...p }: LinkProps) => <a {...p} href={to as string} />,
  };
});

describe("Movie Detail Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading", async () => {
    (useQuery as unknown as Mock).mockImplementation(() => ({
      isPending: true,
      data: null,
    }));

    (useParams as unknown as Mock).mockReturnValue({ movieId: "123" });

    render(<Home />);

    expect(screen.getByTestId("loading-screen-detail")).toBeInTheDocument();
  });

  it("renders detail", async () => {
    (useQuery as unknown as Mock).mockImplementation(({ queryKey }) => {
      if (queryKey[0] === "detail-movie") {
        return { isPending: false, data: MOVIE };
      }
      if (queryKey[0] === "recommendation-movie") {
        return { isPending: false, data: { results: [MOVIE_LIST] } };
      }

      return { isPending: false, data: { results: [] } };
    });

    (useNavigate as unknown as Mock).mockReturnValue(navigateMock);
    (useParams as unknown as Mock).mockReturnValue({ movieId: "123" });

    render(<Home />);

    expect(screen.getByAltText(/poster movie jumbo/i)).toBeInTheDocument();

    expect(
      screen.getByText("Available on: Indonesian, German")
    ).toBeInTheDocument();

    const backButton = await screen.findByText(/Back to Previous Page/i);
    fireEvent.click(backButton);

    expect(navigateMock).toHaveBeenCalledWith(-1);
  });

  it("handle load image poster", async () => {
    (useQuery as unknown as Mock).mockImplementation(({ queryKey }) => {
      if (queryKey[0] === "detail-movie") {
        return { isPending: false, data: { ...MOVIE, adult: true } };
      }
      if (queryKey[0] === "recommendation-movie") {
        return { isPending: false, data: { results: [MOVIE_LIST] } };
      }

      return { isPending: false, data: { results: [] } };
    });

    (useNavigate as unknown as Mock).mockReturnValue(navigateMock);
    (useParams as unknown as Mock).mockReturnValue({ movieId: "123" });

    render(<Home />);
    const img = screen.getByAltText(/poster movie jumbo/i);

    fireEvent.load(img);

    expect((img as HTMLImageElement).style.display).toBe("block");

    fireEvent.error(img);

    expect((img as HTMLImageElement).style.display).toBe("none");
  });

  it("renders recommendation loading", async () => {
    (useQuery as unknown as Mock).mockImplementation(({ queryKey }) => {
      if (queryKey[0] === "detail-movie") {
        return { isPending: false, data: MOVIE };
      }
      if (queryKey[0] === "recommendation-movie") {
        return { isPending: true, data: { results: [MOVIE_LIST] } };
      }

      return { isPending: false, data: { results: [] } };
    });

    render(<Home />);

    expect(screen.getByTestId("recommendation-loading")).toBeInTheDocument();
  });

  it("renders recommendation empty", async () => {
    (useQuery as unknown as Mock).mockImplementation(({ queryKey }) => {
      if (queryKey[0] === "detail-movie") {
        return { isPending: false, data: MOVIE };
      }
      if (queryKey[0] === "recommendation-movie") {
        return { isPending: false, data: { results: [] } };
      }

      return { isPending: false, data: { results: [] } };
    });

    render(<Home />);

    expect(
      screen.queryByTestId("recommendation-loading")
    ).not.toBeInTheDocument();
  });

  it("renders 404", async () => {
    (useParams as unknown as Mock).mockReturnValue({ movieId: "a" });
    (useQuery as unknown as Mock).mockImplementation(() => ({
      isPending: false,
      data: null,
    }));

    render(<Home />);

    expect(await screen.getByText("404")).toBeInTheDocument();
  });
});
