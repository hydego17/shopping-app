import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="justify-content-between py-4">
          <Col>Copyright &copy; Laura Chouette</Col>

          <small>
            made by{" "}
            <a
              rel="noopener noreferrer"
              href="https://hydego17.github.io/"
              target="_blank"
            >
              Umma Ahimsha
            </a>
          </small>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
