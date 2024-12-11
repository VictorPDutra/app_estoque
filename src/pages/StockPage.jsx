//StockPage.jsx

import "./StockPage.css";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SectionList from "../components/SectionList";
import AddSectionForm from "../components/AddSectionForm";
import { getFromLocalStorage } from "../utils/storage";

const StockPage = () => {
  const { id } = useParams(); // Permite acessar os dados do "id" que vem através da rota "/stocks:id" - Com isso podemos carregar o componente "StockPage" com os dados do "id"
  const navigate = useNavigate(); // Permite programar ações de navegação dentro do componente
  const [stockName, setStockName] = useState("");
  const [sectionUpdateTrigger, setSectionUpdateTrigger] = useState(0); // Estado usado para criar gatilho de atualiuzação automática da SectionList

  useEffect(() => {
    // Função que busca o estoque correspondente ao do "id" passado na rota. Usado para buscar o nome do estoque para imprimir na tela
    const stocks = getFromLocalStorage("stocks") || []; // Busca todo estoque armazenados em "stocks"(localStorage), e adiciona na variável "stocks"
    const currentStock = stocks.find((stock) => stock.id === parseInt(id, 10)); // Percorre o array "stocks" e retorna o estoque com mesmo "id" da rota
    if (currentStock) {
      setStockName(currentStock.name); // Se o stock foi encontrado, adiciona "name" ao state "stockName" - usado para adicionar como título da página
    } else {
      navigate("/app_estoque"); // Redireciona se o estoque não for encontrado
    }
  }, [id, navigate]);

  // Função para criar gatilho de atualização automática da SectionList
  const handleSectionAdded = () => {
    setSectionUpdateTrigger((prev) => prev + 1); // Altera o estado para forçar a re-renderização
  };

  return (
    <div className="stock-page">
      <h1>{stockName ? `Estoque: ${stockName}` : "Carregando..."}</h1>
      <button className="back-btn" onClick={() => navigate(-1)}>
        Voltar
      </button>
      <div className="product-section">
        <AddSectionForm stockId={id} onSectionAdded={handleSectionAdded} />
        <SectionList stockId={id} updateTrigger={sectionUpdateTrigger} />
      </div>
    </div>
  );
};

export default StockPage;
