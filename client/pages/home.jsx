import React, { useState, useEffect } from 'react';
import Form from '../components/form';
import Waitlist from '../components/waitlist';
import Modal from 'react-bootstrap/Modal';
import Navboi from '../components/navbar';
import Button from 'react-bootstrap/Button';
import LoginForm from '../components/loginform';

export default function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [waitlist, setWaitlist] = useState([]);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const closeLoginModal = () => setShowLoginModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);

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

  const toggleCompleted = async (postId, isCompleted) => {
    try {
      await fetch(`/api/waitlist/${postId}`, {
        body: JSON.stringify({ isCompleted }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PATCH'
      });
      await getWaitlist();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteClient = async postId => {
    try {
      await fetch(`/api/waitlist/${postId}`, {
        body: JSON.stringify({ postId }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      });
      await getWaitlist();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navboi joinWaitlist={handleShow} barberLoginModal={handleShowLoginModal}/>
      <Waitlist data={waitlist} toggleCompleted={toggleCompleted} deleteClient={deleteClient}/>
      <div className="add-button">
        <Button className='mt-3 mb-5' size='lg' variant='success' onClick={handleShow}>
          Join Waitlist
        </Button>
      </div>

      <Modal className="mt-5" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Get in line!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addToWaitlist} />
        </Modal.Body>
      </Modal>

      <Modal className="mt-5" show={showLoginModal} onHide={closeLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title >Barber Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm onSubmit={null}/>
        </Modal.Body>
      </Modal>
    </>
  );
}
