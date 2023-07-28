import { Link } from "react-router-dom";
import { data } from "./data";
import MovieCard from "./MovieCard";
import { Heading, SimpleGrid } from "@chakra-ui/react";

function MovieList() {
  return (
    <>
      <Heading size="xl" textAlign="center">
        Trending Movies
      </Heading>
      <SimpleGrid spacing={4} columns={{ sm: 1, md: 3, lg: 4 }}>
        {data.results.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id}>
            {movie.title}
            <MovieCard />
          </Link>
        ))}
      </SimpleGrid>
    </>
  );
}

export default MovieList;
