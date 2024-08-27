import axios from "axios";
const url = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};

const createAnecdote = async anecdote => {
  const response = await axios.post(url, {
    content: anecdote,
    votes: 0,
  });

  return response.data;
};

const anecdotesService = {
  getAll,
  createAnecdote,
};

export default anecdotesService;
