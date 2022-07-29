import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Waitlist = props => {

  return (
    <div className='container'>
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
          {props.data.map(waitlist => (
            <tr key={waitlist.postId}>
              <td>{waitlist.name}</td>
              <td>
                {waitlist.phoneNumber}
              </td>
              <td>{waitlist.barberName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Waitlist;
