import React from 'react';
import Form from './form';
import 'bootstrap/dist/css/bootstrap.css';

function ModalForm({ closeModal }) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-close-button">
          <i id="exit-btn" className="fa-solid fa-circle-xmark" onClick={() => closeModal(false)}></i>
        </div>
        <div className="body">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default ModalForm;
