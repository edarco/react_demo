import React, { PureComponent } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import NewTask from '../NewTask/NewTask';
import Task from '../Task/Task';
import Confirm from '../Confirm';
import EditTaskModal from '../EditTaskModal';
import Search from '../Search/Search';
import { connect } from 'react-redux';
import { getTasks, removeTasks } from '../../store/taskActions';

class ToDo extends PureComponent {
    state = {
        checkedTasks: new Set(),
        showConfirm: false,
        editTask: null,
        openNewTaskModal: false
    };

    componentDidMount() {
        this.props.getTasks();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
            this.setState({
                openNewTaskModal: false
            });
        }

        if (!prevProps.removeTasksSuccess && this.props.removeTasksSuccess) {
            this.setState({
                showConfirm: false,
                checkedTasks: new Set()
            });
        }

        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.setState({
                editTask: null
            });
        }
    }

    handleCheck = (taskId) => () => {
        const checkedTasks = new Set(this.state.checkedTasks);
        if (checkedTasks.has(taskId)) {
            checkedTasks.delete(taskId)
        }
        else {
            checkedTasks.add(taskId);
        }
        this.setState({ checkedTasks });

    };

    handleEdit = (task) => () => {
        this.setState({ editTask: task });

    };

    onRemoveSelected = () => {
        const checkedTasks = [...this.state.checkedTasks];
        this.props.removeTasks({
            tasks: checkedTasks
        });
    };

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };

    toggleNewTaskModal = () => {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        })
    };

    render() {
        const { checkedTasks, showConfirm, editTask, openNewTaskModal } = this.state;
        const { tasks, loading } = this.props;

        const tasksComponents = tasks.map((task) =>
            <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={3} className="d-flex">
                <Task
                    data={task}
                    onCheck={this.handleCheck(task._id)}
                    onEdit={this.handleEdit(task)}
                    disabled={!!checkedTasks.size}
                />
            </Col>
        );

        return (
            <Container>
                <Row>
                    <Search />
                    <Col md={{ span: 6, offset: 3 }} className="text-center">
                        <Button
                            variant="primary"
                            className='m-3 my-4'
                            disabled={checkedTasks.size}
                            onClick={this.toggleNewTaskModal}
                        >
                            Add new task
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {tasks.length ? tasksComponents : loading || 'Tasks not found!'}
                </Row>
                <Row className='justify-content-center mb-3'>
                    <Button
                        variant="danger"
                        hidden={!checkedTasks.size}
                        onClick={this.toggleConfirm}
                    >
                        Remove selected
                                </Button>
                </Row>
                {showConfirm &&
                    <Confirm
                        count={checkedTasks.size}
                        onSubmit={this.onRemoveSelected}
                        onCancel={this.toggleConfirm}
                    />
                }
                {!!editTask &&
                    <EditTaskModal
                        data={editTask}
                        onSave={this.handleSave}
                        onCancel={this.handleEdit(null)}
                    />
                }
                {openNewTaskModal &&
                    <NewTask
                        onCancel={this.toggleNewTaskModal}
                    />
                }
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.taskReducer.loading,
        tasks: state.taskReducer.tasks,
        addTaskSuccess: state.taskReducer.addTaskSuccess,
        removeTasksSuccess: state.taskReducer.removeTasksSuccess,
        editTaskSuccess: state.taskReducer.editTaskSuccess
    };
};

const mapDispatchToProps = {
    getTasks,
    removeTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);