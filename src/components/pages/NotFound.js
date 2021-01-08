import React from 'react';
import { Card } from 'react-bootstrap';

export default function NotFound() {
    return (
        <Card className='text-center'>
            <Card.Body>
                <Card.Text>Page not found!</Card.Text>
            </Card.Body>
        </Card>
    );
}