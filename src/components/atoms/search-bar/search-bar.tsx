import { Search } from "lucide-react";
import { FormEvent } from "react";
import { SearchBarProps } from "./search-bar.types";

function SearchBar(props: SearchBarProps) {
  const { onSubmit, defaultValue } = props;

  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const searchValue = formData.get("search") as string;

    onSubmit(searchValue);
  };

  return (
    <form
      onSubmit={handleChange}
      className="flex items-center justify-center h-10 lg:h-12 w-full min-w-[300px] max-w-[500px]"
    >
      <input
        placeholder="search for a movie.."
        name="search"
        defaultValue={defaultValue}
        className="bg-white outline-none text-black px-4 py-1 rounded-l-2xl h-full w-full text-sm"
        required
        type="search"
      />
      <button
        type="submit"
        className="cursor-pointer bg-white text-pink-500 hover:text-pink-400 h-full pr-4 flex items-center justify-center rounded-r-2xl"
      >
        <Search />
      </button>
    </form>
  );
}

export default SearchBar;
