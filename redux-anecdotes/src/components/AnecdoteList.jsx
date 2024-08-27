import { useDispatch, useSelector } from "react-redux";
import { updateVotes } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector(store =>
    store.filter === "" ? store.anecdotes : store.anecdotes.filter(a => a.content.match(new RegExp(store.filter, "ig")))
  );
  const dispatch = useDispatch();

  const vote = id => {
    console.log("vote", id);
    const anecdote = anecdotes.find(a => a.id === id);
    dispatch(updateVotes(anecdote));
  };

  return (
    <>
      {anecdotes.map(anecdote => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => vote(anecdote.id)} />
      ))}
    </>
  );
};

export default AnecdoteList;
