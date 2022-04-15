import ActionMessage from "../action-message/action-message.component";

import "./actions-list.styles.css";

const ActionsList = ({ actions }) => {
  return (
    <div className="card">
      <div className="card-body action-list">
        {actions.map((action) => {
          if (action.doer === "player") {
            return (
              <ActionMessage
                className="alert-primary"
                actionMessage={action.message}
              />
            );
          } else {
            return (
              <ActionMessage
                className="alert-danger"
                actionMessage={action.message}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default ActionsList;
