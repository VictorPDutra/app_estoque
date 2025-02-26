//SectionPage.jsx

//import "./SectionPage.css";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHandleDocuments } from "../../hooks/useHandleDocuments";
import { useStock } from "../../context/StockContext";
import { ClipLoader } from "react-spinners";

// Components
import AddProductForm from "../forms/AddProductForm";
import ProductList from "../productcontent/ProductList";
import BackButton from "../buttons/backbutton/BackButton";

const SectionPage = () => {
  const navigate = useNavigate(); // Permite programar ações de navegação dentro do componente
  const { sectionId } = useParams(); // Permite acessar os dados do "id" que vem através da rota "/section:id" - Com isso podemos carregar o componente "SectionPage" com os dados do "id"
  const { stockId } = useStock();
  const { getDocuments } = useHandleDocuments();
  const [sectionName, setSectionName] = useState("");
  const [productUpdateTrigger, setProductUpdateTrigger] = useState(0); // Estado usado para criar gatilho de atualização automática da ProductList
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const sections = await getDocuments("estoques", stockId);
        const currentSection = sections.find(
          (section) => section.id === sectionId
        );

        if (currentSection) {
          setSectionName(currentSection.name); // Se a section foi encontrada, adiciona "name" ao state "sectionName" - usado para adicionar como título da página
        } else {
          navigate(`/app_estoque/stock/${stockId}`); // Redireciona se a seção não for encontrada
        }
      } catch (error) {
        console.error("Erro ao buscar estoque:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSection();
  }, [stockId, sectionId, navigate, getDocuments]);

  // Função para criar gatilho de atualização automática da ProductList
  const handleProductAdded = () => {
    setProductUpdateTrigger((prev) => prev + 1); // Altera o estado para forçar a re-renderização
  };

  return (
    <div className="stock-page">
      <h1>{sectionName ? `Linha: ${sectionName}` : "Carregando..."}</h1>
      <BackButton navigate={navigate} />
      <div className="product-section">
        <AddProductForm
          sectionId={sectionId}
          onProductAdded={handleProductAdded}
        />
        {loading ? (
          <div className="loader-container">
            <ClipLoader color="#007bff" size={20} />
          </div>
        ) : (
          <ProductList
            sectionId={sectionId}
            updateTrigger={productUpdateTrigger}
          />
        )}
      </div>
    </div>
  );
};

export default SectionPage;
