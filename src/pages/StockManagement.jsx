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
      <form className="add-estoque-form" onSubmit={addStock}>
        <label htmlFor="stock-name">Nome do estoque:</label>
        <input
          type="text"
          value={newStockName}
          onChange={(e) => setNewStockName(e.target.value)}
          placeholder="Digite o nome"
        />
        <button type="submit">Criar estoque</button>
      </form>
      <ul>
        {stocks.map((stock) => (
          <Link className="stock-link" key={stock.id} to={`/stock/${stock.id}`}>
            <li className="stock-item">
              {stock.name}
              <button
                className="removing"
                onClick={() => deleteStock(stock.id)}
              >
                Excluir
              </button>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default StockManagement;
