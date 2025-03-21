import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './ProcessDetails.css';

const ProcessDetails = () => {
  const [processo, setProcesso] = useState(null);
  const { id } = useParams();  // Pegando o ID do processo da URL
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`https://localhost:7230/api/Processoes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setProcesso(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter detalhes do processo:", error);
        navigate("/home");
      });
  }, [id, navigate]);

  if (!processo) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="process-details-container">
      <h1>Detalhes do Processo</h1>
      <div className="process-card">
        <p><strong>Número:</strong> {processo.numero}</p>
        <p><strong>Nome:</strong> {processo.nome}</p>
        <p><strong>Assunto:</strong> {processo.assunto}</p>
        <p><strong>Descrição:</strong> {processo.descricao}</p>
        <p><strong>Data de Início:</strong> {processo.data_inicio}</p>
        <p><strong>Data de Fim:</strong> {processo.data_fim}</p>
        <p><strong>Cliente ID:</strong> {processo.cliente_id}</p>
        <p><strong>Status:</strong> {processo.status}</p>
      </div>
      <button onClick={() => navigate("/meus-processos")}>Voltar</button>
    </div>
  );
};

export default ProcessDetails;
