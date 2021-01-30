import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function About() {
    return (
        <Container>
            <Row className="justify-content-center text-justify">
                <Col xs={12} sm={8} md={6}>
                    <h1 className="mt-4 text-center">TodoList</h1>
                    <h4 className="mb-4 text-center">Created to help you organize your work and life</h4>
                    <p>Whether you’re a student or a professional, it can be tricky to stay on top of all the things you have to do.</p>
                    <p>If you let all this information swirl around in your head, you’ll end up stressed and frantic.</p>
                    <p>There is a solution, however: use our TodoList app.</p>
                    <p>When you take your to-do list out of your head and into the right app, you’ll free up your brain to spend more time on important tasks and less time on trying to remember that one thing you were supposed to do.</p>
                    <p>
                        <span className="mr-2">
                            Created by <a href="http://edarco.net/" target="_blank" rel="noopener noreferrer">edarco</a>
                        </span>
                        <span>
                            <a href="https://www.linkedin.com/in/edgar-arzumanyan/" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLinkedin} size="lg" />
                            </a>
                        </span>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}