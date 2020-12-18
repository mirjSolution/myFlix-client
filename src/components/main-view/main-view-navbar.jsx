import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Navbar, Nav } from 'react-bootstrap';

import { setFilter } from '../../actions/visibilityFilter';
import { logout } from '../../actions/auth';
import { toggleFilter } from '../../actions/toggle.js';
import VisibilityFilterInput from '../visiblity-filter-input/visibility-filter-input';

import logo from '../../../public/images/logo.svg';

import './main-view.scss';

const MainViewNavbar = ({
  setFilter,
  token,
  username,
  logout,
  history,
  toggleFilter,
}) => {
  let isDisabled = true;
  let isVisible = true;

  const [formSearch, setFormSearch] = useState({
    searchField: '',
  });

  const { searchField } = formSearch;

  useEffect(() => {
    setFilter(searchField);
  }, [searchField]);

  const handleChange = (e) => {
    e.preventDefault();
    setFormSearch({ searchField: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setFormSearch({ searchField: '' });
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    toggleFilter(false);
    history.push('/profile');
  };

  const handleLogout = (e) => {
    e.preventDefault();
    history.push('/login');
    logout();
  };

  if (token) {
    isDisabled = false;
  }

  return (
    <section className={`main-view-navbar-${isDisabled}`}>
      <header>
        <Navbar
          collapseOnSelect
          expand='lg'
          bg='dark'
          variant='dark'
          fixed='top'
          disabled
        >
          <Navbar.Brand>
            <Link to='/'>
              {/*<img
                src={logo}
                className='d-inline-block align-top'
                alt='React Bootstrap logo'
              />*/}
              <h1>MyFlix</h1>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <i className='far fa-user-circle'> {username}</i>
            <Nav className='mr-auto'>
              <a className='profile-link' onClick={handleProfileClick}>
                PROFILE
              </a>
              <a className='profile-link' onClick={handleLogout}>
                LOGOUT
              </a>
            </Nav>
            <VisibilityFilterInput
              placeholder='Filter Movies'
              handleChange={handleChange}
              handleClick={handleClick}
              className={isVisible}
            />
          </Navbar.Collapse>
        </Navbar>
      </header>
    </section>
  );
};

MainViewNavbar.propTypes = {
  setFilter: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.userInfo === null ? '' : state.auth.userInfo.token,
  username:
    state.auth.userInfo === null ? '' : state.auth.userInfo.user.username,
});

export default withRouter(
  connect(mapStateToProps, { setFilter, logout, toggleFilter })(MainViewNavbar)
);
