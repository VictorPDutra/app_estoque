// CSS
import styles from "./Navbar.module.css";

import { NavLink } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";

const Navbar = () => {
  return (
    <nav className={styles.navComponent}>
      <div className={styles.logo}>
        <NavLink to="/home">
          <h1>Stocks</h1>
        </NavLink>
      </div>
      <div className={styles.toolBox}>
        <ul className={styles.toolList}>
          <li>
            <NavLink
              to="/app_estoque"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Estoques
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Entrar
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Cadastrar
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Sair
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
