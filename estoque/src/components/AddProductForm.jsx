//AddProductForm.jsx

import "./AddProductForm.css";

import React, { useState } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage";

const AddProductForm = ({ stockId }) => {
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);

  const addProduct = () => {
    if (!productName.trim() || productQuantity <= 0) return;

    const products = getFromLocalStorage(stockId) || [];
    const newProduct = {
      id: Date.now(),
      name: productName.trim(),
      quantity: parseInt(productQuantity, 10),
    };

    const updatedProducts = [...products, newProduct];
    saveToLocalStorage(stockId, updatedProducts);
    setProductName("");
    setProductQuantity(0);
  };

  return (
    <div className="add-products">
      <input
        className="name-input"
        type="text"
        placeholder="Nome do Produto"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        className="quantity-input"
        type="number"
        placeholder="Quantidade"
        value={productQuantity}
        onChange={(e) => setProductQuantity(e.target.value)}
      />
      <button onClick={addProduct}>Adicionar Produto</button>
    </div>
  );
};

export default AddProductForm;
