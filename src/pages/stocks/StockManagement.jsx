//StockManagement.jsx

import "./StockManagement.css";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFromLocalStorage, saveToLocalStorage } from "../../utils/storage";
// import { useValidate } from "../hooks/useValidate";
import ConfirmationModal from "../../globalcomponents/ConfirmationModal";
import CreateButton from "../../components/buttons/createbutton/CreateButton";

const StockManagement = () => {
  const [stocks, setStocks] = useState([]);
  const [newStockName, setNewStockName] = useState("");
  // states para modal de exclusão
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stockToDelete, setStockToDelete] = useState(null);

  useEffect(() => {
    const storedStocks = getFromLocalStorage("stocks") || [];
    setStocks(storedStocks);
  }, []);

  const addStock = (e) => {
    e.preventDefault();

    // useValidate("stocks", newStockName);

    if (!newStockName.trim()) return;
    const newStock = { id: Date.now(), name: newStockName.trim() };
    const updatedStocks = [...stocks, newStock];
    setStocks(updatedStocks);
    saveToLocalStorage("stocks", updatedStocks);
    setNewStockName("");
  };

  // modal de exclusão
  const confirmDeleteStock = (id) => {
    setStockToDelete(id);
    setIsModalOpen(true);
  };

  const deleteStock = () => {
    const updatedStocks = stocks.filter((stock) => stock.id !== stockToDelete);
    setStocks(updatedStocks);
    saveToLocalStorage("stocks", updatedStocks);
    // modal de exclusão
    setIsModalOpen(false);
    setStockToDelete(null);
  };

  // modal de exclusão
  const cancelDelete = () => {
    setIsModalOpen(false);
    setStockToDelete(null);
  };

  return (
    <div className="stock-management">
      <h1>Estoques</h1>
      <form className="add-estoque-form" onSubmit={addStock}>
        <label>Nome do estoque:</label>
        <input
          type="text"
          value={newStockName}
          onChange={(e) => setNewStockName(e.target.value)}
          placeholder="Digite o nome"
        />
        <CreateButton label={"Criar Estoque"} />
      </form>
      <ul>
        {stocks.map((stock) => (
          <Link
            className="stock-link"
            key={stock.id}
            to={`/app_estoque/stock/${stock.id}`}
          >
            <li className="stock-item">
              {stock.name}
              <button
                className="removing"
                onClick={(e) => {
                  e.preventDefault();
                  confirmDeleteStock(stock.id);
                }}
              >
                Excluir
              </button>
            </li>
          </Link>
        ))}
      </ul>
      {/* modal de exclusão */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirmar Exclusão?"
        message="Ao confirmar você perderá todos os dados deste estoque!"
        onConfirm={deleteStock}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default StockManagement;
