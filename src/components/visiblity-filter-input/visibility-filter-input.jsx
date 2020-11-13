import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import './visibility-filter-input.scss';

const visibilityFilterInput = ({
  placeholder,
  handleChange,
  handleClick,
  filteredMovies,
}) => {
  return (
    <Form inline>
      <Form.Control
        type='text'
        placeholder={placeholder}
        onChange={handleChange}
        value={filteredMovies}
      />
      <Button onClick={handleClick} variant='outline-info'>
        Clear
      </Button>
    </Form>
  );
};

visibilityFilterInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filteredMovies: state.visibilityFilter.values,
});

export default connect(mapStateToProps)(visibilityFilterInput);
