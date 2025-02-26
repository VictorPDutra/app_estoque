//ProductList.jsx

import "./ProductList.css";

import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import { useHandleDocuments } from "../../hooks/useHandleDocuments";
import { useStock } from "../../context/StockContext";

const ProductList = ({ sectionId, updateTrigger }) => {
  const [products, setProducts] = useState([]);
  const { getDocuments } = useHandleDocuments();
  const { stockId } = useStock();

  const fetchProducts = async () => {
    const currentProducts =
      (await getDocuments("estoques", stockId, sectionId)) || [];
    setProducts(currentProducts);
    console.log(currentProducts);
  };

  useEffect(() => {
    fetchProducts();
    updateTrigger = 0; // Retornamos updateTrigger para seu estado inicial
  }, [sectionId, updateTrigger]);

  return (
    <div className="product-list">
      <h2>Acessórios</h2>
      <div className="product-items">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            sectionId={sectionId}
            product={product}
            setProducts={setProducts}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
