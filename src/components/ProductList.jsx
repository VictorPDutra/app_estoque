//ProductList.jsx

import "./ProductList.css";

import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import { getFromLocalStorage } from "../utils/storage";

const ProductList = ({ sectionId, updateTrigger }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = getFromLocalStorage(sectionId) || [];
    setProducts(storedProducts);
    updateTrigger = 0; // Retornamos updateTrigger para seu estado inicial
  }, [sectionId, updateTrigger]);

  return (
    <div className="product-list">
      <h2>Produtos</h2>
      <div className="product-items">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            sectionId={sectionId}
            setProducts={setProducts}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
