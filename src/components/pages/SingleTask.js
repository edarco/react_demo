import React, { PureComponent } from 'react';
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditTaskModal from '../EditTaskModal';
import { formatDate } from '../../helpers/utils';
import { getTask, removeTask } from '../../store/actions';
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
            <>
                {
                    task ?
                        <Card border="light">
                            <Card.Body>
                                <Card.Title as="h3">{task.title}</Card.Title>
                                <Card.Text>
                                    Description: {task.description}
                                </Card.Text>
                                <Card.Text>
                                    Date: {formatDate(task.date)}
                                </Card.Text>
                                <Card.Text>
                                    Created: {formatDate(task.created_at)}
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
                                    onCancel={this.toggleEditModal}
                                    from='single'
                                />
                            }
                        </Card>
                        :
                        <>
                            {
                                loading || <div>Task is not found!</div>
                            }
                        </>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        task: state.task,
        removeTaskSuccess: state.removeTaskSuccess,
        editTaskSuccess: state.editTaskSuccess
    };
}

const mapDispatchToProps = {
    getTask,
    removeTask
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);