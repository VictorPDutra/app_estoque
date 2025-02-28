// CSS
import styles from "./Login.module.css";
// Components
import CreateButton from "../../components/buttons/createbutton/CreateButton";

import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loginUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      email,
      password,
    };

    const res = await loginUser(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
      console.log(error);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <div className={styles.header}>
        <h1>Entrar</h1>
        <p>Faça o login para acessar seus estoques</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className="error">{error}</p>}
        {!loading && <CreateButton label={"Entrar"} />}
        {loading && <CreateButton label={"Entrando..."} disabled={true} />}
      </form>
    </div>
  );
};

export default Login;
