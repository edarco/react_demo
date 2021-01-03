import React, { PureComponent } from 'react';
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './task.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
        const { data, onRemove, onEdit, disabled } = this.props;
        const { checked } = this.state;

        const cardClasses = ['card', styles.task];
        if (checked) {
            cardClasses.push(styles.checked);
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
                <Card.Body>
                    {
                        disabled
                            ?
                            <Card.Title>{data.title}</Card.Title>
                            :
                            <Link to={`/task/${data._id}`}>
                                <Card.Title>{data.title}</Card.Title>
                            </Link>
                    }
                    <Card.Text>
                        Description: {data.description}
                    </Card.Text>
                    <Card.Text>
                        Date: {data.date ? data.date.slice(0, 10) : 'none'}
                    </Card.Text>

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
                            onClick={onRemove(data._id)}
                            disabled={disabled}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </OverlayTrigger>

                </Card.Body>
            </Card>
        );
    }
}

Task.propTypes = {
    data: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    onCheck: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};

export default Task;