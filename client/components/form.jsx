import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Form = props => {

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [barberName, setBarberName] = useState('');

  const submitForm = async event => {
    event.preventDefault();
    try {
      const body = { name, phoneNumber, barberName };
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const customer = await response.json();
      props.onSubmit(customer);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <form className='d-flex flex-column col-sm-4 offset-sm-4'>
        <label>Name
          <input type="text" className='form-control' value={name}
            onChange={event => setName(event.target.value)} required/>
        </label>
        <label>Number
          <input type="text" className='form-control' value={phoneNumber}
            onChange={event => setPhoneNumber(event.target.value)} required/>
        </label>
        <label>Barber Name or Any
          <input type="text" className='form-control' value={barberName}
            onChange={event => setBarberName(event.target.value)} required/>
        </label>
        <button type="button" className="btn btn-primary mt-3" onClick={submitForm}>Join Waitlist</button>
      </form>
    </>
  );
};

export default Form;
