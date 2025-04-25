import { fireEvent, render, screen } from "@testing-library/react";
import Slider from "./index";
import { describe, test, vi } from "vitest";

const mockNext = vi.fn();
const mockPrev = vi.fn();

vi.mock("../../atoms/card-movie", () => ({
  default: ({ data, className }: any) => (
    <div className={className} data-testid="card-movie">
      {data.title}
    </div>
  ),
}));

const dummyData = [
  {
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
  {
    adult: false,
    backdrop_path: "/o7kF3veRvsHB61WmD6BGj21P1UC.jpg",
    genre_ids: [18, 10749],
    id: 1389137,
    original_language: "id",
    original_title: "Komang",
    overview:
      "Fate brought together Ode, a young man from Buton with big dreams, and Ade, a wanderer from Bali. Like two souls in love, they believed that fate would one day unite them. However, their journey was hindered by the presence of another man who shared the same faith as Ade, and Ode had to go to Jakarta to pursue his dreams. Will fate ultimately bring Ode and Ade together?",
    popularity: 6.4801,
    poster_path: "/2RWweAPdSSFzsCtxvjydldneUM6.jpg",
    release_date: "2025-03-31",
    title: "Komang",
    video: false,
    vote_average: 7.3,
    vote_count: 3,
  },
];

describe("Slider Component", () => {
  afterEach(() => {
    vi.resetModules();
  });

  test("renders the title", () => {
    render(<Slider title="Featured" data={[]} isLoading={false} />);
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  test("shows loading skeletons when isLoading is true", () => {
    render(<Slider title="Loading" data={[]} isLoading={true} />);
    const skeletons = screen.getByTestId("slider-loading").children;
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test("shows empty state when no data", () => {
    render(<Slider title="Empty" data={[]} isLoading={false} />);
    expect(screen.getByText(/data not found/i)).toBeInTheDocument();
  });

  test("renders movie cards when data is available", () => {
    render(<Slider title="Now Playing" data={dummyData} isLoading={false} />);
    expect(screen.getByText("Jumbo")).toBeInTheDocument();
    expect(screen.getByText("Komang")).toBeInTheDocument();
  });

  test("renders prev and next button", () => {
    vi.mock("embla-carousel-react", () => ({
      default: () => [
        vi.fn(),
        {
          on: vi.fn(),
          canScrollPrev: () => true,
          canScrollNext: () => true,
          scrollPrev: mockNext,
          scrollNext: mockPrev,
        },
      ],
    }));

    render(<Slider title="Now Playing" data={dummyData} isLoading={false} />);
    const prevButton = screen.getByTestId("slide-prev");
    const nextButton = screen.getByTestId("slide-next");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(prevButton);
    fireEvent.click(nextButton);

    expect(mockNext).toHaveBeenCalled();
    expect(mockPrev).toHaveBeenCalled();
  });

  test("handles emblaApi as undefined gracefully", async () => {
    vi.doMock("embla-carousel-react", () => ({
      default: () => [vi.fn(), undefined],
    }));

    const { default: Slider } = await import("./index");

    render(
      <Slider title="Embla Undefined" data={dummyData} isLoading={false} />
    );

    expect(screen.getByText("Jumbo")).toBeInTheDocument();
    expect(screen.getByText("Komang")).toBeInTheDocument();
  });
});
