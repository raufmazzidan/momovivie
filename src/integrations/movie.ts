import fetcher from "../helper/fetcher";
import { MovieDetail, ResponseMovieList } from "../types/movie.types";

export const getNowPlaying = {
  key: "now-playing-movie",
  fetch: () => {
    return fetcher<ResponseMovieList>({
      url: `https://api.themoviedb.org/3/movie/now_playing?language=en-US&region=ID&page=1`,
    });
  },
};

export const getPopular = {
  key: "popular-movie",
  fetch: () => {
    return fetcher<ResponseMovieList>({
      url: `https://api.themoviedb.org/3/movie/popular?language=en-US&region=ID&page=1`,
    });
  },
};

export const getPopularIndo = {
  key: "indo-popular-movie",
  fetch: () => {
    return fetcher<ResponseMovieList>({
      url: `https://api.themoviedb.org/3/discover/movie?include_adult=true&page=1&sort_by=popularity.desc&with_original_language=id&primary_release_year=2025`,
    });
  },
};

export const getDetail = {
  key: "movie-detail",
  fetch: (movieId: number) => () => {
    return fetcher<MovieDetail>({
      url: `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&region=ID`,
    });
  },
};

export const getSearch = {
  key: "search-movie",
  fetch: (search: string) => () => {
    return fetcher<ResponseMovieList>({
      url: `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${search}`,
    });
  },
};

export const getRecommendation = {
  key: "recommendation-movie",
  fetch: (movieId: number) => () => {
    return fetcher<ResponseMovieList>({
      url: `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
    });
  },
};
