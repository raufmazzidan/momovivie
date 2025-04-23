import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "../../components/atoms/search-bar";
import { ArrowLeft } from "lucide-react";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const search = searchParams.get("q") as string;

  const onSearch = (search: string) => {
    setSearchParams({ q: search }, { replace: true });
  };

  const onBack = () => {
    navigate("/");
  };

  return (
    <section className="p-8">
      <button
        onClick={onBack}
        className="flex items-center mb-6 gap-2 hover:text-pink-500 cursor-pointer transition-all"
      >
        <ArrowLeft size={20} />
        <p className="text-sm">Back to Home</p>
      </button>
      <h1 className="font-semibold text-2xl lg:text-4xl xl:text-5xl mb-4">
        <span className="text-pink-500">momo</span>vivie
      </h1>
      <SearchBar onSubmit={onSearch} onChange={onSearch} value={search} />
    </section>
  );
}

export default Search;
