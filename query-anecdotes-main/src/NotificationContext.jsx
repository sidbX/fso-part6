/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useReducer, createContext, useContext } from 'react'

const notifReducer = (state, action) => {
  switch (action.type) {
    case 'display':
      return action.payload
    case 'erase':
      return null
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notifMessage, notifDispatch] = useReducer(notifReducer, null)

  return (
    <NotificationContext.Provider value={[notifMessage, notifDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationMessage = () => {
    return useContext(NotificationContext)[0]
}

export const useNotificationDispatch = () => {
    return useContext(NotificationContext)[1]
}
