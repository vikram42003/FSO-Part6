import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification, clearNotification } from "../reducers/notificationReducer";
import { useRef } from "react";

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
  const timeoutRef = useRef(null);

  const anecdotes = useSelector(store =>
    store.filter === "" ? store.anecdotes : store.anecdotes.filter(a => a.content.match(new RegExp(store.filter, "ig")))
  );
  const dispatch = useDispatch();

  const vote = id => {
    console.log("vote", id);
    const content = anecdotes.find(a => a.id === id).content;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    dispatch(setNotification(`you voted '${content}'`));
    timeoutRef.current = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
    dispatch(addVote(id));
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
