import { Badge, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJoke,
  selectJokeByMovieId,
  selectJokesStatus,
} from "./aiJokesSlice";

function JokesGenerator({ movieId, movieDescription, movieTitle }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const jokeStatus = useSelector(selectJokesStatus);
  const joke = useSelector((state) => selectJokeByMovieId(state, movieId));
  const handleGenerateJoke = async () => {
    try {
      await dispatch(
        fetchJoke({ movieId, movieDescription, movieTitle })
      ).unwrap();
    } catch (error) {
      toast({
        title: "Failed to load joke.",
        description:
          "Please check your internet connection and refresh the page.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex direction="column" gap={4} width="100%">
      {joke && (
        <Flex align="center" mb={2} fontWeight="bold" fontSize="md">
          <Badge fontSize="0,9em" colorScheme="green" mr={1}>
            Joke:
          </Badge>
          <Text as="span">{joke}</Text>
        </Flex>
      )}
      <Button
        isLoading={jokeStatus === "loading"}
        variant="solid"
        bg="green.300"
        color="white"
        w="100%"
        onClick={handleGenerateJoke}
      >
        {joke ? "Regenerate" : "Generate"} Joke
      </Button>
    </Flex>
  );
}

export default JokesGenerator;
