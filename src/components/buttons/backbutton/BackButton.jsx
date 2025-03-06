import styles from "./BackButton.module.css";

import { ChevronLeft } from "lucide-react";

const BackButton = ({ navigate }) => {
  return (
    <button className={styles.back_btn} onClick={() => navigate(-1)}>
      <ChevronLeft className={styles.arrow} size={26} />
    </button>
  );
};

export default BackButton;
