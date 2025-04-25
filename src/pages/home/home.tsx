import { useQuery } from "@tanstack/react-query";
import Banner from "../../components/molecules/banner";
import Slider from "../../components/molecules/slider";
import {
  getNowPlaying,
  getPopular,
  getPopularIndo,
} from "../../integrations/movie";

function Home() {
  const queryGetNowPlaying = useQuery({
    queryKey: [getNowPlaying.key],
    queryFn: getNowPlaying.fetch,
  });

  const queryGetPopular = useQuery({
    queryKey: [getPopular.key],
    queryFn: getPopular.fetch,
  });

  const queryGetPopularIndo = useQuery({
    queryKey: [getPopularIndo.key],
    queryFn: getPopularIndo.fetch,
  });

  return (
    <>
      <Banner />
      <Slider
        title="Now Playing"
        isLoading={queryGetNowPlaying.isPending}
        data={queryGetNowPlaying.data?.results ?? []}
      />
      <Slider
        title="Trending Now"
        isLoading={queryGetPopular.isPending}
        data={queryGetPopular.data?.results ?? []}
      />
      <Slider
        title="Indonesian Movies"
        isLoading={queryGetPopularIndo.isPending}
        data={queryGetPopularIndo.data?.results ?? []}
      />
    </>
  );
}

export default Home;
