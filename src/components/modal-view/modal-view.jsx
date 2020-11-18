import React from 'react';
import PropTypes from 'prop-types';

const ModalView = () => {
  return (
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handleAction}>
          {titleAction}
        </Button>
        <Button variant='secondary' onClick={handleClose}>
          {titleClose}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalView.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  handleAction: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  titleAction: PropTypes.string.isRequired,
  titleClose: PropTypes.string.isRequired,
};

export default ModalView;
