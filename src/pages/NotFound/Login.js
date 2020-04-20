import React from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

const NotFoundLogin = ({ history }) => (
  <div style={{
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
    padding: 30,
    marginTop: 40,
    width: 800,
    margin: '45px auto',
  }}>
    <label>404</label>
    <h1>Sorry! The page you are looking for cannot be found.<span role="img">&#128546;</span></h1>
    <PrimaryButton
      text="Back to Login"
      onClick={() => history.push('/')}
    />
  </div>
);

NotFoundLogin.propTypes = {
  history: PropTypes.object.isRequired
};

export default NotFoundLogin;
