import React, { PureComponent } from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

class TaskModal extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            inputValue: props.value.text
        };

    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleSave();
        }
    };

    handleSave = () => {
        const { inputValue } = this.state;
        if (inputValue && inputValue.trim() !== '') {
            const taskId = this.props.value.id;
            this.props.onSave(taskId, this.state.inputValue);
        }
    };

    render() {
        const { onCancel } = this.props;

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
                        Edit task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        placeholder="Input task"
                        aria-label="Input task"
                        aria-describedby="basic-addon2"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleSave} variant='success'>Save</Button>
                    <Button onClick={onCancel} variant='secondary'>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

TaskModal.propTypes = {
    value: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default TaskModal;