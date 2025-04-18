//StockManagement.jsx

import "./StockManagement.css";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHandleDocuments } from "../../hooks/useHandleDocuments";
import { useAuthentication } from "../../hooks/useAuthentication";
import { ClipLoader } from "react-spinners";

// Components
import ConfirmationModal from "../../globalcomponents/ConfirmationModal";
import CreateButton from "../../components/buttons/createbutton/CreateButton";

const StockManagement = () => {
  const { auth } = useAuthentication();
  const { addDocument, getDocuments, deleteDocument } = useHandleDocuments();
  const [newStockName, setNewStockName] = useState("");
  const [stocksFirebase, setStocksFirebase] = useState([]);
  const [stockToDeleteFirebase, setStockToDeleteFirebase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get stocks from Firebase

  useEffect(() => {
    const fetchStocks = async () => {
      if (!auth.currentUser) return; //Adicionado
      const userStocks = (await getDocuments("estoques")) || [];
      const filteredStocks = userStocks.filter(
        (stock) => stock.userId === auth.currentUser.uid
      );
      setStocksFirebase(filteredStocks);
      setLoading(false);
    };

    fetchStocks();
  }, [auth.currentUser]);

  // Add stock
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

  // Delete stock
  const modalDelete = (id) => {
    console.log(id);
    setStockToDeleteFirebase(id);
    setIsModalOpen(true);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setStockToDeleteFirebase(null);
  };

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
      {loading ? (
        <div className="loader-container">
          <ClipLoader color="#007bff" size={20} />
        </div>
      ) : (
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
      )}

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
