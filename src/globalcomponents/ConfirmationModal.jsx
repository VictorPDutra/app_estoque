import ReactDOM from "react-dom";
import "./ConfirmationModal.css";

const ConfirmationModal = ({ title, message, onConfirm, onCancel, isOpen }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onCancel}>
            Cancelar
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") // Renderiza no nó "modal-root"
  );
};

export default ConfirmationModal;
