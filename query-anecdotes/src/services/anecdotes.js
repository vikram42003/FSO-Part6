import axios from "axios";

const url = "http://localhost:3001";

const getAll = async () => {
  const result = await axios.get(`${url}/anecdotes`);
  return result.data;
};

const addAnecdote = async anecdote => {
  const result = await axios.post(`${url}/anecdotes`, { content: anecdote, votes: 0 });
  return result.data;
};

const addVote = async anecdote => {
  const result = await axios.put(`${url}/anecdotes/${anecdote.id}`, anecdote);
  return result.data;
};

const anecdotesService = {
  getAll,
  addAnecdote,
  addVote,
};
export default anecdotesService;
