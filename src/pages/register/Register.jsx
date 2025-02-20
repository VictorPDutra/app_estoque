import CreateButton from "../../components/buttons/createbutton/CreateButton";
import styles from "./Register.module.css";

import { useState } from "react";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassWord] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("As senhas devem ser iguais!");
      return;
    }

    const user = {
      displayName,
      email,
      password,
    };

    console.log(user);
  };

  return (
    <div className={styles.register}>
      <div className={styles.header}>
        <h1>Cadastre-se para utilizar o sistema</h1>
        <p>Crie seu usuário e começe a adicionar seu estoque</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome do usuário"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
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
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassWord(e.target.value)}
          />
        </label>
        {error && <p className="error">{error}</p>}
        {!loading && <CreateButton label={"Cadastrar"} />}
        {loading && <CreateButton label={"Cadastrando..."} disabled={true} />}
      </form>
    </div>
  );
};

export default Register;
