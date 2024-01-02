import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault()
    // const newAnecdote = await anecdoteService.createAnecdote(event.target.anecdoteInput.value)
    dispatch(create(event.target.anecdoteInput.value))
    dispatch(notify(event.target.anecdoteInput.value, 5))
    // setTimeout(() => dispatch(removeNotification()), 5000)
    event.target.anecdoteInput.value = ''
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <input name="anecdoteInput" />
        <button type="submit">create</button>
      </form>
    </>
  )
}
export default AnecdoteForm
