import styles from "./BackButton.module.css";

import { ArrowLeft } from "lucide-react";

const BackButton = ({ navigate }) => {
  return (
    <button className={styles.back_btn} onClick={() => navigate(-1)}>
      <ArrowLeft size={15} />
    </button>
  );
};

export default BackButton;
