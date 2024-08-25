import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(store => store);
  const dispatch = useDispatch();

  const vote = id => {
    console.log("vote", id);
    dispatch(addVote(id));
  };

  return (
    <>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
