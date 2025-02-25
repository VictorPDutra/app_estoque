//AddSectionForm.jsx

import "./AddSectionForm.css";

import React, { useState } from "react";
import CreateButton from "../buttons/createbutton/CreateButton";
import { useHandleDocuments } from "../../hooks/useHandleDocuments";

const AddSectionForm = ({ stockId, onSectionAdded }) => {
  const [sectionName, setSectionName] = useState("");
  const { addDocument } = useHandleDocuments();

  const addSection = async (e) => {
    e.preventDefault();

    if (!sectionName.trim()) return;

    const newSection = {
      createAt: new Date(),
      name: sectionName.trim(),
    };

    const updatedSection = await addDocument("estoques", newSection, stockId);
    console.log("Sessão criada com ID:", updatedSection);

    setSectionName("");
    onSectionAdded(); // Função que vai criar gatilho de atualização da SectionList
  };

  return (
    <form className="add-sections" onSubmit={addSection}>
      <label>
        <span>Nome da linha:</span>
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
