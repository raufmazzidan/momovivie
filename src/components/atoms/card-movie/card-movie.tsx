import { Link } from "react-router-dom";
import { GENRE } from "../../../constant/movie";
import cn from "../../../helper/cn";
import { dateFormatFromNow } from "../../../helper/date";
import Tag from "../tag";
import { CardMovieProps } from "./card-movie.types";

function CardMovie(props: CardMovieProps) {
  const {
    data: { adult, genre_ids, poster_path, release_date, title, id },
    className,
  } = props;

  return (
    <Link
      to={`/movie/${id}`}
      className={cn(
        "relative group select-none aspect-[2/3] bg-pink-700/20",
        className
      )}
    >
      <img
        src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
        alt={`Poster Movie ${title}`}
        className="h-full min-w-full object-cover z-10"
        onLoad={(e) => {
          (e.target as HTMLImageElement).style.display = "block";
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />

      <div className="absolute top-0 bottom-0 w-full h-full group-hover:z-20 group-focus:z-20 bg-zinc-800/80 z-0 group-hover:visible invisible group-focus:visible cursor-pointer p-2 md:p-4 ">
        <p className="text-[8px] text-zinc-300">
          {dateFormatFromNow(release_date)}
        </p>
        <div className="flex items-center gap-2 my-1 md:my-2">
          <div
            className={cn(
              "bg-green-500 text-[8px] md:text-xs inline-flex p-1",
              {
                "bg-red-500": adult,
              }
            )}
          >
            {adult ? "18+" : "13+"}
          </div>
          <div className="border border-zinc-300 text-zinc-300 rounded inline-flex px-1.5 py-0 text-[8px] md:text-xs">
            4K
          </div>
        </div>
        <p className="text-[8px] md:text-xs mb-1 lg:mb-2">2h 34m</p>
        {!!genre_ids.length && (
          <div className="hidden items-center gap-1 flex-wrap my-1 min-sm:flex">
            {genre_ids.slice(0, 3).map((id: number) => {
              return <Tag>{GENRE[id]}</Tag>;
            })}
          </div>
        )}
        <p className="line-clamp-4 text-[10px] md:text-sm lg:text-lg mt-1 lg:mt-2">
          {title}
        </p>
      </div>
    </Link>
  );
}

export default CardMovie;
