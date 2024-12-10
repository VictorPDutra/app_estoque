//StockManagement.jsx

import "./StockManagement.css";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage";

const StockManagement = () => {
  const [stocks, setStocks] = useState([]);
  const [newStockName, setNewStockName] = useState("");

  useEffect(() => {
    const storedStocks = getFromLocalStorage("stocks") || [];
    setStocks(storedStocks);
  }, []);

  const addStock = () => {
    if (!newStockName.trim()) return;

    const newStock = { id: Date.now(), name: newStockName.trim() };

    const updatedStocks = [...stocks, newStock];
    setStocks(updatedStocks);
    saveToLocalStorage("stocks", updatedStocks);
    setNewStockName("");
  };

  const deleteStock = (id) => {
    const updatedStocks = stocks.filter((stock) => stock.id !== id);
    setStocks(updatedStocks);
    saveToLocalStorage("stocks", updatedStocks);
  };

  return (
    <div className="stock-management">
      <h1>Gerenciamento de Estoques</h1>
      <div className="add-estoque-form">
        <input
          type="text"
          value={newStockName}
          onChange={(e) => setNewStockName(e.target.value)}
          placeholder="Nome do Estoque"
        />
        <button onClick={addStock}>Criar Estoque</button>
      </div>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>
            <Link to={`/stock/${stock.id}`}>{stock.name}</Link>
            <button onClick={() => deleteStock(stock.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockManagement;
