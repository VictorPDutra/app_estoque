//SectionItem.jsx

import "./SectionItem.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/storage";

const SectionItem = ({ section, stockId, setSections }) => {
  const [editing, setEditing] = useState(false);
  const [updatedQuantity, setUpdatedQuantity] = useState(section.name);

  // updateSection
  const updateSection = () => {
    const sections = getFromLocalStorage(stockId) || [];
    const updatedSections = sections.map((p) =>
      p.id === section.id ? { ...p, name: updatedQuantity } : p
    );
    saveToLocalStorage(stockId, updatedSections);
    setSections(updatedSections);
    setEditing(false);
  };

  // removeSection
  const removeSection = () => {
    const sections = getFromLocalStorage(stockId) || [];
    const updatedSections = sections.filter((p) => p.id !== section.id);
    saveToLocalStorage(stockId, updatedSections);
    setSections(updatedSections);
  };

  return (
    <div className="section-item">
      {/* Cabeçalho com título e ações na mesma linha */}
      <div className="header">
        <Link to={`/stock/${stockId}/sections/${section.id}`}>
          <h4>{section.name}</h4>
        </Link>
        <div className="actions">
          <button onClick={() => setEditing(!editing)}>Editar</button>
          <button className="delete-button" onClick={removeSection}>
            Remover
          </button>
        </div>
      </div>

      {/* Formulários para editar, acrescentar e retirar */}
      {editing && (
        <div className="form">
          <input
            type="text"
            value={updatedQuantity}
            onChange={(e) => setUpdatedQuantity(e.target.value)}
          />
          <button onClick={updateSection}>Salvar</button>
        </div>
      )}
    </div>
  );
};

export default SectionItem;
