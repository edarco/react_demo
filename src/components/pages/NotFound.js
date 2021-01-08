import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function NotFound() {
    return (
        <Container>
            <Row>
                <Col>
                    <Card className='text-center'>
                        <Card.Body>
                            <Card.Text>Page not found!</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}