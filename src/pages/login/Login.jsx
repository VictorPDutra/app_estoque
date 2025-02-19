import CreateButton from "../../components/buttons/createbutton/CreateButton";
import styles from "./Login.module.css";

import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // setLoading(true);
      // const response = await api.post("/login", {
      //   email,
      //   password,
      // });
      // console.log(response.data);
      // setLoading(false);
      // setUser(response.data);
      // navigate("/app_estoque");
    } catch (error) {
      // setLoading(false);
      setError(error.response.data.error);
    }
  };

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para acessar seus estoques</p>
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
        {!loading && <CreateButton label={"Entrar"} />}
        {loading && <CreateButton label={"Entrando..."} disabled={true} />}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
