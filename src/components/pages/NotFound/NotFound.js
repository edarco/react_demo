import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import testMobile from '../../../helpers/testMobile';
import { Link } from 'react-router-dom';
import styles from './notFoundStyle.module.css';

export default function NotFound() {

    const isMobile = testMobile();

    const bgClasses = [styles.thumbnail];

    if (isMobile) {
        bgClasses.push(styles.mobile);
    }

    return (
        <Container>
            <Row>
                <Col sm={12} className="text-center">
                    <div className={bgClasses.join(' ')}>
                        <h1 className="text-center">404</h1>
                    </div>
                    <div className={styles.content}>
                        <h3 className="h2">
                            It looks like you're lost
                        </h3>
                        <p>the page you are looking for is not avaible!</p>
                        <Link to="/"><Button>Go to Home</Button></Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
