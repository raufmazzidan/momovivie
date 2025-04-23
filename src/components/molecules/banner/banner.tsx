import { Search } from "lucide-react";
import imgBg from "../../../assets/bg.webp";
import cn from "../../../helper/cn";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();
  const onSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const searchValue = formData.get("search") as string;

    if (searchValue) {
      navigate(`/search/${searchValue}`);
    }
  };

  return (
    <section
      className={cn("w-full h-[50vh] z-50 transition-all")}
      style={{
        backgroundImage: `url(${imgBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full h-full bg-gradient-to-b to-zinc-950 via-95% via-zinc-950 from-zinc-950/60 flex flex-col items-center justify-center gap-2 lg:gap-4 px-4 py-10">
        <h1 className="font-semibold text-3xl lg:text-5xl xl:text-6xl">
          <span className="text-pink-500">momo</span>vivie
        </h1>
        <p className="text-xs lg:text-sm">
          Only the Hits. No Flops. Just Great Movies.
        </p>
        <form
          onSubmit={onSubmitSearch}
          className="flex items-center justify-center h-10 lg:h-12 w-full max-w-[500px] mt-4 lg:mt-8"
        >
          <input
            name="search"
            className="bg-white outline-none text-black px-4 py-1 rounded-l-2xl h-full w-full text-sm"
          />
          <button
            type="submit"
            className="cursor-pointer bg-white text-pink-500 hover:text-pink-400 h-full pr-4 flex items-center justify-center rounded-r-2xl"
          >
            <Search />
          </button>
        </form>
      </div>
    </section>
  );
}

export default Banner;
