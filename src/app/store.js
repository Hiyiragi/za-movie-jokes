import { configureStore } from "@reduxjs/toolkit";
import aiJokesSlice from "src/features/ai-jokes/aiJokesSlice";
import { moviesApi } from "src/features/movies/moviesApi";

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    aiJokes: aiJokesSlice,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(moviesApi.middleware),
});
