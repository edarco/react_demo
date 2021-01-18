import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../logo-menu.png';
import {logout} from '../store/authActions';
import { connect } from 'react-redux';

function NavMenu({ isAuthenticated, logout }) {

    return (
        <Navbar bg="primary" variant="dark" className="mainMenu">

            {isAuthenticated ?
                <Navbar.Brand className="navBrand">
                    <NavLink
                        activeClassName='activeLink'
                        to='/'
                        className='navLink'
                        exact
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
                </Navbar.Brand> :
                <>
                <NavLink
                    activeClassName='activeLink'
                    to='/register'
                    className='navLink'
                    exact
                >
                    Register
                </NavLink>
                <NavLink
                activeClassName='activeLink'
                to='/login'
                className='navLink'
                exact
            >
                Login
            </NavLink>
            </>


            }



            <Nav className="mr-auto">
                <NavLink
                    activeClassName='activeLink'
                    to='/about'
                    className='navLink'
                >
                    About
                </NavLink>
                <NavLink
                    activeClassName='activeLink'
                    to='/contact'
                    className='navLink'
                >
                    Contact
                </NavLink>
            </Nav>

            {isAuthenticated &&
             <Button
             variant="success"
            onClick={logout}
            >Logout</Button>}

        </Navbar>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    };
};

const mapDispatchToProps = {
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);