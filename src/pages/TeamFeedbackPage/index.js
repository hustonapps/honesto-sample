import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../../components/PageHeader';
import FeedbackContainer from '../../components/FeedbackContainer';
import { getMyResponses } from '../../services/api.service';

const TeamFeedbackPage = ({ match }) => {
  const [state, setState] = useState({
    loading: true,
    feedback: null,
  });

  const getData = async () => {
    const { data } = await getMyResponses();
    setState({
      loading: false,
      feedback: data,
    })
  };

  useEffect(() => {
    getData();
  }, []);

  if (state.loading) {
    return null;
  }

  return (
    <div>
      <PageHeader title="Team Feedback" showSubmitButton />
      <FeedbackContainer feedback={state.feedback} user={match.params.feedbackId} />
    </div>
  );
}

TeamFeedbackPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default TeamFeedbackPage;
