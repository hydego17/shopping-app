import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container className="d-flex justify-content-between py-5">
        <small>Copyright &copy; Laura Chouette</small>

        <small>
          <em>
            made by{" "}
            <a
              rel="noopener noreferrer"
              href="https://hydego.me"
              target="_blank"
            >
              Umma Ahimsha
            </a>
          </em>
        </small>
      </Container>
    </footer>
  );
};

export default Footer;
