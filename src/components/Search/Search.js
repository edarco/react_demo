import React, { useState } from 'react';
import { Row, Col, Card, InputGroup, FormControl, Button, DropdownButton, Dropdown, Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { getTasks } from '../../store/taskActions';
import { shortStr } from '../../helpers/utils';
import testMobile from '../../helpers/testMobile';
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
        label: 'Created Before',
        value: 'create_lte'
    },
    {
        label: 'Created On/After',
        value: 'create_gte'
    },
    {
        label: 'Complete Before',
        value: 'complete_lte'
    },
    {
        label: 'Complete On/After',
        value: 'complete_gte'
    }
];

const isMobile = testMobile();

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


    const [filters, setFilters] = useState(false);

    const toggleFilters = () => setFilters(!filters);

    const statusFilter = (
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
    );


    const sortFilter = (
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
    );


    const dateFilters = (
        dateOptions.map((option, index) =>
            <Col
                xs={12} sm={6} md="auto"
                key={index}
            >
                <div>{option.label}</div>
                <DatePicker
                    className="form-control"
                    selected={dates[option.value]}
                    onChange={(value) => setDates({
                        ...dates,
                        [option.value]: value
                    })}
                />
            </Col>
        )
    );


    return (
        <Col sm={12}>
            {
                isMobile ?
                    <>
                        <InputGroup className="mb-2">
                            <InputGroup.Prepend>
                                <Button
                                    variant={filters ? "primary" : "outline-secondary"}
                                    onClick={toggleFilters}
                                >
                                    <FontAwesomeIcon icon={faSlidersH} />
                                </Button>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Search for a task..."
                                aria-describedby="basic-addon2"
                                onChange={handleInputChange}
                                value={search}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="primary"
                                    onClick={handleSubmit}
                                >
                                    <FontAwesomeIcon icon={faSearch} />
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <Collapse in={filters}>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <InputGroup>
                                            <Col xs={12}>
                                                <InputGroup.Append>
                                                    {statusFilter}
                                                    {sortFilter}
                                                </InputGroup.Append>
                                            </Col>
                                        </InputGroup>
                                        <InputGroup>
                                            {dateFilters}
                                        </InputGroup>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Collapse>
                    </>
                    :
                    <Card>
                        <Card.Body>
                            <Row>
                                <InputGroup className="mb-3">
                                    <Col className="mb-1">
                                        <FormControl
                                            placeholder="Search for a task..."
                                            aria-describedby="basic-addon2"
                                            onChange={handleInputChange}
                                            value={search}
                                        />
                                    </Col>
                                    <Col md="auto">
                                        <InputGroup.Append>
                                            {statusFilter}
                                            {sortFilter}
                                            <Button
                                                variant="primary"
                                                className="rounded"
                                                onClick={handleSubmit}
                                            >
                                                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                                                Search
                                            </Button>
                                        </InputGroup.Append>
                                    </Col>
                                </InputGroup>
                                <InputGroup>
                                    {dateFilters}
                                </InputGroup>
                            </Row>
                        </Card.Body>
                    </Card>
            }
        </Col>
    )
}

const mapDispatchToProps = {
    getTasks
};

export default connect(null, mapDispatchToProps)(Search);