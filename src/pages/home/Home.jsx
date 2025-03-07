import React from "react";
import styles from "./Home.module.css";
import HomeStock from "../../assets/homestock.svg";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.home}>
        <p className={styles.home_description}>
          Bem vindo ao <span className={styles.logo}>STOCKS</span>!
        </p>
      </div>
      <div>
        <img src={HomeStock} alt="" className={styles.image_home} />
      </div>
    </div>
  );
};

export default Home;
