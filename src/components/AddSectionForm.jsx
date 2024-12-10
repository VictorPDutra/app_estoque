//AddSectionForm.jsx

import "./AddSectionForm.css";

import React, { useState } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage";

const AddSectionForm = ({ stockId, onSectionAdded }) => {
  const [sectionName, setSectionName] = useState("");

  const addSection = () => {
    if (!sectionName.trim()) return;

    const sections = getFromLocalStorage(stockId) || [];
    const newSection = {
      id: Date.now(),
      name: sectionName.trim(),
    };

    const updatedSections = [...sections, newSection];
    saveToLocalStorage(stockId, updatedSections);
    setSectionName("");
    onSectionAdded(); // Função que vai criar gatilho de atualização da SectionList
  };

  return (
    <div className="add-sections">
      <input
        className="name-input"
        type="text"
        placeholder="Nome da seção"
        value={sectionName}
        onChange={(e) => setSectionName(e.target.value)}
      />
      <button onClick={addSection}>Adicionar Produto</button>
    </div>
  );
};

export default AddSectionForm;
