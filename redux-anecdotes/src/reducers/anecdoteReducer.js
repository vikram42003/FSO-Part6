import { createSlice } from "@reduxjs/toolkit";

import anecdotesService from "../services/anecdote";
import { sendNotification } from "./notificationReducer";

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

const { addAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll();
    anecdotes.sort((a, b) => b.votes - a.votes);
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createAnecdote(anecdote);
    dispatch(addAnecdote(newAnecdote));
  };
};

export const updateVotes = oldAnecdote => {
  return async dispatch => {
    const anecdote = { ...oldAnecdote, votes: oldAnecdote.votes + 1 };
    await anecdotesService.updateVotes(anecdote);
    dispatch(addVote(anecdote.id));
    dispatch(sendNotification(`you voted '${anecdote.content}'`, 5000));
  };
};

export default anecdoteSlice.reducer;
