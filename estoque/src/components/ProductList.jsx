//ProductList.jsx

import "./ProductList.css";

import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import { getFromLocalStorage } from "../utils/storage";

const ProductList = ({ stockId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = getFromLocalStorage(stockId) || [];
    setProducts(storedProducts);
  }, [stockId]);

  return (
    <div className="product-list">
      <h2>Produtos</h2>
      <div className="product-items">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            stockId={stockId}
            setProducts={setProducts}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
