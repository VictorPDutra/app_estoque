import styles from "./BackButton.module.css";

const BackButton = ({ navigate }) => {
  return (
    <button className={styles.back_btn} onClick={() => navigate(-1)}>
      Voltar
    </button>
  );
};

export default BackButton;
