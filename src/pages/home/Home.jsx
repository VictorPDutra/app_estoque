import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.background_home}>
      <div className={styles.home}>
        <p className={styles.home_description}>
          Bem vindo ao <span className={styles.logo}>STOCKS</span>! <br />
          <br />
          Esta é a melhor plataforma de controle de estoques para empresas de
          esquadrias de alumínio.
        </p>
      </div>
    </div>
  );
};

export default Home;
