import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import axios from "axios";
import "./Login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7230/api/Users", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userTipo", response.data.role); 
        localStorage.setItem("userId", response.data.userId); 
        localStorage.setItem("userName", response.data.name); 
        navigate("/home"); 
      }
    } catch (error) {
      alert("Erro ao fazer login. Verifique suas credenciais.");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
  <div className="login-box">
    <h2 className="login-title">Login</h2>
    <form onSubmit={handleLogin}>
      <label className="login-label">Email</label>
      <input 
        type="email" 
        name="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        required
        className="login-input"
      />
      
      <label className="login-label">Senha</label>
      <input 
        type="password" 
        name="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Senha" 
        required
        className="login-input"
      />

      <button type="submit" className="login-button">Entrar</button>

      <Link to="/register" className="register-link">Cadastrar-se</Link>
    </form>
  </div>
</div>
  );
};

export default Login;
