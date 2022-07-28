import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Form = () => {

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [barberName, setBarberName] = useState('');

  const submitForm = async event => {
    event.preventDefault();
    try {
      const body = { name, phoneNumber, barberName };
      // eslint-disable-next-line
      const response = await fetch('http://localhost:3000/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      window.location = '/';
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h2 className='text-center'>Get in line!</h2>
      <form className='d-flex flex-column col-sm-4 offset-sm-4'>
        <label>Name
          <input type="text" className='form-control' value={name}
            onChange={event => setName(event.target.value)} />
        </label>
        <label>Number
          <input type="text" className='form-control' value={phoneNumber}
            onChange={event => setPhoneNumber(event.target.value)} />
        </label>
        <label>Barber Name or Any
          <input type="text" className='form-control' value={barberName}
            onChange={event => setBarberName(event.target.value)} />
        </label>
        <button type="button" className="btn btn-primary mt-3" onClick={submitForm}>Join Waitlist</button>
      </form>
    </>
  );
};

export default Form;
