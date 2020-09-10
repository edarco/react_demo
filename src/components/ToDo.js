import React, { Component } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button, Card, Form } from 'react-bootstrap';
import idGenerator from '../helpers/idGenerator';

class ToDo extends Component {

    state = {
        inputValue: '',
        tasks: []
    };

    handleInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    };

    addTask = () => {
        const { inputValue } = this.state;

        if (inputValue === '') {
            return true;
        }

        // const tasks = [...this.state.tasks];
        // tasks.unshift(inputValue);

        const curTask = { id: idGenerator(), text: inputValue };
        const tasks = [curTask, ...this.state.tasks];

        this.setState({
            tasks,
            inputValue: ''
        });
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.addTask();
        }
    };

    deleteTask = (key) => {
        const tasks = this.state.tasks.filter(function (task) {
            return task.id !== key;
        });

        this.setState({
            tasks
        });
    };

    createCard = (task) => {
        return (
            <Col md="4" className='my-3'>
                <Card key={task.id}>
                    <Card.Body>
                        <Form.Check
                            type="checkbox"
                            id={task.id}
                            label="Check me out"
                            className="float-right"
                        />
                        <Card.Text>
                            {task.text}
                        </Card.Text>
                        <Button
                            onClick={() => this.deleteTask(task.id)}
                            variant="primary">Delete</Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    };

    render() {

        const tasksComponents = this.state.tasks
            .map((task, index) => this.createCard(task));

        return (
            <Container fluid>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <InputGroup className="my-3">
                            <FormControl
                                value={this.state.inputValue}
                                onChange={this.handleInputChange}
                                onKeyDown={this.handleKeyDown}
                                placeholder="Input task"
                                aria-label="Input task"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button
                                    onClick={this.addTask}
                                    variant="outline-primary">Add task</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    {tasksComponents}
                </Row>
            </Container>
        );
    }
}

export default ToDo;