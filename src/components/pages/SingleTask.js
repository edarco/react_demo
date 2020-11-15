import React, { PureComponent } from 'react';
import Spinner from '../Spinner/Spinner';
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditTaskModal from '../EditTaskModal';

class SingleTask extends PureComponent {

    state = {
        task: null,
        isEdit: false
    };

    componentDidMount() {

        const taskId = this.props.match.params.id;

        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then((response) => response.json())
            .then((task) => {

                if (task.error) {
                    throw task.error;
                }

                this.setState({
                    task
                });

            })
            .catch((err) => {
                // console.log('err', err);
                this.props.history.push('/not-found');
            });
    }


    handleRemove = () => {

        const taskId = this.state.task._id;

        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {

                if (data.error) {
                    throw data.error;
                }
                this.props.history.push('/');
            })
            .catch((err) => {
                console.log('err', err);
            });
    };

    toggleEditModal = () => {
        this.setState({
            isEdit: !this.state.isEdit
        });


    };


    handleSave = (taskId, data) => {

        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then((response) => response.json())
            .then((editedTask) => {

                if (editedTask.error) {
                    throw editedTask.error;
                }

                this.setState({
                    task: editedTask,
                    isEdit: false
                });

            })
            .catch((err) => {
                console.log('err', err);
            });

    };

    render() {
        const { task, isEdit } = this.state;

        return (
            <>
                {
                    task ?
                        <Card className='card'>
                            <Card.Body>
                                <Card.Title>{task.title}</Card.Title>
                                <Card.Text>
                                    Description: {task.description}
                                </Card.Text>
                                <Card.Text>
                                    Date: {task.date ? task.date.slice(0, 10) : 'none'}
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
                                        onClick={this.toggleEditModal}
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
                                        onClick={this.handleRemove}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </OverlayTrigger>
                            </Card.Body>
                            {
                                isEdit &&
                                <EditTaskModal
                                    data={task}
                                    onSave={this.handleSave}
                                    onCancel={this.toggleEditModal}
                                />
                            }
                        </Card>
                        :
                        <Spinner />
                }
            </>
        );
    }
}

export default SingleTask;