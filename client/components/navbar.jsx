import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

function Navboi(props) {

  const { joinWaitlist, barberLoginModal } = props;

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className="d-flex justify-content-space-between">
          <Nav.Link href="">
            <Button size="sm" variant='outline-warning' onClick={barberLoginModal}>Barber Login</Button>
          </Nav.Link>
          <Navbar.Brand href="">
            <img
              alt="gc-logo"
              src='https://static.wixstatic.com/media/5c555d_3b3a8e03cd1b45579a5c6d3e32d2ad90~mv2.png/v1/fill/w_68,h_66,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/GCBS-GOLD.png'
              width="68"
              height="65"
              className="ms-4"
            />{' '}
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="">
              <Button size="sm" variant='success' onClick={joinWaitlist}>Join Waitlist</Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navboi;
