//StockPage.jsx

import "./StockPage.css";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useHandleDocuments } from "../../hooks/useHandleDocuments";
import { useStock } from "../../context/StockContext";
import { ClipLoader } from "react-spinners";

// Components
import SectionList from "../sectioncontent/SectionList";
import AddSectionForm from "../forms/AddSectionForm";
import BackButton from "../buttons/backbutton/BackButton";

const StockPage = () => {
  const { id } = useParams(); // Permite acessar os dados do "id" que vem através da rota "/stocks:id" - Com isso podemos carregar o componente "StockPage" com os dados do "id"
  const { auth } = useAuthentication();
  const { stockId, setStockId, stockName, setStockName } = useStock();
  const { getDocuments } = useHandleDocuments();
  const navigate = useNavigate(); // Permite programar ações de navegação dentro do componente
  const [sectionUpdateTrigger, setSectionUpdateTrigger] = useState(0); // Estado usado para criar gatilho de atualiuzação automática da SectionList
  const [loading, setLoading] = useState(true);

  // Get stock from Firebase
  useEffect(() => {
    if (!id) return;

    setStockId(id);

    const fetchStock = async () => {
      try {
        const stocks = await getDocuments("estoques");
        const currentStock = stocks?.find((stock) => stock.id === id);

        if (currentStock && currentStock.userId === auth.currentUser.uid) {
          // Para usuário não acessar por rota sem estar logado
          setStockName(currentStock.name); // Se o stock foi encontrado, adiciona "name" ao state "stockName" - usado para adicionar como título da página
        } else {
          navigate("/app_estoque"); // Redireciona se o estoque não for encontrado
        }
      } catch (error) {
        console.error("Erro ao buscar estoque:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, [id, auth.currentUser]);

  // Função para criar gatilho de atualização automática da SectionList
  const handleSectionAdded = () => {
    setSectionUpdateTrigger((prev) => prev + 1);
  };

  return (
    <div className="stock-page">
      <div className="breadcrumbs">
        <BackButton navigate={navigate} />
        <h1>{stockName ? stockName : "Carregando..."}</h1>
      </div>
      <div className="product-section">
        <AddSectionForm onSectionAdded={handleSectionAdded} />
        {loading ? (
          <div className="loader-container">
            <ClipLoader color="#007bff" size={20} />
          </div>
        ) : (
          <SectionList updateTrigger={sectionUpdateTrigger} />
        )}
      </div>
    </div>
  );
};

export default StockPage;
