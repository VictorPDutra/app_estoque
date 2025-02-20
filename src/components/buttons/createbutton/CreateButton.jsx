import style from "./CreateButton.module.css";

const CreateButton = ({ label, disabled }) => {
  return (
    <button className={style.create_button} type="submit" disabled={disabled}>
      {label}
    </button>
  );
};

export default CreateButton;
