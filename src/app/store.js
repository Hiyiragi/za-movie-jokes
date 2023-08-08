import { configureStore } from "@reduxjs/toolkit";
import aiJokesSlice from "src/features/ai-jokes/aiJokesSlice";
import moviesSlice from "src/features/movies/moviesSlice";

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
    aiJokes: aiJokesSlice,
  },
});
