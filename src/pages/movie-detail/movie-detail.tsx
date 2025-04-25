import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Tag from "../../components/atoms/tag";
import cn from "../../helper/cn";
import { dateFormat } from "../../helper/date";
import { useQuery } from "@tanstack/react-query";
import { getDetail } from "../../integrations/movie";
import DetailMovieLoadingScreen from "./elements/loading-screen";
import RelatedMovies from "./elements/related-movies";
import PageNotFound from "../../components/molecules/page-not-found";

function MovieDetail() {
  const params = useParams();

  const movieId = Number(params.movieId) || 0;

  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  const queryGetDetail = useQuery({
    queryKey: [getDetail.key, movieId],
    queryFn: getDetail.fetch(movieId),
    enabled: !!movieId,
  });

  const data = queryGetDetail.data;

  if (queryGetDetail.isPending && movieId) {
    return <DetailMovieLoadingScreen />;
  }

  if (!movieId || !data) {
    return <PageNotFound />;
  }

  return (
    <div
      key={movieId}
      className="w-full h-[70vh] z-50 transition-all bg-pink-900"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1920/${data.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full h-full bg-gradient-to-b to-zinc-950 from-75% via-90% via-zinc-950 from-zinc-950/80">
        <div className="max-w-6xl p-8 w-full m-auto">
          <Link to="/" className="font-semibold text-2xl hover:opacity-80">
            <span className="text-pink-500">momo</span>vivie
          </Link>
          <button
            id="page-back"
            onClick={onBack}
            className="flex items-center mt-6 gap-2 hover:text-pink-500 cursor-pointer transition-all"
          >
            <ArrowLeft size={20} />
            <p className="text-sm">Back to Previous Page</p>
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl px-8 w-full m-auto">
          <div className="bg-pink-700/20 min-w-48 md:min-w-64 max-w-48 md:max-w-64 border-2 border-zinc-400 shadow rounded-lg md:rounded-xl aspect-[2/3] overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
              alt={`Poster Movie ${data.title}`}
              className="object-cover hidden h-full w-max"
              onLoad={(e) => {
                (e.target as HTMLImageElement).style.display = "block";
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-medium">
              {data.title}
              {!!data.release_date && (
                <span className="pl-2 font-extralight text-pink-500">
                  ({dateFormat({ date: data.release_date, format: "yyyy" })})
                </span>
              )}
            </h1>
            <p className="text-xs text-zinc-300 mt-1">{data.tagline}</p>
            <div className="flex items-center gap-2 my-2 flex-wrap">
              {data.genres.map(({ name }) => {
                return <Tag size="lg">{name}</Tag>;
              })}
            </div>
            <p className="text-sm mb-1 lg:mb-2 text-zinc-400 my-2">2h 34m</p>
            <div className="flex items-center gap-2 my-1 md:my-2">
              <div
                className={cn("bg-green-500 inline-flex p-1", {
                  "bg-red-500": data.adult,
                })}
              >
                {data.adult ? "18+" : "13+"}
              </div>
              <div className="border border-zinc-300 text-zinc-300 rounded inline-flex px-1.5 py-0">
                4K
              </div>
            </div>
            {!!data.spoken_languages.length && (
              <p className="mt-3 text-sm">
                Available on:{" "}
                {data.spoken_languages.map((l) => l.english_name).join(", ")}
              </p>
            )}

            <p className="leading-6 mt-5">{data.overview}</p>
          </div>
        </div>
        <RelatedMovies />
      </div>
    </div>
  );
}

export default MovieDetail;
