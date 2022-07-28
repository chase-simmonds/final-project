import React, { useState } from 'react';
// import Home from './pages/home';
import Form from './components/form';
import Waitlist from './components/waitlist';
//  import ModalForm from './components/modal-form';
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

export default function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Waitlist />
      <div className="add-button">
        <i id="add-btn" className="fa-solid fa-circle-plus" onClick={handleShow}>
        </i>
      </div>

      <Modal className="mt-5" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Get in Line!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form />
        </Modal.Body>
      </Modal>
    </>
  );
}

/* <Button variant="success" onClick={handleShow}>
            Join Waitlist
        </Button>

{openModal && <ModalForm closeModal={setOpenModal} />}
      <Waitlist />
      <div className="add-button">
        <i id="add-btn" className="fa-solid fa-circle-plus" onClick={() => {
          setOpenModal(true);
        }}></i>
      </div> */
