//StockManagement.jsx

import "./StockManagement.css";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../globalcomponents/ConfirmationModal";
import CreateButton from "../../components/buttons/createbutton/CreateButton";
import { useHandleDocuments } from "../../hooks/useHandleDocuments";
import { useAuthentication } from "../../hooks/useAuthentication";

const StockManagement = () => {
  const [newStockName, setNewStockName] = useState("");
  const [stocksFirebase, setStocksFirebase] = useState([]);
  const [stockToDeleteFirebase, setStockToDeleteFirebase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dados necessários para criação de estoque no Firebase
  const { addDocument, getDocuments, deleteDocument, loading, error } =
    useHandleDocuments();
  const { auth } = useAuthentication();

  // Get stocks from Firebase
  const fetchStocks = async () => {
    const currentStocks = (await getDocuments("estoques")) || [];
    setStocksFirebase(currentStocks);
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  // Criação de estoque
  const handleAddStock = async (e) => {
    e.preventDefault();

    if (!newStockName.trim()) return;

    const newStock = {
      name: newStockName.trim(),
      userId: auth.currentUser.uid,
      createdAt: new Date(),
    };

    const stockId = await addDocument("estoques", newStock);

    if (stockId) {
      setStocksFirebase((prevStocks) => [
        ...prevStocks,
        { id: stockId, ...newStock },
      ]);
      setNewStockName("");
    }
  };

  // Modal de exclusão
  const modalDelete = (id) => {
    console.log(id);
    setStockToDeleteFirebase(id);
    setIsModalOpen(true);
  };

  // Modal de exclusão
  const cancelDelete = () => {
    setIsModalOpen(false);
    setStockToDeleteFirebase(null);
  };

  // Deletar estoque no Firebase
  const handleDeleteStock = async () => {
    if (!stockToDeleteFirebase) return;

    await deleteDocument("estoques", stockToDeleteFirebase);

    setStocksFirebase((prevStocks) =>
      prevStocks.filter((stock) => stock.id !== stockToDeleteFirebase)
    );

    setIsModalOpen(false);
    setStockToDeleteFirebase(null);
  };

  return (
    <div className="stock-management">
      <h1>Estoques</h1>
      <form className="add-estoque-form" onSubmit={handleAddStock}>
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
        {stocksFirebase.map((stock) => (
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
                  modalDelete(stock.id);
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
        onConfirm={handleDeleteStock}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default StockManagement;
