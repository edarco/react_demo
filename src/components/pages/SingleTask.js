import React, { PureComponent } from 'react';
import { Container, Row, Col, Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faHistory } from '@fortawesome/free-solid-svg-icons';
import EditTaskModal from '../EditTaskModal';
import { formatDate } from '../../helpers/utils';
import { getTask, removeTask, changeTaskStatus } from '../../store/taskActions';
import { connect } from 'react-redux';

class SingleTask extends PureComponent {

    state = {
        isEdit: false
    };

    componentDidMount() {
        const taskId = this.props.match.params.id;
        this.props.getTask(taskId);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.removeTaskSuccess && this.props.removeTaskSuccess) {
            this.props.history.push('/');
        }

        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.toggleEditModal();
        }
    }


    handleRemove = () => {
        const taskId = this.props.task._id;
        this.props.removeTask(taskId, 'single');
    };

    toggleEditModal = () => {
        this.setState({
            isEdit: !this.state.isEdit
        });
    };


    render() {
        const { isEdit } = this.state;
        const { task, loading } = this.props;

        return (
            <Container>
                <Row>
                    <Col>
                        {
                            task ?
                                <Card className={task.status === 'active' ? 'text-center' : 'text-black-50 text-center'} border={task.status === 'active' ? 'info' : ''} >
                                    <Card.Body>
                                        <Card.Title as="h3" className="my-4">{task.title}</Card.Title>
                                        <Card.Text>
                                            Description: {task.description}
                                        </Card.Text>
                                        <Card.Text>
                                            Date: {formatDate(task.date)}
                                        </Card.Text>
                                        <Card.Text>
                                            Created at: {formatDate(task.created_at)}
                                        </Card.Text>
                                        <Card.Text>
                                            Status: {task.status}
                                        </Card.Text>
                                        {
                                            task.status === 'active' ?
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
                                                        onClick={() => this.props.changeTaskStatus(task._id, { status: 'done' }, 'single')}
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
                                                        onClick={() => this.props.changeTaskStatus(task._id, { status: 'active' }, 'single')}
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
                                            onCancel={this.toggleEditModal}
                                            from='single'
                                        />
                                    }
                                </Card>
                                :
                                <>
                                    {
                                        loading ||
                                        <Card className='text-center'>
                                            <Card.Body>
                                                <Card.Text>Task is not found!</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    }
                                </>
                        }
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.taskReducer.loading,
        task: state.taskReducer.task,
        removeTaskSuccess: state.taskReducer.removeTaskSuccess,
        editTaskSuccess: state.taskReducer.editTaskSuccess
    };
}

const mapDispatchToProps = {
    getTask,
    removeTask,
    changeTaskStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);