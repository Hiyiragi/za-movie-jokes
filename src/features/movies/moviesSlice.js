import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { fetchPopularMovies } from "./api";
//using createEntityAdapter to normalize the data
const moviesAdapter = createEntityAdapter({
  sortComparer: (movieA, movieB) => movieB.vote_average - movieA.vote_average,
});
//setting other important fields in the state
const initialState = moviesAdapter.getInitialState({
  status: "idle", //'idle', 'loading', 'succeeded', 'failed'
  error: null,
});

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const data = await fetchPopularMovies();
  return data.data;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.movies = action.payload.results;
        moviesAdapter.setMany(state, action.payload.results);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const selectAllMovies = createSelector(
//   [(state) => state.movies.movies],
//   (mov) => {
//     const movies = [...mov];
//     movies.sort((movieA, movieB) => movieB.vote_average - movieA.vote_average);
//     return movies;
//   }
// );
// export const selectMovieById = (state, movieId) =>
// state.movies.movies.find((movie) => movie.id === Number(movieId));

export const { selectAll, selectById } = moviesAdapter.getSelectors();

export const selectMoviesStatus = (state) => state.movies.status;
export const selectMoviesError = (state) => state.movies.error;

export default moviesSlice.reducer;
