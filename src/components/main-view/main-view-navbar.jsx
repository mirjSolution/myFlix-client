import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFilter } from '../../actions/visibilityFilter';
import logo from '../../../public/images/logo.svg';
import VisibilityFilterInput from '../visiblity-filter-input/visibility-filter-input';

const MainViewNavbar = ({ setFilter }) => {
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

  return (
    <section className='main-view-navbar'>
      <header>
        <Navbar
          collapseOnSelect
          expand='lg'
          bg='dark'
          variant='dark'
          fixed='top'
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
};

export default connect(null, { setFilter })(MainViewNavbar);
