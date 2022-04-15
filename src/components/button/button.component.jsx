import "./button.styles.css";
const Button = ({ className, actionName, onClickHandler }) => (
  <button
    type="button"
    className={`button btn ${className}`}
    onClick={onClickHandler}
    name={actionName}
  >
    {actionName}
  </button>
);

export default Button;
