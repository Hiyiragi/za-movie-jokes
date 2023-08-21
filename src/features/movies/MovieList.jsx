import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { Flex, Heading, SimpleGrid, Spinner, useToast } from "@chakra-ui/react";
import { MOVIEDB_IMAGES_URL } from "src/common/UI/constants";
import {
  fetchMovies,
  selectAll,
  selectMoviesError,
  selectMoviesStatus,
} from "./moviesSlice";

function MovieList() {
  const dispatch = useDispatch();
  const toast = useToast();
  const movies = useSelector(selectAll);
  const moviesStatus = useSelector(selectMoviesStatus);
  const moviesError = useSelector(selectMoviesError);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchMovies()).unwrap();
      } catch (error) {
        toast({
          title: "Failed to load movies.",
          description:
            "Please check your internet connection and refresh the page.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [dispatch, toast]);

  let content;

  if (moviesStatus === "succeeded") {
    content = (
      <SimpleGrid spacing={4} columns={{ sm: 1, md: 3, lg: 4 }}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={`${MOVIEDB_IMAGES_URL}/${movie.poster_path}`}
            overview={movie.overview}
          />
        ))}
      </SimpleGrid>
    );
  } else if (moviesStatus === "loading") {
    content = (
      <Flex align="center" justify="center" minH="100vh">
        <Spinner text="Loading..." />
      </Flex>
    );
  } else if (moviesStatus === "failed") {
    content = (
      <Flex align="center" justify="center" minH="100vh">
        {moviesError}
      </Flex>
    );
  }
  return (
    <>
      <Heading size="xl" textAlign="center" mb={4}>
        Trending Movies
      </Heading>
      {content}
    </>
  );
}

export default MovieList;
