import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './contactStyle.module.css';
import { sendMessage } from '../../../store/taskActions';
import { connect } from 'react-redux';

function Contact({ sendMessage, sendMessageSuccess }) {

    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    const [values, setValues] = useState({
        name: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        if (sendMessageSuccess) {
            setValues({
                name: '',
                email: '',
                message: ''
            });
        }
    }, [sendMessageSuccess]);

    const [errors, setErrors] = useState({
        name: null,
        email: null,
        message: null
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const { name, email, message } = values;

        let nameMessage = null;
        if (!name) {
            nameMessage = 'Name is required';
        }

        let emailMessage = null;
        if (!email) {
            emailMessage = 'Email is required';
        }

        let msgMessage = null;
        if (!message) {
            msgMessage = 'Message cannot be empty';
        }

        setErrors({
            name: nameMessage,
            email: emailMessage,
            message: msgMessage
        });

        if (nameMessage) {
            nameRef.current.focus();
        }
        else if (emailMessage) {
            emailRef.current.focus();
        }
        else if (msgMessage) {
            messageRef.current.focus();
        }
        else {
            sendMessage(values);
        }

    };

    const handleChange = ({ target: { name, value } }) => {
        setValues({
            ...values,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: null
        });
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6}>
                    <Form onSubmit={handleSubmit}>
                        <h1 className={styles.heading}>Contact us</h1>
                        <Form.Group>
                            <Form.Label>Your name</Form.Label>
                            <Form.Control
                                className={errors.name ? styles.invalid : ''}
                                type="text"
                                name="name"
                                ref={nameRef}
                                value={values.name}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-danger">
                                {errors.name}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Your Email</Form.Label>
                            <Form.Control
                                className={errors.email ? styles.invalid : ''}
                                type="email"
                                name="email"
                                ref={emailRef}
                                value={values.email}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-danger">
                                {errors.email}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Your message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                className={errors.message ? styles.invalid : ''}
                                name="message"
                                ref={messageRef}
                                value={values.message}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-danger">
                                {errors.message}
                            </Form.Text>
                        </Form.Group>
                        <div className={styles.submitContainer}>
                            <Button
                                variant="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        sendMessageSuccess: state.taskReducer.sendMessageSuccess
    };
};

const mapDispatchToProps = {
    sendMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);













