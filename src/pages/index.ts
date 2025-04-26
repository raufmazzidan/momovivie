import { lazy } from "react";

const Home = lazy(() => import("./home"));
const MovieDetail = lazy(() => import("./movie-detail"));
const Search = lazy(() => import("./search"));

export { Home, MovieDetail, Search };
