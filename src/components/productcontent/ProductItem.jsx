//ProductItem.jsx

import "./ProductItem.css";

import React, { useState } from "react";
import { saveToLocalStorage, getFromLocalStorage } from "../../utils/storage";
import ConfirmationModal from "../../globalcomponents/ConfirmationModal";
import ActionsButton from "../buttons/actionsbutton/ActionsButton";

const ProductItem = ({ product, sectionId, setProducts }) => {
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [updatedQuantity, setUpdatedQuantity] = useState(product.quantity);
  const [addAmount, setAddAmount] = useState(0);
  const [removeAmount, setRemoveAmount] = useState(0);
  // states para modal de exclusão
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

  // modal de exclusão - remove
  const confirmRemoveProduct = () => {
    setProductToDelete(product.id);
    setIsModalOpen(true);
  };

  const removeProduct = () => {
    const products = getFromLocalStorage(sectionId) || [];
    const updatedProducts = products.filter((p) => p.id !== productToDelete);
    saveToLocalStorage(sectionId, updatedProducts);
    setProducts(updatedProducts);
    // modal de exclusão
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  // modal de exclusão - cancel
  const cancelDelete = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  // add e subtract product
  const add = () => {
    setAdding(!adding);
  };

  const sub = () => {
    setRemoving(!removing);
  };

  const addQuantity = () => {
    const products = getFromLocalStorage(sectionId) || [];
    const updatedProducts = products.map((p) =>
      p.id === product.id
        ? { ...p, quantity: p.quantity + parseInt(addAmount, 10) }
        : p
    );
    saveToLocalStorage(sectionId, updatedProducts);
    setProducts(updatedProducts);
    setAdding(false);
    setAddAmount(0);
  };

  const subtractQuantity = () => {
    const products = getFromLocalStorage(sectionId) || [];
    const updatedProducts = products.map((p) =>
      p.id === product.id
        ? {
            ...p,
            quantity: Math.max(0, p.quantity - parseInt(removeAmount, 10)),
          }
        : p
    );
    saveToLocalStorage(sectionId, updatedProducts);
    setProducts(updatedProducts);
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
          <ActionsButton action={confirmRemoveProduct} label={"Excluir"} />
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
            onChange={(e) => setAddAmount(parseInt(e.target.value, 10))}
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
            onChange={(e) => setRemoveAmount(parseInt(e.target.value, 10))}
          />
          <button onClick={subtractQuantity}>Retirar</button>
        </div>
      )}
      {/* modal de exclusão */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirmar Exclusão?"
        message="Ao confirmar você perderá todos os dados deste produto!"
        onConfirm={removeProduct}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default ProductItem;
