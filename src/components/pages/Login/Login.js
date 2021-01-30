import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './loginStyle.module.css';
import logo from '../../../logo-mini.png';
import { login } from '../../../store/authActions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Login(props) {

    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: null,
        password: null
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const { email, password } = values;

        let emailMessage = null;
        if (!email) {
            emailMessage = 'Email is required';
        }

        let passwordMessage = null;
        if (!password) {
            passwordMessage = 'Password is required';
        }

        setErrors({
            email: emailMessage,
            password: passwordMessage
        });

        if (emailMessage) {
            emailRef.current.focus();
        }
        else if (passwordMessage) {
            passwordRef.current.focus();
        }
        else {
            props.login(values);
        }

    };

    const handleChange = ({ target: { name, value } }) => {
        setValues({
            ...values,
            [name]: value.replace(/ /g, '')
        });

        setErrors({
            ...errors,
            [name]: null
        });
    };

    return (
        <div className={styles.main}>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6}>
                        <div className={styles.logo}>
                            <img src={logo} width="100" height="100" alt="Logo" />
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <h3 className={styles.heading}>Login</h3>
                            <Form.Group>
                                <Form.Control
                                    className={errors.email ? styles.invalid : ''}
                                    type="email"
                                    name="email"
                                    ref={emailRef}
                                    placeholder="Enter email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <Form.Text className="text-danger">
                                    {errors.email}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    className={errors.password ? styles.invalid : ''}
                                    type="password"
                                    name="password"
                                    ref={passwordRef}
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <Form.Text className="text-danger">
                                    {errors.password}
                                </Form.Text>
                            </Form.Group>
                            <div className={styles.submitContainer}>
                                <Button
                                    variant="primary"
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </div>
                            <div className="text-center mt-5">
                                <Link to="/register">Don't have account yet? Register now!</Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

const mapDispatchToProps = {
    login
};

export default connect(null, mapDispatchToProps)(Login);