import React, { useState, useEffect } from 'react';
import Form from '../components/form';
import Waitlist from '../components/waitlist';
import Modal from 'react-bootstrap/Modal';

export default function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [waitlist, setWaitlist] = useState([]);

  function addToWaitlist(customer) {
    const newWaitlist = waitlist.concat(customer);
    setWaitlist(newWaitlist);
    handleClose();
  }

  const getWaitlist = async () => {
    try {
      const response = await fetch('/api/waitlist');
      const waitlistData = await response.json();

      setWaitlist(waitlistData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getWaitlist();
  }, []);

  return (
    <>
      <Waitlist data={waitlist} />
      <div className="add-button">
        <i id="add-btn" className="fa-solid fa-circle-plus" onClick={handleShow}>
        </i>
      </div>

      <Modal className="mt-5" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Get in Line!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addToWaitlist} />
        </Modal.Body>
      </Modal>
    </>
  );
}
