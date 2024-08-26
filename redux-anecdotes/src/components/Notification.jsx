import { useSelector } from "react-redux";

const Notification = () => {
  const notificationText = useSelector(state => state.notification);

  if (!notificationText) return;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notificationText}</div>;
};

export default Notification;
