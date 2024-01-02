import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()),
    )
  })
  const dispatch = useDispatch()

  return (
    <>
      {console.log('rendering all anecdotes')}
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  dispatch(vote(anecdote.id, anecdote.votes))
                  dispatch(notify(anecdote.content, 5))
                  // setTimeout(() => dispatch(removeNotification()), 5000)
                }}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
