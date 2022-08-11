import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const Waitlist = props => {
  const { deleteClient, toggleCompleted, data } = props;
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
      <h1 className='fw-bold text-center mt-4'>Waitlist</h1>
        <div className='container'>
          <table className='table align-middle table-bordered text-center mt-5'>
              <thead className="table-dark">
                <tr>
                <th><i className='fa-solid fa-trash'></i></th>
                <th><i className="fa-solid fa-person"></i></th>
                <th><i className="fa-solid fa-mobile-screen-button"></i></th>
                <th><i className="fa-solid fa-scissors"></i></th>
                <th><i className="fa-solid fa-circle-check"></i></th>
                </tr>
              </thead>
              <tbody>
              {data.map(({ isCompleted, name, phoneNumber, barberName, postId, barberId }) => (
                <tr className={isCompleted ? 'is-completed' : ''} key={postId}>
                  <td>
                    <Button size='sm' variant={isCompleted ? 'danger' : 'secondary'} onClick={isCompleted ? () => deleteClient(postId) : null}>
                      <i className='fa-solid fa-trash'></i>
                    </Button>
                  </td>
                  <td className='proper-name'>{name}</td>
                  <td className='phone-number'>{formatPhoneNumber(phoneNumber)}
                    <a href={`tel:${phoneNumber}`}>
                      <i className={isCompleted ? 'fa-solid fa-phone ps-2 fs-6 text-secondary' : 'fa-solid fa-phone ps-2 fs-6 text-success'}></i>
                    </a>
                  </td>
                  <td className={barberName.toUpperCase() === 'ANY' || barberName.toUpperCase() === 'ANY ' ? 'any-barber' : 'proper-name'}>{barberName}</td>
                  <td>
                    <Button size="sm" variant={isCompleted ? 'warning' : 'success'} onClick={() => toggleCompleted(postId, !isCompleted)}>
                      <i className={isCompleted ? 'fa-solid fa-arrow-rotate-left' : 'fa-solid fa-circle-check'}></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </>
  );
};

export default Waitlist;
