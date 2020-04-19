import React from 'react';
import PageHeader from '../../components/PageHeader';
import FeedbackContainer from '../../components/FeedbackContainer';

const MyFeedbackPage = ({}) => {
  return (
    <div>
      <PageHeader title="My Feedback" showSubmitButton />
      <FeedbackContainer />
    </div>
  );
}

export default MyFeedbackPage;
