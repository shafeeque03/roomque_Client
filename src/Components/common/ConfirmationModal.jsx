import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <p>{message}</p>
            <div className="modal-buttons">
              <button onClick={onConfirm}>Confirm</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
