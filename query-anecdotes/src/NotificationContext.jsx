import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "anecdoteCreated": {
      return `${action.payload} was created`;
    }
    case "anecdoteVoted": {
      return `voted for ${action.payload}`;
    }
    case "error": {
      return action.payload;
    }
    case "clear": {
      return "";
    }
    default: {
      console.log("Unknown option selected in notificationContext");
    }
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "");

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  return useContext(NotificationContext)[0];
};
export const useNotificationDispatch = () => {
  return useContext(NotificationContext)[1];
};

export default NotificationContext;
