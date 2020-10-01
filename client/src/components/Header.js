import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Laura Chouette</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/cart">
                <i className="las la-cart-arrow-down"></i>Cart
              </Nav.Link>
              <Nav.Link href="/login">
                <i className="lar la-user"></i>Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
