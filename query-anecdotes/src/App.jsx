import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import anecdotesService from "./services/anecdotes";
import { useNotificationDispatch } from "./NotificationContext";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdotesService.getAll,
    retry: false,
  });
  const anecdotes = data;

  const addAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.addAnecdote,
    onSuccess: newAnecdote => {
      const allAnecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], allAnecdotes.concat(newAnecdote));
      notificationDispatch({ type: "anecdoteCreated", payload: newAnecdote.content });
      setTimeout(() => {
        notificationDispatch({ type: "clear" });
      }, 5000);
    },
    onError: error => {
      console.log(error);
      if (error.status === 400 && error?.response?.data?.error?.includes("too short")) {
        notificationDispatch({ type: "error", payload: error.response.data.error });
        setTimeout(() => {
          notificationDispatch({ type: "clear" });
        }, 5000);
      }
    },
  });

  const voteAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.addVote,
    onSuccess: newAnecdote => {
      const allAnecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        allAnecdotes.map(a => (a.id === newAnecdote.id ? newAnecdote : a))
      );
    },
  });

  const handleVote = anecdote => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({ type: "anecdoteVoted", payload: anecdote.content });
    setTimeout(() => {
      notificationDispatch({ type: "clear" });
    }, 5000);
  };

  if (isPending) {
    return <div>fetching data...</div>;
  }

  if (isError) {
    console.log("ERROR: ", error);
    return <div>anecdote service is not available due to problems in the server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm addAnecdote={addAnecdoteMutation.mutate} />

      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
