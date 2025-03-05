//ProductItem.jsx

import "./ProductItem.css";

import React, { useState } from "react";
import { useHandleDocuments } from "../../hooks/useHandleDocuments";
import { useStock } from "../../context/StockContext";

// Components
import ConfirmationModal from "../../globalcomponents/ConfirmationModal";
import ActionsButton from "../buttons/actionsbutton/ActionsButton";
import CreateButton from "../buttons/createbutton/CreateButton";

const ProductItem = ({ sectionId, product, setProducts }) => {
  const { stockId } = useStock();
  const { deleteDocument, updateDocument } = useHandleDocuments();
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [updatedQuantity, setUpdatedQuantity] = useState(product.quantity);
  const [addAmount, setAddAmount] = useState(0);
  const [removeAmount, setRemoveAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // updateProduct
  const updateProduct = () => {
    const products = getFromLocalStorage(sectionId) || [];
    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, quantity: updatedQuantity } : p
    );
    saveToLocalStorage(sectionId, updatedProducts);
    setProducts(updatedProducts);
    setEditing(false);
  };

  // Delete Product
  // Modal - Open delete
  const modalDelete = () => {
    setProductToDelete(product.id);
    setIsModalOpen(true);
  };

  // Modal - Cancel delete
  const cancelDelete = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  // Confirm delete
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    await deleteDocument("estoques", productToDelete, stockId, sectionId);

    setProducts((prevProducts) =>
      prevProducts.filter((prev) => prev.id !== productToDelete)
    );

    setIsModalOpen(false);
    setProductToDelete(null);
  };

  // Add and subtract product
  const add = () => {
    setAdding(!adding);
  };

  const sub = () => {
    setRemoving(!removing);
  };

  // Update quantity on Firestore
  const handleUpdateQuantity = async (change) => {
    try {
      const updatedQuantity = Math.max(0, product.quantity + change);

      await updateDocument(
        "estoques",
        product.id,
        stockId,
        {
          quantity: updatedQuantity,
        },
        sectionId
      );

      // Atualiza a lista de produtos no estado local para refletir a mudança
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: updatedQuantity } : p
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error);
    }
  };

  // Add quantity
  const addQuantity = () => {
    handleUpdateQuantity(parseInt(addAmount, 10));
    setAdding(false);
    setAddAmount(0);
  };

  // Subtract quantity
  const subtractQuantity = () => {
    handleUpdateQuantity(-parseInt(removeAmount, 10));
    setRemoving(false);
    setRemoveAmount(0);
  };

  return (
    <div className="product-item">
      {/* Cabeçalho com título e ações na mesma linha */}
      <div className="header">
        <div>
          <div className="product-data">
            <h4>Nome:</h4>
            <p className="product-span">{product.name}</p>
          </div>

          <div className="product-data">
            <h4> Código:</h4>
            <p className="product-span">{product.code}</p>
          </div>

          <div className="product-data">
            <h4> Quantidade:</h4>
            <p className="quantity-span">{product.quantity}</p>
          </div>
        </div>

        <div className="actions">
          <ActionsButton action={add} label={"Entrada"} />
          <ActionsButton action={sub} label={"Saída"} />
          <ActionsButton action={modalDelete} label={"Excluir"} />
        </div>
      </div>

      {/* Formulários para editar, acrescentar e retirar */}
      {editing && (
        <div className="form">
          <input
            type="number"
            value={updatedQuantity}
            onChange={(e) => setUpdatedQuantity(parseInt(e.target.value, 10))}
          />
          <button onClick={updateProduct}>Salvar</button>
        </div>
      )}

      {adding && (
        <form className="form" onSubmit={addQuantity}>
          <input
            type="number"
            placeholder="Quantidade a acrescentar"
            value={addAmount}
            onChange={(e) => setAddAmount(e.target.value)}
          />
          <CreateButton label={"Adicionar"} />
        </form>
      )}

      {removing && (
        <form className="form" onSubmit={subtractQuantity}>
          <input
            type="number"
            placeholder="Quantidade a retirar"
            value={removeAmount}
            onChange={(e) => setRemoveAmount(e.target.value)}
          />
          <CreateButton label={"Retirar"} />
        </form>
      )}
      {/* modal de exclusão */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirmar Exclusão?"
        message="Ao confirmar você perderá todos os dados deste produto!"
        onConfirm={handleDeleteProduct}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default ProductItem;
