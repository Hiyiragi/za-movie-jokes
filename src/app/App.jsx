import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import MovieDetails from "src/features/movies/MovieDetails";
import MovieList from "src/features/movies/MovieList";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/">
          <Route index element={<MovieList />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
