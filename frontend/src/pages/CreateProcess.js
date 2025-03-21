import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateProcess.css';
import 'boxicons/css/boxicons.min.css';

const CreateProcess = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  
  const [processo, setProcesso] = useState({
    numero: '',
    nome: '',
    assunto: '',
    descricao: '',
    data_inicio: '',
    data_fim: '',
    cliente_id: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("Token não encontrado");
      navigate("/login");
      return;
    }

    axios.get("https://localhost:7230/api/Users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setUser(response.data);
        setUserRole(response.data.role);
      })
      .catch((error) => {
        console.error("Erro ao obter informações do usuário:", error);
        navigate("/login");
      });
  }, [navigate]);

  const handleChange = (e) => {
    setProcesso({
      ...processo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios.post('https://localhost:7230/api/Processoes', processo, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert('Processo criado com sucesso!');
        navigate('/home');
      })
      .catch(error => {
        alert('Erro ao criar processo: Permissão insuficiente ou dados inválidos.');
        console.error('Erro ao criar processo:', error);
      });
  };

  if (!user) return <div className="loading">Carregando...</div>;

  if (userRole === 'cliente') {
    return (
      <div className="access-denied">
        <p>Acesso negado, permissão insuficiente.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="user-info">
          <i className="bx bx-user-circle user-icon"></i>
          <div className="user-details">
            <p>{user.name}</p>
            <p>ID: {user.id}</p>
          </div>
        </div>
        <nav>
          <button className="nav-button" onClick={() => navigate("/meus-processos")}> 
            <i className='bx bx-book-open'></i> Meus Processos
          </button>
          {userRole === "procurador" && (
            <button className="nav-button" onClick={() => navigate("/criar-processo")}> 
              <i className='bx bxs-paste'></i> Criar Processos
            </button>
          )}
          <button className="nav-button" onClick={() => navigate("/detalhes-processo")}> 
            <i className='bx bx-spreadsheet'></i> Detalhes Processos
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header>
          <h1>Criar Processos</h1>
        </header>
        <section className="form-section">
          <form onSubmit={handleSubmit}>
            <input type="number" name="numero" value={processo.numero} onChange={handleChange} placeholder="Número" required />
            <input type="text" name="nome" value={processo.nome} onChange={handleChange} placeholder="Nome" required />
            <input type="text" name="assunto" value={processo.assunto} onChange={handleChange} placeholder="Assunto" required />
            <textarea name="descricao" value={processo.descricao} onChange={handleChange} placeholder="Descrição" required />
            <input type="date" name="data_inicio" value={processo.data_inicio} onChange={handleChange} required />
            <input type="date" name="data_fim" value={processo.data_fim} onChange={handleChange} required />
            <input type="number" name="cliente_id" value={processo.cliente_id} onChange={handleChange} placeholder="ID Cliente" required />
            <button type="submit">Criar Processo</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default CreateProcess;
