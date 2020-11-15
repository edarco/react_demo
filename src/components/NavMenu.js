import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export default function NavMenu() {

    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand>
                <NavLink
                    exact
                    activeClassName='activeLink'
                    to='/'
                    className='navLink'
                >
                    Home
                </NavLink>
            </Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink
                    activeClassName='activeLink'
                    to='/task'
                    className='navLink'
                >
                    Task
                </NavLink>
                <Nav.Link
                    href="https://reactrouter.com/web/guides/quick-start"
                    target="_blank"
                >
                    Go to documentation
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}