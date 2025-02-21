// CSS
import styles from "./Navbar.module.css";

import { NavLink } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const { logoutUser } = useAuthentication();

  return (
    <nav className={styles.navComponent}>
      <div className={styles.logo}>
        <NavLink to="/home">
          <h1>Stocks</h1>
        </NavLink>
      </div>
      <div className={styles.toolBox}>
        <ul className={styles.toolList}>
          {!user && (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Entrar
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Cadastrar
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
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
                  to="/home"
                  onClick={logoutUser}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Sair
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
