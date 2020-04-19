import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserList from '../../components/UserList';
import { getTeamFeedback } from '../../services/api.service';
import './ThankYouPage.css';

const ThankYouPage = ({ history }) => {
  const [state, setState] = useState({
    feedbacks: [],
  });

  const getData = async () => {
    try {
      const { data } = await getTeamFeedback();
      setState({
        ...state,
        feedbacks: data.filter(d => !d.entries.every(d => d.answer)),
      })
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="ThankYouPage">
      <h1>
      Thank you for sharing your feedback!
      <small>Continue to give feedback to other team members</small>
      </h1>
      <UserList feedbacks={state.feedbacks} history={history} />
    </div>
  )
};

ThankYouPage.propTypes = {
   history: PropTypes.object.isRequired,
};

export default ThankYouPage;
