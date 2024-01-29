import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-60 absolute inset-0"></div>
          <div className="bg-white p-6 rounded-md z-10">
            <p className="text-lg text-slate-700 font-semibold mb-4">{message}</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={onConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
