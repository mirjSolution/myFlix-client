import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFilter } from '../../actions/visibilityFilter';
import { logout } from '../../actions/auth';
import logo from '../../../public/images/logo.svg';
import VisibilityFilterInput from '../visiblity-filter-input/visibility-filter-input';

import './main-view.scss';

const MainViewNavbar = ({ setFilter, token, username, logout }) => {
  let isDisabled = true;
  const [formSearch, setFormSearch] = useState({
    searchField: '',
  });
  const handleChange = (event) => {
    setFormSearch({ searchField: event.target.value });
  };
  const handleClick = () => {
    setFormSearch({ searchField: '' });
  };
  const handleLogout = () => {
    logout();
    localStorage.clear();
  };
  const { searchField } = formSearch;

  useEffect(() => {
    if (searchField !== '') {
      setFilter(searchField);
    }
  }, [setFilter, searchField]);

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
              <Link className='profile-link' to='/profile'>
                PROFILE
              </Link>
              <a className='profile-link' onClick={handleLogout}>
                LOGOUT
              </a>
            </Nav>
            <VisibilityFilterInput
              placeholder='Filter Movies'
              handleChange={handleChange}
              handleClick={handleClick}
            />
          </Navbar.Collapse>
        </Navbar>
      </header>
    </section>
  );
};

MainViewNavbar.propTypes = {
  setFilter: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.userInfo === null ? '' : state.auth.userInfo.token,
  username:
    state.auth.userInfo === null ? '' : state.auth.userInfo.user.username,
});

export default connect(mapStateToProps, { setFilter, logout })(MainViewNavbar);
