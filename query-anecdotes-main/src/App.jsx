import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, addVote } from './requests'
import { useReducer } from 'react'
import {
  useNotificationMessage,
  useNotificationDispatch,
} from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const addVoteMutation = useMutation({
    mutationFn: addVote,
    // onSuccess: () => queryClient.invalidateQueries({ queryFn: ['anecdotes'] }),
    onSuccess: (updatedAnecdote) => {
      console.log(updatedAnecdote)
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((anec) =>
          anec.id === updatedAnecdote.id ? updatedAnecdote : anec,
        ),
      )
    },
  })

  const notifDispatch = useNotificationDispatch()
  const notifMessage = useNotificationMessage()
  
  const showNotification = (message) => {
    notifDispatch({ type: 'display', payload: message })
    setTimeout(() => notifDispatch({ type: 'erase' }), 5000)
  }

  const handleVote = (anecdote) => {
    addVoteMutation.mutate(anecdote)
    showNotification(anecdote.content + ' voted')
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isPending) {
    return <div>Loading data...</div>
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification message={notifMessage} />
      <AnecdoteForm showNotification={showNotification} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
