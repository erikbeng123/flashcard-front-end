import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const HelloMessage = ({ name }) => {
  return <div>{name}</div>;
};

HelloMessage.propTypes = {
  name: PropTypes.string.isRequired,
};

const mountNode = document.getElementById('app');
ReactDOM.render(<HelloMessage name="Test" />, mountNode);
