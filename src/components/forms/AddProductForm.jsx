//AddProductForm.jsx

import "./AddProductForm.css";

import React, { useState } from "react";
import { useHandleDocuments } from "../../hooks/useHandleDocuments";
import { useStock } from "../../context/StockContext";

// Components
import CreateButton from "../buttons/createbutton/CreateButton";

const AddProductForm = ({ sectionId, onProductAdded }) => {
  const { addDocument } = useHandleDocuments();
  const { stockId } = useStock();
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productQuantity, setProductQuantity] = useState();

  const addProduct = async (e) => {
    e.preventDefault();

    if (!productName.trim() || !productCode.trim() || productQuantity <= 0)
      return;

    const newProduct = {
      name: productName.trim(),
      code: productCode.trim().toUpperCase(),
      quantity: parseInt(productQuantity, 10),
      createAt: new Date(),
    };

    const updatedProducts = await addDocument(
      "estoques",
      newProduct,
      stockId,
      sectionId
    );
    console.log("Produto criado com ID:", updatedProducts);

    setProductName("");
    setProductCode("");
    setProductQuantity(0);
    onProductAdded(); // Função que vai criar gatilho de atualização da ProductList
  };

  return (
    <form className="add-products" onSubmit={addProduct}>
      <label>
        <span>Nome do acessório:</span>
      </label>
      <input
        className="name-input"
        type="text"
        placeholder="Digite o nome"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <label>
        <span>Código do acessório:</span>
      </label>
      <input
        className="name-input"
        type=""
        placeholder="Digite o código"
        value={productCode}
        onChange={(e) => setProductCode(e.target.value)}
      />
      <label>
        <span>Quantidade:</span>
      </label>
      <input
        className="quantity-input"
        type="number"
        placeholder="0"
        value={productQuantity}
        onChange={(e) => setProductQuantity(e.target.value)}
      />
      <CreateButton label={"Criar Produto"} />
    </form>
  );
};

export default AddProductForm;
