import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../../components/PageHeader';
import UserList from '../../components/UserList';
import { getTeamFeedback } from '../../services/api.service';

const LandingPage = ({ history }) => {
  const [state, setState] = useState({
    feedbacks: [],
  });

  const getData = async () => {
    try {
      const { data } = await getTeamFeedback();
      setState({
        ...state,
        feedbacks: data,
      })
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="LandingPage">
      <PageHeader title="Share Feedback"/>
      <UserList feedbacks={state.feedbacks} history={history} />
    </div>
  );
}

LandingPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default LandingPage;
