import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useArrowButton } from "./slider.hooks";
import { SliderProps } from "./slider.types";
import { dateFormatFromNow } from "../../../helper/date";
import cn from "../../../helper/cn";

function convertGenres(data: { id: number; name: string }[]) {
  return data.reduce((acc: Record<number, string>, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {} as Record<number, string>);
}

const GENRE = convertGenres([
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
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
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
]);

export default function Slider(props: SliderProps) {
  const { data, title } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 1,
    align: "start",
    dragFree: true,
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = useArrowButton(emblaApi);

  return (
    <section className="px-4 lg:px-10 mb-8">
      <h2 className="font-medium text-sm lg:text-xl underline decoration-pink-500 underline-offset-3 lg:underline-offset-4">
        {title}
      </h2>
      <div className="relative mt-3 lg:mt-4">
        <div className="overflow-x-hidden" ref={emblaRef}>
          <div className="backface-hidden flex touch-pan-y ml-[calc(4px*-1)] lg:ml-[calc(12px*-1)]">
            {data.map(
              ({ src, title, release_date, adult, genre_ids }, index) => (
                <div
                  className="flex-[0_0_30%] md:flex-[0_0_20%] lg:flex-[0_0_13%] aspect-[2/3] ml-1 lg:ml-3 relative group"
                  key={index}
                >
                  <img
                    src={src}
                    alt={`Movie ${index}`}
                    className="h-full object-cover"
                  />
                  <div className="absolute top-0 bottom-0 w-full h-full z-20 bg-zinc-800/80 group-hover:opacity-100 opacity-0 transition-all cursor-pointer p-4">
                    <p className="text-[8px] text-zinc-300">
                      {dateFormatFromNow(release_date)}
                    </p>
                    <div className="flex items-center gap-2 my-2">
                      <div
                        className={cn("bg-green-500 text-xs inline-flex p-1", {
                          "bg-pink-500": adult,
                        })}
                      >
                        {adult ? "18+" : "13+"}
                      </div>
                      <div className="border border-zinc-300 text-zinc-300 rounded inline-flex px-1.5 py-0 text-xs">
                        4K
                      </div>
                    </div>
                    <p className="text-xs mb-2">2h 34m</p>
                    <div className="hidden items-center gap-1 flex-wrap my-1 min-md:flex">
                      {genre_ids.map((genreId: number) => (
                        <span className="bg-pink-500 px-1 rounded-xs text-xs">
                          {GENRE[genreId]}
                        </span>
                      ))}
                    </div>
                    <p className="line-clamp-4 lg:font-medium lg:text-lg leading-5 mt-2">
                      {title}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        {!prevBtnDisabled && (
          <button
            onClick={onPrevButtonClick}
            className="absolute left-0 top-0 h-full z-10 bg-pink-500/30 hover:bg-pink-500/50 p-2 lg:p-4 cursor-pointer"
          >
            <ChevronLeft className="text-white" />
          </button>
        )}
        {!nextBtnDisabled && (
          <button
            onClick={onNextButtonClick}
            className="absolute right-0 top-0 h-full z-10 bg-pink-500/30 hover:bg-pink-500/50 p-2 lg:p-4 cursor-pointer"
          >
            <ChevronRight className="text-white" />
          </button>
        )}
      </div>
    </section>
  );
}
