import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header';
import LandingPage from '../LandingPage';
import MyFeedbackPage from '../MyFeedbackPage';
import TeamFeedbackPage from '../TeamFeedbackPage';
import GiveFeedback from '../GiveFeedback';
import ThankYouPage from '../ThankYou';
import './App.css';

const App = ({ history, match }) => {
  const { path } = match;

  return (
    <div className="App">
      <Header history={history} />
      <main>
        <Switch>
          <Route path={`${path}/thankYou`} component={ThankYouPage} />
          <Route path={`${path}/giveFeedback/:feedbackId`} component={GiveFeedback} />
          <Route path={`${path}/myFeedback`} component={MyFeedbackPage} />
          <Route path={`${path}/teamFeedback:feedbackId`} component={TeamFeedbackPage} />
          <Route exact path={path} component={LandingPage} />
        </Switch>
      </main>
    </div>
  );
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default App;
