import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFilter } from '../../actions/visibilityFilter';
import logo from '../../../public/images/logo.svg';
import VisibilityFilterInput from '../visiblity-filter-input/visibility-filter-input';

import './main-view.scss';

const MainViewNavbar = ({ setFilter, isAuthenticated }) => {
  const [formSearch, setFormSearch] = useState({
    searchField: '',
  });

  const handleChange = (event) => {
    setFormSearch({ searchField: event.target.value });
  };

  const handleClick = () => {
    setFormSearch({ searchField: '' });
  };

  const { searchField } = formSearch;

  useEffect(() => {
    setFilter(searchField);
  }, [setFilter, searchField]);

  console.log(isAuthenticated);

  return (
    <section className={`main-view-navbar-${isAuthenticated}`}>
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
            <Nav className='mr-auto'>
              <Nav.Link href='#home'>Home</Nav.Link>
              <Nav.Link href='#features'>Features</Nav.Link>
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
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setFilter })(MainViewNavbar);
