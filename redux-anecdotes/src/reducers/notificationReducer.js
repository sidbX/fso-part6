import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    },
  },
})

export const notify = (message, timeInSeconds) => {
  return async (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => dispatch(removeNotification()), timeInSeconds * 1000)
  }
}

export default notificationSlice.reducer
export const { setNotification, removeNotification } = notificationSlice.actions
