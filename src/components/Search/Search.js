import React, { useState } from 'react';
import { Col, Card, InputGroup, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTasks } from '../../store/actions';
import { shortStr } from '../../helpers/utils';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const statusOptions = [
    {
        label: 'All',
        value: ''
    },
    {
        label: 'Active',
        value: 'active'
    },
    {
        label: 'Done',
        value: 'done'
    }
];

const sortOptions = [
    {
        label: 'Default',
        value: ''
    },
    {
        label: 'A-Z',
        value: 'a-z'
    },
    {
        label: 'Z-A',
        value: 'z-a'
    },
    {
        label: 'Creation date oldest',
        value: 'creation_date_oldest'
    },
    {
        label: 'Creation date newest',
        value: 'creation_date_newest'
    },
    {
        label: 'Completion date oldest',
        value: 'completion_date_oldest'
    },
    {
        label: 'Completion date newest',
        value: 'completion_date_newest'
    }
];


const dateOptions = [
    {
        label: 'Created On/Before', // 'Create lte',
        value: 'create_lte'
    },
    {
        label: 'Created On/After', // 'Create gte',
        value: 'create_gte'
    },
    {
        label: 'Tasks On/Before',
        value: 'complete_lte'
    },
    {
        label: 'Tasks On/After',
        value: 'complete_gte'
    }
];



function Search(props) {

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState({
        label: '',
        value: ''
    });

    const [sort, setSort] = useState({
        label: '',
        value: ''
    });

    const [dates, setDates] = useState({
        create_lte: null,
        create_gte: null,
        complete_lte: null,
        complete_gte: null
    });


    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSubmit = () => {

        const searchData = {
            search,
            status: status.value,
            sort: sort.value
        };

        for (let key in dates) {
            let val = dates[key];
            if (val) {
                searchData[key] = val.toLocaleDateString();
            }
        }

        props.getTasks(searchData);
    };


    return (
        <Col>
            <Card>
                <Card.Body>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search for a task..."
                            aria-describedby="basic-addon2"
                            onChange={handleInputChange}
                            value={search}
                        />
                        <InputGroup.Append>
                            <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                className="ml-1"
                                title={status.value ? status.label : "Status"}
                            >
                                {
                                    statusOptions.map((option, index) =>
                                        <Dropdown.Item
                                            key={index}
                                            active={status.value === option.value}
                                            onClick={() => setStatus(option)}
                                        >
                                            {option.label}
                                        </Dropdown.Item>
                                    )
                                }
                            </DropdownButton>
                            <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                className="mx-1"
                                title={sort.value ? shortStr(sort.label, 5) : "Sort"}
                            >
                                {
                                    sortOptions.map((option, index) =>
                                        <Dropdown.Item
                                            key={index}
                                            active={sort.value === option.value}
                                            onClick={() => setSort(option)}
                                        >
                                            {option.label}
                                        </Dropdown.Item>
                                    )
                                }
                            </DropdownButton>
                            <Button
                                variant="primary"
                                className="rounded"
                                onClick={handleSubmit}
                            >
                                Search
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        {
                            dateOptions.map((option, index) =>
                                <div
                                    className="mr-4"
                                    key={index}
                                >
                                    <div>{option.label}</div>
                                    <DatePicker
                                        selected={dates[option.value]}
                                        onChange={(value) => setDates({
                                            ...dates,
                                            [option.value]: value
                                        })}
                                    />
                                </div>
                            )
                        }
                    </InputGroup>
                </Card.Body>
            </Card>
        </Col>
    )
}

const mapDispatchToProps = {
    getTasks
};

export default connect(null, mapDispatchToProps)(Search);