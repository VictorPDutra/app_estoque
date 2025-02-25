//SectionPage.jsx

//import "./SectionPage.css";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddProductForm from "../forms/AddProductForm";
import ProductList from "../productcontent/ProductList";
import BackButton from "../buttons/backbutton/BackButton";
import { useHandleDocuments } from "../../hooks/useHandleDocuments";

const SectionPage = () => {
  const { stockId, sectionId } = useParams(); // Permite acessar os dados do "id" que vem através da rota "/section:id" - Com isso podemos carregar o componente "SectionPage" com os dados do "id"
  const { getDocuments } = useHandleDocuments();
  const navigate = useNavigate(); // Permite programar ações de navegação dentro do componente
  const [sectionName, setSectionName] = useState("");
  const [productUpdateTrigger, setProductUpdateTrigger] = useState(0); // Estado usado para criar gatilho de atualização automática da ProductList

  useEffect(() => {
    const fetchSection = async () => {
      const sections = await getDocuments("estoques", stockId);
      const currentSection = sections.find(
        (section) => section.id === sectionId
      );

      if (currentSection) {
        setSectionName(currentSection.name); // Se a section foi encontrada, adiciona "name" ao state "sectionName" - usado para adicionar como título da página
      } else {
        navigate(`/app_estoque/stock/${stockId}`); // Redireciona se a seção não for encontrada
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
          stockId={stockId}
          sectionId={sectionId}
          onProductAdded={handleProductAdded}
        />
        <ProductList
          stockId={stockId}
          sectionId={sectionId}
          updateTrigger={productUpdateTrigger}
        />
      </div>
    </div>
  );
};

export default SectionPage;
