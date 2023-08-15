import React from "react";

const DeleteConfirmationPopup = ({ onCancel, onConfirm }) => {
  return (
    <div className="delete-popup-container">
      <div className="delete-popup">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this product?</p>
        <div className="delete-buttons">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-btn" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopup;