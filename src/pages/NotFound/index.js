import React from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

const NotFound = ({history}) => (
  <div style={{
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
    padding: 30,
    marginTop: 40,
  }}>
    <label>404</label>
    <h1>Sorry! The page you are looking for cannot be found.<span role="img">&#128546;</span></h1>
    <PrimaryButton
      text="Back to Share Feedback"
      onClick={() => history.push('/app')}
    />
  </div>
);

NotFound.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NotFound;
