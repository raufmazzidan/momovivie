import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PageLoading from "./components/molecules/page-loading";
import Home from "./pages/home";
import MovieDetail from "./pages/movie-detail";
import Search from "./pages/search/search";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
