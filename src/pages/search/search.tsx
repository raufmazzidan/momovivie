import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CardMovie from "../../components/atoms/card-movie";
import SearchBar from "../../components/atoms/search-bar";
import { getSearch } from "../../integrations/movie";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const search = searchParams.get("q") as string;

  const onSearch = (search: string) => {
    setSearchParams({ q: search }, { replace: true });
  };

  const onBack = () => {
    navigate(-1);
  };

  const queryGetSearch = useQuery({
    queryKey: [getSearch.key, search],
    queryFn: getSearch.fetch(search),
    enabled: !!search,
  });

  return (
    <div className="p-8 max-w-6xl m-auto">
      <button
        onClick={onBack}
        className="flex items-center mb-6 gap-2 hover:text-pink-500 cursor-pointer transition-all"
      >
        <ArrowLeft size={20} />
        <p className="text-sm">Back to Previous Page</p>
      </button>
      <Link
        to="/"
        className="font-semibold text-2xl lg:text-4xl xl:text-5xl hover:opacity-80"
      >
        <span className="text-pink-500">momo</span>vivie
      </Link>
      <div className="mt-4">
        <SearchBar onSubmit={onSearch} defaultValue={search} />
      </div>
      <h2 className="mt-6 font-medium underline decoration-pink-500 underline-offset-3 lg:underline-offset-4 min-h-6">
        {!queryGetSearch.isPending && (
          <>
            {(queryGetSearch.data?.results?.length ?? 0) > 0 ? (
              <>
                Result for <i>"{search}"</i>
              </>
            ) : (
              "No movies found. Try a different keyword"
            )}
          </>
        )}
      </h2>
      {queryGetSearch.isPending ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-4">
          <div className="w-full animate-pulse aspect-[2/3] bg-zinc-700" />
          <div className="w-full animate-pulse aspect-[2/3] bg-zinc-700" />
          <div className="w-full animate-pulse aspect-[2/3] max-sm:hidden bg-zinc-700" />
          <div className="w-full animate-pulse aspect-[2/3] max-md:hidden bg-zinc-700" />
          <div className="w-full animate-pulse aspect-[2/3] max-lg:hidden bg-zinc-700" />
          <div className="w-full animate-pulse aspect-[2/3] max-xl:hidden bg-zinc-700" />
        </div>
      ) : (
        <>
          {(queryGetSearch.data?.results?.length ?? 0) > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-4">
              {queryGetSearch.data?.results.map((movie) => (
                <CardMovie data={movie} key={movie.id} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Search;
