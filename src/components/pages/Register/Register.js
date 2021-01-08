import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './registerStyle.module.css';
import logo from '../../../logo-mini.png';

function Register() {

    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        email: null,
        password: null,
        confirmPassword: null
    });

    const handleSubmit = (event) => {
        const { email, password, confirmPassword } = values;

        let confirmPasswordMessage = null;
        if (!confirmPassword) {
            confirmPasswordMessage = 'Please, confirm password';
        }
        else if (password !== confirmPassword) {
            confirmPasswordMessage = 'Passwords do not match';
        }

        setErrors({
            email: email ? null : 'Email is required',
            password: password ? null : 'Password is required',
            confirmPassword: confirmPasswordMessage
        });

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
                                    className={errors.email ? styles.invalid : ''}
                                    type="email"
                                    name="email"
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

export default Register;