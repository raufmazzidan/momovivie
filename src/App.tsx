import { Route, Routes } from "react-router-dom";
import Home from "./pages/home1";
import Search from "./pages/search1";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search/:id" element={<Search />} />
    </Routes>
  );
}

export default App;
