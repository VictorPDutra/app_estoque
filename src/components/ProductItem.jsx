//ProductItem.jsx

import "./ProductItem.css";

import React, { useState } from "react";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/storage";

const ProductItem = ({ product, sectionId, setProducts }) => {
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [updatedQuantity, setUpdatedQuantity] = useState(product.quantity);
  const [addAmount, setAddAmount] = useState(0);
  const [removeAmount, setRemoveAmount] = useState(0);

  const updateProduct = () => {
    const products = getFromLocalStorage(sectionId) || [];
    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, quantity: updatedQuantity } : p
    );
    saveToLocalStorage(sectionId, updatedProducts);
    setProducts(updatedProducts);
    setEditing(false);
  };

  const removeProduct = () => {
    const products = getFromLocalStorage(sectionId) || [];
    const updatedProducts = products.filter((p) => p.id !== product.id);
    saveToLocalStorage(sectionId, updatedProducts);
    setProducts(updatedProducts);
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
          <button onClick={() => setAdding(!adding)}>Acrescentar</button>
          <button onClick={() => setRemoving(!removing)}>Retirar</button>
          <button onClick={() => setEditing(!editing)}>Editar</button>
          <button className="delete-button" onClick={removeProduct}>
            Remover
          </button>
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
          <button onClick={addQuantity}>Salvar</button>
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
          <button onClick={subtractQuantity}>Salvar</button>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
