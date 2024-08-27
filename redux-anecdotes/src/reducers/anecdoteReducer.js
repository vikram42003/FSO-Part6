import { createSlice } from "@reduxjs/toolkit";

import anecdotesService from "../services/anecdote";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    addVote(state, action) {
      return state
        .map(a => (a.id === action.payload ? { ...a, votes: a.votes + 1 } : a))
        .sort((a, b) => b.votes - a.votes);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { addVote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createAnecdote(anecdote);
    dispatch(anecdoteSlice.actions.addAnecdote(newAnecdote));
  };
};

export default anecdoteSlice.reducer;
