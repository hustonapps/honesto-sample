import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import FeedbackContainer from '../../components/FeedbackContainer';
import { getMyFeedback } from '../../services/api.service';
import './MyFeedback.css';

const MyFeedbackPage = () => {
  const [state, setState] = useState({
    loading: true,
    feedback: null,
  });

  const getData = async () => {
    const { data } = await getMyFeedback();
    setState({
      loading: false,
      feedback: data,
    })
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageHeader title="My Feedback" showSubmitButton />
      <FeedbackContainer feedback={state.feedback} />
    </div>
  );
}

export default MyFeedbackPage;
