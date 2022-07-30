import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Waitlist = props => {

  function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }

  return (
    <>
      <h1 className='text-center mt-4'>Waitlist</h1>
        <div className='container'>
          <table className='table align-middle table-bordered text-center mt-5'>
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Barber</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map(waitlist => (
                <tr key={waitlist.postId} className="">
                  <td>{waitlist.name}</td>
                  <td>{formatPhoneNumber(waitlist.phoneNumber)}
                    <a href={`tel:${waitlist.phoneNumber}`}>
                      <i className="fa-solid fa-phone ps-2 fs-6 text-success"></i>
                    </a>
                  </td>
                  <td className="fw-italic">{waitlist.barberName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </>
  );
};

export default Waitlist;
