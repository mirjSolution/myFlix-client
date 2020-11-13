import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id}>
      <Alert variant={alert.alertType}>
        <Alert.Heading>myFlix Movie App</Alert.Heading>
        <p>{alert.msg}</p>
      </Alert>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
