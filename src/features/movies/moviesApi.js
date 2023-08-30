import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MOVIEDB_API_URL } from "src/common/UI/constants";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  keepUnusedDataFor: 300,
  baseQuery: fetchBaseQuery({
    baseUrl: MOVIEDB_API_URL,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${import.meta.env.VITE_MOVIEDB_API_KEY}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => "/movie/popular",
      transformResponse: (res) => res.results,
      transformErrorResponse: (err) =>
        err.data.status_message ?? "Something went wrong",
    }),
    getMovieById: builder.query({
      query: (movieId) => `movie/${movieId}`,
      transformErrorResponse: (err) =>
        err.data.status_message ?? "Something went wrong",
    }),
    addNewPost: builder.mutation({}),
  }),
});

export const { useGetMoviesQuery, useGetMovieByIdQuery } = moviesApi;
