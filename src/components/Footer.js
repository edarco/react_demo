import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="bg-primary text-light text-center">
            <Container className="py-2">
                <Row>
                    <Col>
                        <span className="title">
                            TodoList - Organize your work & life!
                        </span>
                    </Col>
                </Row>
            </Container>
            <div className="bg-dark copyright">
                <Container className="py-0">
                    <Row>
                        <Col xs="10" sm="6" className="text-md-left small">
                            Copyright  &copy; {new Date().getFullYear()}. Created by <a href="http://edarco.net/"
                                target="_blank" rel="noopener noreferrer">edarco</a>
                        </Col>
                        <Col xs="2" sm="6" className="text-md-right">
                            <a href="https://www.linkedin.com/in/edgar-arzumanyan/" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
}

export default Footer;