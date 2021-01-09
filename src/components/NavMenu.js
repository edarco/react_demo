import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../logo-menu.png';

export default function NavMenu() {

    return (
        <Navbar bg="primary" variant="dark" className="mainMenu">
            <Navbar.Brand className="navBrand">
                <NavLink
                    exact
                    activeClassName='activeLink'
                    to='/'
                    className='navLink'
                >
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top mr-2"
                    />
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
                <NavLink
                    activeClassName='activeLink'
                    to='/register'
                    className='navLink'
                >
                    Register
                </NavLink>
                <Nav.Link
                    href="https://reactrouter.com/web/guides/quick-start"
                    target="_blank"
                >
                    Documentation
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}