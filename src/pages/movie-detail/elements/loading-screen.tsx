function DetailMovieLoadingScreen() {
  return (
    <div className="w-full h-[70vh] z-50 transition-all bg-pink-900">
      <div className="w-full h-full bg-gradient-to-b to-zinc-950 from-75% via-90% via-zinc-950 from-zinc-950/80">
        <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl px-8 w-full m-auto pt-[140px]">
          <div className="border-2 border-zinc-400 max-w-48 md:max-w-64 shadow rounded-lg md:rounded-xl animate-pulse bg-zinc-700 w-full aspect-[2/3]" />
          <div className="w-full">
            <div className="animate-pulse bg-zinc-700 w-3/4 h-10" />
            <div className="animate-pulse bg-zinc-700 w-1/3 h-3 mt-1.5" />
            <div className="flex gap-2 h-6 items-center w-full my-2">
              <div className="animate-pulse bg-zinc-700 w-20 h-full rounded-sm"></div>
              <div className="animate-pulse bg-zinc-700 w-20 h-full rounded-sm"></div>
              <div className="animate-pulse bg-zinc-700 w-20 h-full rounded-sm"></div>
            </div>
            <div className="animate-pulse bg-zinc-700 w-16 h-3 mt-1.5" />
            <div className="animate-pulse bg-zinc-700 w-18 h-8 my-2 rounded-sm"></div>
            <div className="animate-pulse bg-zinc-700 w-24 h-3 mt-1.5" />
            <div className="animate-pulse bg-zinc-700 w-full h-4 mt-5" />
            <div className="animate-pulse bg-zinc-700 w-3/4 h-4 mt-1.5" />
            <div className="animate-pulse bg-zinc-700 w-2/3 h-4 mt-1.5" />
            <div className="animate-pulse bg-zinc-700 w-1/2 h-4 mt-1.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailMovieLoadingScreen;
