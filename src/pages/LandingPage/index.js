import React from 'react';
import PropTypes from 'prop-types';

const LandingPage = ({history}) => (
  <div>
    <h1>Landing Page</h1>
  </div>
);

LandingPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default LandingPage;
