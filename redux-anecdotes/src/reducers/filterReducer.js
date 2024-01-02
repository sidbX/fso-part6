import {createSlice} from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers:{
    setFilter(state, action){
      return action.payload
    }
  }
})

export default filterSlice.reducer
export const {setFilter} = filterSlice.actions

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

// //Action creator function
// export const setFilter = (value) => {
//   return {
//     type: 'SET_FILTER',
//     payload: value,
//   }
// }

// export default filterReducer
