import style from "./ActionsButton.module.css";

const ActionsButton = ({ action, label }) => {
  const buttonClass =
    label === "Excluir" ? style.remove_button : style.actions_button;

  return (
    <button className={buttonClass} onClick={action}>
      {label}
    </button>
  );
};

export default ActionsButton;
