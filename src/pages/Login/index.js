import React from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { PrimaryButton } from 'office-ui-fabric-react';
import AppIcon from '../../assets/AppIcon.png';

const LoginPage = ({ history }) => {
  const handleLogin = () => {
    history.push('/app');
  };

  return (
    <div className="LoginPage">
      <div className="LoginContainer">
        <div className="logo">
          <img src={AppIcon} alt="Honesto" />
          <h3>Honesto</h3>
        </div>
        <PrimaryButton text="Login with Google" onClick={handleLogin} />
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default LoginPage;
