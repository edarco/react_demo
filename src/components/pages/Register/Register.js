import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './registerStyle.module.css';
import logo from '../../../logo-mini.png';
import { register } from '../../../store/authActions';
import { connect } from 'react-redux';

function Register(props) {

    const nameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    const { registerSuccess, history } = props;
    useEffect(() => {
        if (registerSuccess) {
            history.push('/login');
        }
    }, [registerSuccess]);

    const [values, setValues] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        name: null,
        surname: null,
        email: null,
        password: null,
        confirmPassword: null
    });

    const handleSubmit = (event) => {
        const { name, surname, email, password, confirmPassword } = values;

        let nameMessage = null;
        if (!name) {
            nameMessage = 'Name is required';
        }

        let surnameMessage = null;
        if (!surname) {
            surnameMessage = 'Surname is required';
        }

        let emailMessage = null;
        if (!email) {
            emailMessage = 'Email is required';
        }
        else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            emailMessage = 'Please, enter valid email address';
        }

        let passwordMessage = null;
        if (!password) {
            passwordMessage = 'Password is required';
        }
        else if (password.length < 6) {
            passwordMessage = 'Password must contain at least 6 characters';
        }

        let confirmPasswordMessage = null;
        if (!confirmPassword) {
            confirmPasswordMessage = 'Please, confirm password';
        }
        else if (password !== confirmPassword) {
            confirmPasswordMessage = 'Passwords do not match';
        }

        setErrors({
            name: nameMessage,
            surname: surnameMessage,
            email: emailMessage,
            password: passwordMessage,
            confirmPassword: confirmPasswordMessage
        });

        if (nameMessage) {
            nameRef.current.focus();
        }
        else if (surnameMessage) {
            surnameRef.current.focus();
        }
        else if (emailMessage) {
            emailRef.current.focus();
        }
        else if (passwordMessage) {
            passwordRef.current.focus();
        }
        else if (confirmPasswordMessage) {
            confirmRef.current.focus();
        }
        else {
            props.register(values);
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
                        <Form>
                            <h3 className={styles.heading}>Register</h3>
                            <Form.Group>
                                <Form.Control
                                    className={errors.name ? styles.invalid : ''}
                                    type="text"
                                    name="name"
                                    ref={nameRef}
                                    placeholder="Enter your name"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                <Form.Text className="text-danger">
                                    {errors.name}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    className={errors.surname ? styles.invalid : ''}
                                    type="text"
                                    name="surname"
                                    ref={surnameRef}
                                    placeholder="Enter your surname"
                                    value={values.surname}
                                    onChange={handleChange}
                                />
                                <Form.Text className="text-danger">
                                    {errors.surname}
                                </Form.Text>
                            </Form.Group>
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
                            <Form.Group>
                                <Form.Control
                                    className={errors.confirmPassword ? styles.invalid : ''}
                                    type="password"
                                    name="confirmPassword"
                                    ref={confirmRef}
                                    placeholder="Confirm Password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                />
                                <Form.Text className="text-danger">
                                    {errors.confirmPassword}
                                </Form.Text>
                            </Form.Group>
                            <div className={styles.submitContainer}>
                                <Button
                                    variant="primary"
                                    onClick={handleSubmit}
                                >
                                    Register
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        registerSuccess: state.authReducer.registerSuccess
    };
};

const mapDispatchToProps = {
    register
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);