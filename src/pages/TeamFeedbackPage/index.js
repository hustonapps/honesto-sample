import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import FeedbackContainer from '../../components/FeedbackContainer';
import { getMyResponses } from '../../services/api.service';

const TeamFeedbackPage = () => {
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
      <FeedbackContainer feedback={state.feedback} />
    </div>
  );
}

export default TeamFeedbackPage;
