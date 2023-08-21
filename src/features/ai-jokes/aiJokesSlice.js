import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { OPENAI_COMPLETIONS_API_URL } from "src/common/UI/constants";

const initialState = {
  rules: [{ name: "Joke Type", description: "Programmer" }],
  jokes: {
    jokes: {},
    status: "idle", //'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
};

export const fetchJoke = createAsyncThunk(
  "aiJokes/fetchJoke",
  async ({ movieId, movieTitle, movieDescription }, thunkApi) => {
    const state = thunkApi.getState();
    const joke = selectJokeByMovieId(state, movieId);
    const rules = selectRules(state);
    const ruleString = rules.reduce(
      (acc, rule) => `${acc}${rule.name}: ${rule.description}\n`,
      ""
    );
    const messages = [
      {
        role: "user",
        content: `Movie Title: ${movieTitle}, Movie Description: ${movieDescription}, ${ruleString}, Joke:`,
      },
    ];
    if (joke) {
      messages.unshift({
        role: "user",
        content: `Don't use the same joke as ${joke.joke}`,
      });
    }
    const response = await axios.post(
      OPENAI_COMPLETIONS_API_URL,
      {
        messages: messages,
        model: "gpt-3.5-turbo",
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      }
    );
    return { movieId, joke: response.data.choices[0].message.content };
  }
);

const aiJokesSlice = createSlice({
  name: "ai-jokes",
  initialState,
  reducers: {
    ruleAdded(state, action) {
      const ruleIndex = state.rules.findIndex(
        (rule) => rule.name === action.payload.name
      );
      if (ruleIndex >= 0) return;
      state.rules.push(action.payload);
    },
    ruleRemoved(state, action) {
      const ruleIndex = state.rules.findIndex(
        (rule) => rule.name === action.payload
      );
      if (ruleIndex < 0) return;
      state.rules.splice(ruleIndex, 1);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchJoke.pending, (state) => {
        state.jokes.status = "loading";
      })
      .addCase(fetchJoke.fulfilled, (state, action) => {
        state.jokes.status = "succeeded";
        // const jokeIndex = state.jokes.jokes.findIndex(
        //   (joke) => joke.movieId === action.payload.movieId
        // );
        // if (jokeIndex > -1) {
        //   state.jokes.jokes[jokeIndex] = action.payload;
        // } else {
        //   state.jokes.jokes.push(action.payload);
        // }
        state.jokes.jokes[action.payload.movieId] = action.payload.joke;
      })
      .addCase(fetchJoke.rejected, (state, action) => {
        state.jokes.status = "failed";
        state.jokes.error = action.error.message;
      });
  },
});

export const selectJokeByMovieId = (state, movieId) =>
  state.aiJokes.jokes.jokes[movieId];
export const selectJokesStatus = (state) => state.aiJokes.jokes.status;
export const selectRules = (state) => state.aiJokes.rules;

export const { ruleAdded, ruleRemoved } = aiJokesSlice.actions;

export default aiJokesSlice.reducer;
