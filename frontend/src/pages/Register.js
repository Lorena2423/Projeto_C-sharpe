import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cliente");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:7230/api/Users", {
        name,
        email,
        password,
        role
      })
      .then(() => {
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
      })
      .catch((error) => {
        alert("Erro ao registrar usuário. Verifique os dados.");
        console.error("Erro no cadastro:", error);
      });
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Registrar</h2>
        <form onSubmit={handleSubmit}>
          <label className="register-label">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            required
            className="register-input"
          />

          <label className="register-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="register-input"
          />

          <label className="register-label">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
            className="register-input"
          />

          <label className="register-label">Tipo de Usuário</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            required
            className="register-input"
          >
            <option value="cliente">Cliente</option>
            <option value="procurador">Procurador</option>
          </select>

          <button type="submit" className="register-button">Cadastrar</button>
        </form>
        <p>Já tem uma conta? <a href="/login" className="login-link">Faça login</a></p>
      </div>
    </div>
  );
};

export default Register;
