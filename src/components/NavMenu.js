import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function NavMenu() {

    return (
        <Navbar bg="primary" variant="dark">
            <Link to='/'><Navbar.Brand>Home </Navbar.Brand></Link>
            <Nav className="mr-auto">
                <Link to='/task' className='nav-link'>Task</Link>
                <Nav.Link href="https://reactrouter.com/web/guides/quick-start" target="_blank">Go to documentation</Nav.Link>
            </Nav>
        </Navbar>
    );
}