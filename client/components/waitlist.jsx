import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//
const Waitlist = () => {

  const [waitlist, setWaitlist] = useState([]);

  const getWaitlist = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/waitlist');
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
    <div className='waitlist'>
      <h1 className='text-center'>Waitlist</h1>
      <table className='table mt-5 text-center'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Barber</th>
          </tr>
        </thead>
        <tbody>
          {waitlist.map(waitlist => (
            <tr key={waitlist.postId}>
              <td>{waitlist.name}</td>
              <td>{waitlist.phoneNumber}</td>
              <td>{waitlist.barberName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Waitlist;
