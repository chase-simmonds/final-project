import React, { useState } from 'react';
// import Home from './pages/home';
// import Form from './components/form';
import Waitlist from './components/waitlist';
import ModalForm from './components/modal-form';

export default function App() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {openModal && <ModalForm closeModal={setOpenModal} />}
      <Waitlist />
      <div className="add-button">
        <i id="add-btn" className="fa-solid fa-circle-plus" onClick={() => {
          setOpenModal(true);
        }}></i>
      </div>
    </>
  );
}

/* export default class App extends React.Component {
  render() {
    return (
      <>
        <div className="container">
          <Form />
          <Waitlist />
          <div className="add-button">
            <i id="add-btn" className="fa-solid fa-circle-plus" size="5x"></i>
          </div>
          <ModalForm />
        </div>
      </>
    );
  }
} */
