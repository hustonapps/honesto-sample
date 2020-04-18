import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import JaneAvatar from '../assets/jane.png';
import './Header.css';

const activeStyle = {
  borderBottom: '3px solid purple',
}

const Header = ({ history }) => {
  return (
    <div className="SiteHeader">
      <nav>
        <h1>Honesto</h1>
        <ul className="links">
          <li><NavLink exact to="/app" activeStyle={activeStyle}>Share Feedback</NavLink></li>
          <li><NavLink to="/app/myFeedback" activeStyle={activeStyle}>My Feedback</NavLink></li>
          <li><NavLink to="/app/teamFeedback" activeStyle={activeStyle}>Team Feedback</NavLink></li>
          <li><NavLink to="/app/teams" activeStyle={activeStyle}>Teams</NavLink></li>
        </ul>
        <div className="userLinks">
          <span className="feedbackCycle">
            <label>Next Feedback Cycle</label>
            <h4>July 2020 - <span style={{ color: '#3cbcbc'}}> 4 Months</span></h4>
          </span>
          <div className="userMenu">
            <img src={JaneAvatar} alt="logged-in user"/>
            <span>
              <label>Jane Smith</label>
              <NavLink to="/">Logout</NavLink>
            </span>
          </div>
        </div>
      </nav>
    </div>
  )
};

Header.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Header;
