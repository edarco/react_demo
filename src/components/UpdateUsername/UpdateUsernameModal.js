import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import styles from './updateUsernameModalStyle.module.css';
import { updateUserInfo } from '../../store/authActions';
import { connect } from 'react-redux';

function UpdateUsernameModal({ user, updateUserInfo, onCancel }) {

    const nameRef = useRef();
    const surnameRef = useRef();

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    const [values, setValues] = useState({
        name: user.name,
        surname: user.surname
    });

    const [errors, setErrors] = useState({
        name: null,
        surname: null
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const { name, surname } = values;

        let nameMessage = null;
        if (!name) {
            nameMessage = 'Name is required';
        }

        let surnameMessage = null;
        if (!surname) {
            surnameMessage = 'Surname is required';
        }

        setErrors({
            name: nameMessage,
            surname: surnameMessage
        });

        if (nameMessage) {
            nameRef.current.focus();
        }
        else if (surnameMessage) {
            surnameRef.current.focus();
        }
        else {
            updateUserInfo(values);
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
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={true}
            onHide={onCancel}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit User Info
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        type="submit"
                    >
                        Update
                    </Button>
                    <Button
                        onClick={onCancel}
                        variant='secondary'
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}


const mapStateToProps = (state) => {
    return {
        user: state.authReducer.userInfo
    };
};

const mapDispatchToProps = {
    updateUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUsernameModal);