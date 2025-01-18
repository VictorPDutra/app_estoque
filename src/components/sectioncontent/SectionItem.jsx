//SectionItem.jsx

import "./SectionItem.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { saveToLocalStorage, getFromLocalStorage } from "../../utils/storage";
import ConfirmationModal from "../../globalcomponents/ConfirmationModal";
import ActionsButton from "../buttons/actionsbutton/ActionsButton";

const SectionItem = ({ section, stockId, setSections }) => {
  const [editing, setEditing] = useState(false);
  const [updatedQuantity, setUpdatedQuantity] = useState(section.name);
  // states para modal de exclusão
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState(null);

  // updateSection
  const edit = () => {
    setEditing(!editing);
  };

  const updateSection = () => {
    const sections = getFromLocalStorage(stockId) || [];
    const updatedSections = sections.map((p) =>
      p.id === section.id ? { ...p, name: updatedQuantity } : p
    );
    saveToLocalStorage(stockId, updatedSections);
    setSections(updatedSections);
    setEditing(false);
  };

  // modal de exclusão
  const confirmDeleteSection = (id) => {
    setSectionToDelete(id);
    setIsModalOpen(true);
  };

  // removeSection
  const removeSection = () => {
    const sections = getFromLocalStorage(stockId) || [];
    const updatedSections = sections.filter((p) => p.id !== sectionToDelete); // section.id
    saveToLocalStorage(stockId, updatedSections);
    setSections(updatedSections);
    // modal de exclusão
    setIsModalOpen(false);
    setSectionToDelete(null);
  };

  // modal de exclusão
  const cancelDelete = () => {
    setIsModalOpen(false);
    setSectionToDelete(null);
  };

  return (
    <div className="section-item">
      {/* Cabeçalho com título e ações na mesma linha */}
      <div className="header">
        <Link
          className="item-link"
          to={`/app_estoque/stock/${stockId}/sections/${section.id}`}
        >
          <h4>{section.name}</h4>
        </Link>
        <div className="actions">
          <ActionsButton action={edit} label={"Editar"} />
          <button
            className="delete-button"
            onClick={(e) => {
              e.preventDefault();
              confirmDeleteSection(section.id);
            }}
          >
            Excluir
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
      {/* modal de exclusão */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirmar Exclusão?"
        message="Ao confirmar você perderá todos os dados desta seção!"
        onConfirm={removeSection}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default SectionItem;
