import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import MovieDetail from "./pages/movie-detail";
import Search from "./pages/search/search";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movie/:movieId" element={<MovieDetail />} />
    </Routes>
  );
}

export default App;
