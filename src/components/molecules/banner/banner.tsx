import { useNavigate } from "react-router-dom";
import imgBg from "../../../assets/bg.webp";
import cn from "../../../helper/cn";
import SearchBar from "../../atoms/search-bar";

function Banner() {
  const navigate = useNavigate();
  const onSubmitSearch = (search: string) => {
    navigate(`/search?q=${search}`);
  };

  return (
    <div
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
        <div className="mt-4 lg:mt-8 flex justify-center w-full">
          <SearchBar onSubmit={onSubmitSearch} />
        </div>
      </div>
    </div>
  );
}

export default Banner;
