//StockPage.jsx

import "./StockPage.css";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import AddProductForm from "../components/AddProductForm";
import { getFromLocalStorage } from "../utils/storage";

const StockPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stockName, setStockName] = useState("");

  useEffect(() => {
    const stocks = getFromLocalStorage("stocks") || [];
    const currentStock = stocks.find((stock) => stock.id === parseInt(id, 10));
    if (currentStock) {
      setStockName(currentStock.name);
    } else {
      navigate("/"); // Redireciona se o estoque não for encontrado
    }
  }, [id, navigate]);

  return (
    <div className="stock-page">
      <h1>{stockName ? `Estoque: ${stockName}` : "Carregando..."}</h1>
      <button className="back-btn" onClick={() => navigate(-1)}>
        Voltar
      </button>
      <div className="product-section">
        <AddProductForm stockId={id} />
        <ProductList stockId={id} />
      </div>
    </div>
  );
};

export default StockPage;
