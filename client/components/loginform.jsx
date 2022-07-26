import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const LoginForm = props => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitLoginForm = async event => {
    event.preventDefault();
    try {
      const body = { username, password };
      const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const barber = await response.json();
      props.onSubmit(barber);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <form className='d-flex flex-column col-sm-4 offset-sm-4'>
        <label>Username
          <input type="text" className='form-control' value={username}
            onChange={event => setUsername(event.target.value)} required />
        </label>
        <label>Password
          <input type="password" className='form-control' value={password}
            onChange={event => setPassword(event.target.value)} required />
        </label>
        <button type="button" className="btn btn-primary mt-3" onClick={submitLoginForm}>Log In</button>
      </form>
    </>
  );
};

export default LoginForm;
