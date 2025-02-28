import style from "./ActionsButton.module.css";
import { Trash, Edit2, Plus, Minus } from "lucide-react";

const ActionsButton = ({ action, label }) => {
  const buttonClass =
    label === "Excluir" ? style.remove_button : style.actions_button;

  let icon;

  if (label === "Excluir") {
    icon = <Trash size={15} />;
  } else if (label === "Editar") {
    icon = <Edit2 size={15} />;
  } else if (label === "Saída") {
    icon = <Minus size={15} />;
  } else {
    icon = <Plus size={15} />;
  }

  return (
    <button className={buttonClass} onClick={action}>
      {icon}
    </button>
  );
};

export default ActionsButton;
