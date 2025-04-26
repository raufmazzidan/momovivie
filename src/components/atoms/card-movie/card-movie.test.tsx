import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { GENRE } from "../../../constant/movie";
import CardMovie, { CardMovieProps } from "./index";

const mockProps: CardMovieProps = {
  data: {
    adult: false,
    backdrop_path: "/8MCBwKgWYaFjedlDHzKTPzl3HTy.jpg",
    genre_ids: [16, 35, 18, 10751, 14],
    id: 1049082,
    original_language: "id",
    original_title: "Jumbo",
    overview:
      "Desperate to prove to his peers that he’s more than a chubby kid that never wins at anything, little Don wishes to win his local talent show by performing a stageplay inspired from a storybook written by his late parents. When unfortunately a bully stole that book, at the same time a little ghost appeared from the spirit world asking for Don’s help to reunite her with her parents’ spirits. The two new friends then embark on an exciting adventure to help each other and learn the true meaning of friendship.",
    popularity: 7.9583,
    poster_path: "/8Wzkp1jHJda9M8q96tAfFIbQLvB.jpg",
    release_date: "2025-03-31",
    title: "Jumbo",
    video: false,
    vote_average: 7.7,
    vote_count: 5,
  },
};

describe("CardMovie", () => {
  test("renders movie card with correct title and image", () => {
    render(
      <MemoryRouter>
        <CardMovie {...mockProps} />
      </MemoryRouter>
    );

    const image = screen.getByAltText(/Poster Movie Jumbo/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w342//8Wzkp1jHJda9M8q96tAfFIbQLvB.jpg"
    );

    expect(screen.getByText("Jumbo")).toBeInTheDocument();
  });

  test("renders correct age tag based on 'adult' value", () => {
    render(
      <MemoryRouter>
        <CardMovie
          data={{
            ...mockProps.data,
            adult: true,
          }}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("18+")).toBeInTheDocument();
  });

  test("renders up to 3 genre tags", () => {
    render(
      <MemoryRouter>
        <CardMovie {...mockProps} />
      </MemoryRouter>
    );

    mockProps.data.genre_ids.slice(0, 3).forEach((id) => {
      expect(screen.getByText(GENRE[id])).toBeInTheDocument();
    });
  });

  test("displays release date text", () => {
    render(
      <MemoryRouter>
        <CardMovie {...mockProps} />
      </MemoryRouter>
    );

    const releaseDate = screen.getByText(
      /ago|just now|hour|minute|day|month|year/i
    );
    expect(releaseDate).toBeInTheDocument();
  });
  test("sets display to block on image load", () => {
    render(
      <MemoryRouter>
        <CardMovie {...mockProps} />
      </MemoryRouter>
    );

    const img = screen.getByAltText(/poster movie jumbo/i);

    fireEvent.load(img);

    expect((img as HTMLImageElement).style.display).toBe("block");
  });

  test("sets display to none on image error", () => {
    render(
      <MemoryRouter>
        <CardMovie {...mockProps} />
      </MemoryRouter>
    );

    const img = screen.getByAltText(/poster movie jumbo/i);

    fireEvent.error(img);

    expect((img as HTMLImageElement).style.display).toBe("none");
  });
});
