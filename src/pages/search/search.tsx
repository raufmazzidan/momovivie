import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/atoms/search-bar";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") as string;

  const onSearch = (search: string) => {
    setSearchParams({ q: search }, { replace: true });
  };
  return (
    <section className="p-8">
      <h1 className="font-semibold text-2xl lg:text-4xl xl:text-5xl">
        <span className="text-pink-500">momo</span>vivie
      </h1>
      <SearchBar onSubmit={onSearch} onChange={onSearch} value={search} />
    </section>
  );
}

export default Search;
