import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// export const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)
const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const objToBeChanged = state.find((obj) => obj.id === action.payload)
      const changedObj = { ...objToBeChanged, votes: objToBeChanged.votes + 1 }
      return state.map((obj) => (obj.id === action.payload ? changedObj : obj))
    },
    pushAnecdote(state, action) {
      state.push(action.payload)
      // return [...state, asObject(action.payload)]
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const initialize = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const create = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(pushAnecdote(newAnecdote))
  }
}

export const vote = (id, votes) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.voteAnec(id, votes)
    console.log(votedAnecdote)
    dispatch(voteAnecdote(id))
  }
}

export default anecdoteSlice.reducer
export const { voteAnecdote, pushAnecdote, setAnecdotes } =
  anecdoteSlice.actions

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTE': {
//       const objToBeChanged = state.find((obj) => obj.id === action.payload.id)
//       const changedObj = { ...objToBeChanged, votes: objToBeChanged.votes + 1 }
//       return state.map((obj) =>
//         obj.id === action.payload.id ? changedObj : obj,
//       )
//     }
//     case 'CREATE': {
//       return [...state, action.payload]
//     }
//   }
//   console.log('state now: ', state)
//   console.log('action', action)

//   return state
// }

// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: {
//       id,
//     },
//   }
// }

// export const create = (input) => {
//   return {
//     type: 'CREATE',
//     payload: asObject(input),
//   }
// }

// export default anecdoteReducer
