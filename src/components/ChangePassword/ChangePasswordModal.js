import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import styles from './changePasswordModalStyle.module.css';
import { changePassword } from '../../store/authActions';
import { connect } from 'react-redux';

function ChangePasswordModal({ changePassword, onCancel }) {

    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmNewPasswordRef = useRef();

    useEffect(() => {
        oldPasswordRef.current.focus();
    }, []);

    const [values, setValues] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const [errors, setErrors] = useState({
        oldPassword: null,
        newPassword: null,
        confirmNewPassword: null
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const { oldPassword, newPassword, confirmNewPassword } = values;

        let oldPasswordMessage = null;
        if (!oldPassword) {
            oldPasswordMessage = 'Current password is required';
        }

        let newPasswordMessage = null;
        if (!newPassword) {
            newPasswordMessage = 'New password is required';
        }
        else if (newPassword.length < 6) {
            newPasswordMessage = 'Password must contain at least 6 characters';
        }

        let confirmNewPasswordMessage = null;
        if (!confirmNewPassword) {
            confirmNewPasswordMessage = 'Please, confirm new password';
        }
        else if (newPassword !== confirmNewPassword) {
            confirmNewPasswordMessage = 'New passwords do not match';
        }

        setErrors({
            oldPassword: oldPasswordMessage,
            newPassword: newPasswordMessage,
            confirmNewPassword: confirmNewPasswordMessage
        });

        if (oldPasswordMessage) {
            oldPasswordRef.current.focus();
        }
        else if (newPasswordMessage) {
            newPasswordRef.current.focus();
        }
        else if (confirmNewPasswordMessage) {
            confirmNewPasswordRef.current.focus();
        }
        else {
            changePassword(values);
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
                    Change Password
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            className={errors.oldPassword ? styles.invalid : ''}
                            type="password"
                            name="oldPassword"
                            ref={oldPasswordRef}
                            placeholder="Enter current password"
                            value={values.oldPassword}
                            onChange={handleChange}
                        />
                        <Form.Text className="text-danger">
                            {errors.oldPassword}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            className={errors.newPassword ? styles.invalid : ''}
                            type="password"
                            name="newPassword"
                            ref={newPasswordRef}
                            placeholder="Enter new password"
                            value={values.newPassword}
                            onChange={handleChange}
                        />
                        <Form.Text className="text-danger">
                            {errors.newPassword}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            className={errors.confirmNewPassword ? styles.invalid : ''}
                            type="password"
                            name="confirmNewPassword"
                            ref={confirmNewPasswordRef}
                            placeholder="Confirm new password"
                            value={values.confirmNewPassword}
                            onChange={handleChange}
                        />
                        <Form.Text className="text-danger">
                            {errors.confirmNewPassword}
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

const mapDispatchToProps = {
    changePassword
};

export default connect(null, mapDispatchToProps)(ChangePasswordModal);