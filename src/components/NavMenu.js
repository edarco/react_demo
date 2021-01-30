import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../logo-menu.png';
import { logout, getUserInfo } from '../store/authActions';
import { connect } from 'react-redux';

function NavMenu({ isAuthenticated, logout, getUserInfo, user }) {

    useEffect(() => {
        if (isAuthenticated) {
            getUserInfo();
        }
    }, [getUserInfo, isAuthenticated]);

    const [navExpand, setNavExpand] = useState(false);

    const onClick = ({ target: { tagName } }) => {
        if (tagName !== 'DIV') {
            setNavExpand(false);
        }
    };

    const onToggle = () => {
        setNavExpand(!navExpand);
    }

    const logoImg = (<img
        alt=""
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top mr-2"
    />);

    return (
        <Navbar
            expanded={navExpand}
            expand="sm"
            bg="primary"
            variant="dark"
            className="mainMenu"
            onToggle={onToggle}
        >
            <Navbar.Brand className="navBrand">
                <NavLink
                    activeClassName='activeLink'
                    to='/'
                    className='navLink'
                    exact
                    onClick={onClick}
                >
                    {logoImg}
                    {isAuthenticated && "Home"}
                </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
                id="responsive-navbar-nav"
                onClick={onClick}
            >
                {
                    !isAuthenticated &&
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
                {user &&
                    <NavLink
                        activeClassName='activeLink'
                        to='/profile'
                        className='navLink profileLink'
                    >
                        <FontAwesomeIcon
                            icon={faUserCircle}
                            size="2x"
                        />
                        <span className='text-light mr-4 ml-2'>
                            {user.name} {user.surname}
                        </span>
                    </NavLink>
                }
                {isAuthenticated &&
                    <Button
                        variant="warning"
                        onClick={logout}
                    >
                        Logout
                    </Button>
                }
            </Navbar.Collapse>
        </Navbar>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        user: state.authReducer.userInfo
    };
};

const mapDispatchToProps = {
    logout,
    getUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);