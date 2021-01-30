import React, { PureComponent } from 'react';
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faHistory } from '@fortawesome/free-solid-svg-icons';
import styles from './task.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeTask, changeTaskStatus } from '../../store/taskActions';
import { formatDate, shortStr } from '../../helpers/utils';
import PropTypes from 'prop-types';

class Task extends PureComponent {

    state = {
        checked: false
    };

    toggleCheckbox = () => {
        this.setState({
            checked: !this.state.checked
        });

        this.props.onCheck();
    };

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    };

    render() {
        const { data, removeTask, onEdit, disabled } = this.props;
        const { checked } = this.state;

        const cardClasses = ['card w-100', styles.task, 'text-center'];
        if (checked) {
            cardClasses.push(styles.checked);
        }
        if (data.status === 'active') {
            cardClasses.push(styles.active);
        }
        else {
            cardClasses.push(styles.done);
        }

        return (
            <Card
                className={cardClasses.join(' ')}
            >
                <input
                    type='checkbox'
                    className={styles.checkbox}
                    onClick={this.toggleCheckbox}
                />
                <Card.Body className={styles.cardBody}>
                    {
                        disabled
                            ?
                            <Card.Title>{data.title}</Card.Title>
                            :
                            <Link to={`/task/${data._id}`}>
                                <Card.Title className={styles.title}>{data.title}</Card.Title>
                            </Link>
                    }
                    <Card.Text>
                        {shortStr(data.description, 56)}
                    </Card.Text>
                    <Card.Text>
                        Date: {formatDate(data.date)}
                    </Card.Text>
                    <Card.Text>
                        Created at: {formatDate(data.created_at)}
                    </Card.Text>
                    <Card.Text>
                        Status: {data.status}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <div className={styles.buttonsGroup}>
                        {
                            data.status === 'active' ?
                                < OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip>
                                            <strong>Mark as done</strong>
                                        </Tooltip>
                                    }
                                >
                                    <Button
                                        className='m-1'
                                        variant="success"
                                        onClick={() => this.props.changeTaskStatus(data._id, { status: 'done' })}
                                        disabled={disabled}
                                    >
                                        <FontAwesomeIcon icon={faCheck} />
                                    </Button>
                                </OverlayTrigger>
                                :
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip>
                                            <strong>Mark as active</strong>
                                        </Tooltip>
                                    }
                                >
                                    <Button
                                        className='m-1'
                                        variant="warning"
                                        onClick={() => this.props.changeTaskStatus(data._id, { status: 'active' })}
                                        disabled={disabled}
                                    >
                                        <FontAwesomeIcon icon={faHistory} />
                                    </Button>
                                </OverlayTrigger>
                        }
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    <strong>Edit</strong>
                                </Tooltip>
                            }
                        >
                            <Button
                                className='m-1'
                                variant="info"
                                onClick={onEdit}
                                disabled={disabled}
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    <strong>Remove</strong>
                                </Tooltip>
                            }
                        >
                            <Button
                                className='m-1'
                                variant="danger"
                                onClick={() => removeTask(data._id)}
                                disabled={disabled}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </OverlayTrigger>
                    </div></Card.Footer>
            </Card >
        );
    }
}

Task.propTypes = {
    data: PropTypes.object.isRequired,
    onCheck: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

const mapDispatchToProps = {
    removeTask,
    changeTaskStatus
}

export default connect(null, mapDispatchToProps)(Task);