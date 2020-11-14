import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './alert-view.scss';

const AlertView = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div
      key={alert.id}
      className={`alert alert-${alert.alertType} text-center`}
    >
      {alert.msg}
    </div>
  ));

AlertView.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(AlertView);
