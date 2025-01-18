import style from "./CreateButton.module.css";

const CreateButton = ({ label }) => {
  return (
    <button className={style.create_button} type="submit">
      {label}
    </button>
  );
};

export default CreateButton;
