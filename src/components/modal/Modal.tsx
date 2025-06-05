import "./Modal.css";
interface ModalProps {
  onClose: () => void;
  modalContent: React.ReactNode;
  modalHeader: string;
}

const Modal = ({ modalContent, modalHeader, onClose }: ModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <div> {modalHeader}</div>

          <button onClick={onClose}>X</button>
        </div>
        <div className="modal-content">{modalContent && modalContent}</div>
      </div>
    </div>
  );
};
export default Modal;
