//ProductItem.jsx

import "./ProductItem.css";

import React, { useState } from "react";
import { useHandleDocuments } from "../../hooks/useHandleDocuments";
import { useStock } from "../../context/StockContext";

// Components
import ConfirmationModal from "../../globalcomponents/ConfirmationModal";
import ActionsButton from "../buttons/actionsbutton/ActionsButton";

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
        <h4>
          <span className="product-span">{product.name}</span> -{" "}
          <span className="quantity-span">{product.quantity}</span>
        </h4>
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
        <div className="form">
          <input
            type="number"
            placeholder="Quantidade a acrescentar"
            value={addAmount}
            onChange={(e) => setAddAmount(e.target.value)}
          />
          <button onClick={addQuantity}>Adicionar</button>
        </div>
      )}

      {removing && (
        <div className="form">
          <input
            type="number"
            placeholder="Quantidade a retirar"
            value={removeAmount}
            onChange={(e) => setRemoveAmount(e.target.value)}
          />
          <button onClick={subtractQuantity}>Retirar</button>
        </div>
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
