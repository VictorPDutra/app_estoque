//AddSectionForm.jsx

import "./AddSectionForm.css";

import React, { useState } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../../utils/storage";
import CreateButton from "../buttons/createbutton/CreateButton";

const AddSectionForm = ({ stockId, onSectionAdded }) => {
  const [sectionName, setSectionName] = useState("");

  const addSection = (e) => {
    e.preventDefault();

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
    <form className="add-sections" onSubmit={addSection}>
      <label>
        <span>Nome da seção:</span>
      </label>
      <input
        className="name-input"
        type="text"
        placeholder="Digite o nome"
        value={sectionName}
        onChange={(e) => setSectionName(e.target.value)}
      />
      <CreateButton label={"Criar Seção"} />
    </form>
  );
};

export default AddSectionForm;
