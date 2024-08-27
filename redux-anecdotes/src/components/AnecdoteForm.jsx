import { useDispatch } from "react-redux";

import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAddAnecdote = async event => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    dispatch(createAnecdote(anecdote));
    event.target.anecdote.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
