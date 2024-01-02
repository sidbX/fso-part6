import axios from 'axios'

const baseUrl = 'http://localhost:3001'

export const getAnecdotes = () =>
  axios.get(`${baseUrl}/anecdotes`).then((res) => res.data)

export const createAnecdote = (newAnecdote) => {
  return axios
    .post(`${baseUrl}/anecdotes`, { content: newAnecdote, votes: 0 })
    .then((res) => res.data)
}

export const addVote = (anecdoteToBeVoted) => {
  const { votes } = anecdoteToBeVoted
  return axios
    .put(`${baseUrl}/anecdotes/${anecdoteToBeVoted.id}`, {
      ...anecdoteToBeVoted,
      votes: votes + 1,
    })
    .then((res) => res.data)
}
