import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Navboi() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className="justify-content-center">
          <Navbar.Brand href="">
            <img
              alt=""
              src='https://static.wixstatic.com/media/5c555d_3b3a8e03cd1b45579a5c6d3e32d2ad90~mv2.png/v1/fill/w_68,h_66,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/GCBS-GOLD.png'
              width="68"
              height="65"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Navboi;
