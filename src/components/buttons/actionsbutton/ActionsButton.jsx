import style from "./ActionsButton.module.css";

const ActionsButton = ({ action, label }) => {
  return (
    <button className={style.actions_button} onClick={action}>
      {label}
    </button>
  );
};

export default ActionsButton;
