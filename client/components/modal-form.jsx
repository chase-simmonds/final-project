import React, { useState } from 'react';
import Form from './form';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ModalForm({ closeModal }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalForm;

/* <div className="modal-background">
      <div className="modal-container">
        <div className="modal-close-button">
          <i id="exit-btn" className="fa-solid fa-circle-xmark" onClick={() => closeModal(false)} ></i>
        </div>
        <div className="body">
          <Form />
        </div>
      </div>
    </div>  */
