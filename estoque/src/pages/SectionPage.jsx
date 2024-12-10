//SectionPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddProductForm from "../components/AddProductForm";
import ProductList from "../components/ProductList";
import { getFromLocalStorage } from "../utils/storage";

const SectionPage = () => {
  const { stockId, sectionId } = useParams(); // Permite acessar os dados do "id" que vem através da rota "/section:id" - Com isso podemos carregar o componente "SectionPage" com os dados do "id"
  const navigate = useNavigate(); // Permite programar ações de navegação dentro do componente
  const [sectionName, setSectionName] = useState("");
  const [productUpdateTrigger, setProductUpdateTrigger] = useState(0); // Estado usado para criar gatilho de atualização automática da ProductList

  useEffect(() => {
    // Função que busca a seção correspondente ao do "id" passado na rota. Usado para buscar o nome da seção para imprimir na tela
    const sections = getFromLocalStorage(stockId) || []; // Busca todo estoque armazenados em stockId, e adiciona na variável "sections"
    const currentSection = sections.find(
      (section) => section.id === parseInt(sectionId, 10)
    ); // Percorre o array "sections" e retorna a seção com mesmo "id" da rota
    if (currentSection) {
      setSectionName(currentSection.name); // Se a section foi encontrada, adiciona "name" ao state "sectionName" - usado para adicionar como título da página
    } else {
      navigate(`/stocks/${stockId}`); // Redireciona se a seção não for encontrada
    }
  }, [stockId, sectionId, navigate]);

  // Função para criar gatilho de atualização automática da ProductList
  const handleProductAdded = () => {
    setProductUpdateTrigger((prev) => prev + 1); // Altera o estado para forçar a re-renderização
  };

  return (
    <div className="stock-page">
      <h1>{sectionName ? `Seção: ${sectionName}` : "Carregando..."}</h1>
      <button className="back-btn" onClick={() => navigate(-1)}>
        Voltar
      </button>
      <div className="product-section">
        <AddProductForm
          sectionId={sectionId}
          onProductAdded={handleProductAdded}
        />
        <ProductList
          sectionId={sectionId}
          updateTrigger={productUpdateTrigger}
        />
      </div>
    </div>
  );
};

export default SectionPage;
