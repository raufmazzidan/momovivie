import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Tag from "../../components/atoms/tag";
import cn from "../../helper/cn";
import { dateFormat } from "../../helper/date";

const DETAIL = {
  adult: false,
  backdrop_path: "/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg",
  belongs_to_collection: null,
  budget: 40000000,
  genres: [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 53,
      name: "Thriller",
    },
  ],
  homepage: "https://www.amazon.com/salp/aworkingman?hhf",
  id: 1197306,
  imdb_id: "tt9150192",
  origin_country: ["GB", "US"],
  original_language: "en",
  original_title: "A Working Man",
  overview:
    "Levon Cade left behind a decorated military career in the black ops to live a simple life working construction. But when his boss's daughter, who is like family to him, is taken by human traffickers, his search to bring her home uncovers a world of corruption far greater than he ever could have imagined.",
  popularity: 1092.1175,
  poster_path: "/xUkUZ8eOnrOnnJAfusZUqKYZiDu.jpg",
  production_companies: [
    {
      id: 118475,
      logo_path: "/x8mwqWGZK2gQvrp5QlYQho1VgXj.png",
      name: "Cedar Park Entertainment",
      origin_country: "US",
    },
    {
      id: 219295,
      logo_path: null,
      name: "BlockFilm",
      origin_country: "US",
    },
    {
      id: 218150,
      logo_path: null,
      name: "Punch Palace Productions",
      origin_country: "GB",
    },
    {
      id: 166120,
      logo_path: "/fRuHQF9DB4Zl3ha62D5Bpu1a5TL.png",
      name: "Balboa Productions",
      origin_country: "US",
    },
    {
      id: 22146,
      logo_path: "/v37N1mFeXNQfvPankg3feBhVvM7.png",
      name: "Black Bear Pictures",
      origin_country: "US",
    },
    {
      id: 181874,
      logo_path: "/crrgXvLhDO9c57HYrbO4H58Vxmb.png",
      name: "Fifth Season",
      origin_country: "US",
    },
    {
      id: 253169,
      logo_path: null,
      name: "CAT5",
      origin_country: "US",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "GB",
      name: "United Kingdom",
    },
    {
      iso_3166_1: "US",
      name: "United States of America",
    },
  ],
  release_date: "2025-03-26",
  revenue: 86925155,
  runtime: 116,
  spoken_languages: [
    {
      english_name: "English",
      iso_639_1: "en",
      name: "English",
    },
    {
      english_name: "Russian",
      iso_639_1: "ru",
      name: "Pусский",
    },
    {
      english_name: "Spanish",
      iso_639_1: "es",
      name: "Español",
    },
  ],
  status: "Released",
  tagline: "Human traffickers beware.",
  title: "A Working Man",
  video: false,
  vote_average: 6.342,
  vote_count: 376,
};

function MovieDetail() {
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  return (
    <>
      <section
        className={cn("w-full h-[70vh] z-50 transition-all")}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1920/${DETAIL.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full h-full bg-gradient-to-b to-zinc-950 from-75% via-90% via-zinc-950 from-zinc-950/80">
          <div className="max-w-6xl p-8 w-full m-auto">
            <h1 className="font-semibold text-2xl mb-4">
              <span className="text-pink-500">momo</span>vivie
            </h1>
            <button
              onClick={onBack}
              className="flex items-center mt-6 gap-2 hover:text-pink-500 cursor-pointer transition-all"
            >
              <ArrowLeft size={20} />
              <p className="text-sm">Back to Previous Page</p>
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl px-8 w-full m-auto">
            <img
              src={`https://image.tmdb.org/t/p/w300/${DETAIL.poster_path}`}
              alt={`Poster Movie ${DETAIL.title}`}
              className="object-cover z-10 border-2 border-zinc-400 w-48 md:w-64 shadow rounded-lg md:rounded-xl"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-medium">
                {DETAIL.title}
                <span className="pl-2 font-extralight text-pink-500">
                  ({dateFormat({ date: DETAIL.release_date, format: "yyyy" })})
                </span>
              </h1>
              <p className="text-xs text-zinc-300 mt-1">{DETAIL.tagline}</p>
              <div className="flex items-center gap-2 my-2">
                {DETAIL.genres.map(({ name }) => {
                  return <Tag size="lg">{name}</Tag>;
                })}
              </div>
              <p className="text-sm mb-1 lg:mb-2 text-zinc-400 my-2">2h 34m</p>
              <div className="flex items-center gap-2 my-1 md:my-2">
                <div
                  className={cn("bg-green-500 inline-flex p-1", {
                    "bg-red-500": DETAIL.adult,
                  })}
                >
                  {DETAIL.adult ? "18+" : "13+"}
                </div>
                <div className="border border-zinc-300 text-zinc-300 rounded inline-flex px-1.5 py-0">
                  4K
                </div>
              </div>
              <p className="mt-3 text-sm">
                Available on:{" "}
                {DETAIL.spoken_languages.map((l) => l.english_name).join(", ")}
              </p>

              <p className="leading-6 mt-5">{DETAIL.overview}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MovieDetail;
