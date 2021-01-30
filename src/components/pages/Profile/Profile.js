import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faKey } from '@fortawesome/free-solid-svg-icons';
import styles from './profileStyle.module.css';
import UpdateUsernameModal from '../../UpdateUsername/UpdateUsernameModal';
import ChangePasswordModal from '../../ChangePassword/ChangePasswordModal';
import { connect } from 'react-redux';

function Profile({ updateUsernameSuccess, changePasswordSuccess, user }) {

    const [updateUsername, setUpdateUsername] = useState(false);

    const [changePassword, setChangePassword] = useState(false);

    const toggleUpdateUsernameModal = () => {
        setUpdateUsername(!updateUsername);
    };

    const toggleChangePasswordModal = () => {
        setChangePassword(!changePassword);
    };

    useEffect(() => {
        if (updateUsernameSuccess) {
            setUpdateUsername(false);
        }
    }, [updateUsernameSuccess, setUpdateUsername]);

    useEffect(() => {
        if (changePasswordSuccess) {
            setChangePassword(false);
        }
    }, [changePasswordSuccess, setChangePassword]);

    return (
        <>
            { user &&
                <Container>
                    <Row className="text-center">
                        <Col>
                            <h1 className={styles.heading}>Manage your profile</h1>
                            <h3 className={styles.userHeading}>{user.name} {user.surname}</h3>
                            <Button
                                className='m-1'
                                variant="info"
                                onClick={toggleUpdateUsernameModal}
                            >
                                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                    Edit your name
                                </Button>
                            <Button
                                className='m-1'
                                variant="danger"
                                onClick={toggleChangePasswordModal}
                            >
                                <FontAwesomeIcon icon={faKey} className="mr-2" />
                                    Change password
                                </Button>
                            {
                                updateUsername &&
                                <UpdateUsernameModal
                                    onCancel={toggleUpdateUsernameModal}
                                />
                            }
                            {
                                changePassword &&
                                <ChangePasswordModal
                                    onCancel={toggleChangePasswordModal}
                                />
                            }                            
                        </Col>
                    </Row>
                </Container>
            }
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.userInfo,
        updateUsernameSuccess: state.authReducer.updateUsernameSuccess,
        changePasswordSuccess: state.authReducer.changePasswordSuccess
    };
};

export default connect(mapStateToProps)(Profile);