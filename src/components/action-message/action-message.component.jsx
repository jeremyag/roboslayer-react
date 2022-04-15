import "./action-message.styles.css";
const ActionMessage = ({ actionMessage, className }) => {
  return (
    <div className={`alert ${className} action-message`}>{actionMessage}</div>
  );
};

export default ActionMessage;
