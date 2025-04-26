import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PageLoading from "./components/molecules/page-loading";
import PageNotFound from "./components/molecules/page-not-found";
import { Home, MovieDetail, Search } from "./pages";

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
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
