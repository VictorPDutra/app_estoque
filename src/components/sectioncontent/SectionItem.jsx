//SectionItem.jsx

import "./SectionItem.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHandleDocuments } from "../../hooks/useHandleDocuments";
import ConfirmationModal from "../../globalcomponents/ConfirmationModal";
import ActionsButton from "../buttons/actionsbutton/ActionsButton";

const SectionItem = ({ section, stockId, setSections }) => {
  const { deleteDocument, updateDocument } = useHandleDocuments();
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [updatedSection, setUpdatedSection] = useState(section.name);
  const [editing, setEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update Section
  const edit = () => {
    setEditing(!editing);
  };

  const updateSection = async () => {
    if (!updatedSection.trim()) return;

    await updateDocument("estoques", section.id, stockId, {
      name: updatedSection,
    });

    setSections((prevSections) =>
      prevSections.map((prev) =>
        prev.id === section.id ? { ...prev, name: updatedSection } : prev
      )
    );

    setEditing(false);
  };

  // Delete Section
  // Modal - Open delete
  const modalDelete = () => {
    console.log(section.id);
    setSectionToDelete(section.id);
    setIsModalOpen(true);
  };

  // Modal - Cancel delete
  const cancelDelete = () => {
    setIsModalOpen(false);
    setSectionToDelete(null);
  };

  // Confirm delete
  const handleDeleteSection = async () => {
    if (!sectionToDelete) return;

    await deleteDocument("estoques", sectionToDelete, stockId);

    setSections((prevSections) =>
      prevSections.filter((section) => section.id !== sectionToDelete)
    );

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
          <ActionsButton action={modalDelete} label={"Excluir"} />
        </div>
      </div>

      {/* Formulário para editar nome da seção */}
      {editing && (
        <div className="form">
          <input
            type="text"
            value={updatedSection}
            onChange={(e) => setUpdatedSection(e.target.value)}
          />
          <button onClick={updateSection}>Salvar</button>
        </div>
      )}
      {/* Modal de exclusão */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirmar Exclusão?"
        message="Ao confirmar você perderá todos os dados desta seção!"
        onConfirm={handleDeleteSection}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default SectionItem;
