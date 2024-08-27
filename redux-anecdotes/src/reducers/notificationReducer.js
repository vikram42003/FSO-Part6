import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
let timeoutId;
export const sendNotification = (message, time) => {
  return async dispatch => {
    dispatch(setNotification(message));
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, time);
  };
};
export default notificationSlice.reducer;
