import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRecommendation } from "../../../integrations/movie";
import CardMovie from "../../../components/atoms/card-movie";

function RelatedMovies() {
  const params = useParams();

  const movieId = Number(params.movieId);

  const queryGetRecommendation = useQuery({
    enabled: !!movieId,
    queryKey: [getRecommendation.key, movieId],
    queryFn: getRecommendation.fetch(movieId),
  });

  if (
    !queryGetRecommendation.isPending &&
    queryGetRecommendation.data?.results.length === 0
  ) {
    return null;
  }

  return (
    <div className="max-w-6xl p-8 mt-4 w-full m-auto">
      <h2 className="font-medium text-sm lg:text-xl underline decoration-pink-500 underline-offset-3 lg:underline-offset-4">
        Related Movies
      </h2>
      {queryGetRecommendation.isPending ? (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-4">
          <div className="w-full animate-pulse aspect-[2/3] bg-zinc-700" />
          <div className="w-full animate-pulse aspect-[2/3] bg-zinc-700" />
          <div className="w-full animate-pulse aspect-[2/3] max-sm:hidden bg-zinc-700" />
          <div className="w-full animate-pulse aspect-[2/3] max-md:hidden bg-zinc-700" />
          <div className="w-full animate-pulse aspect-[2/3] max-lg:hidden bg-zinc-700" />
          <div className="w-full animate-pulse aspect-[2/3] max-xl:hidden bg-zinc-700" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-4">
          {queryGetRecommendation.data?.results.splice(0, 6).map((data) => (
            <CardMovie data={data} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RelatedMovies;
