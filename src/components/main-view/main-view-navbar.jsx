import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFilter } from '../../actions/visibilityFilter';
import { logout } from '../../actions/auth';
import { toggleFilter } from '../../actions/toggle.js';
import logo from '../../../public/images/logo.svg';
import VisibilityFilterInput from '../visiblity-filter-input/visibility-filter-input';

import './main-view.scss';

const MainViewNavbar = ({
  setFilter,
  token,
  username,
  logout,
  history,
  toggleFilter,
}) => {
  let isDisabled,
    isVisible = true;

  const [formSearch, setFormSearch] = useState({
    searchField: '',
  });

  const { searchField } = formSearch;

  useEffect(() => {
    setFilter(searchField);
  }, [setFilter, searchField]);

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
    localStorage.clear();
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
              <img
                src={logo}
                className='d-inline-block align-top'
                alt='React Bootstrap logo'
              />
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
};

const mapStateToProps = (state) => ({
  token: state.auth.userInfo === null ? '' : state.auth.userInfo.token,
  username:
    state.auth.userInfo === null ? '' : state.auth.userInfo.user.username,
});

export default withRouter(
  connect(mapStateToProps, { setFilter, logout, toggleFilter })(MainViewNavbar)
);
