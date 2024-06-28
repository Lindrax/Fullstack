import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    clearMessage() {
      return null
    }
  }
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return (dispatch) => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(clearMessage())
    }, timeout*1000);
  }
}

export default notificationSlice.reducer