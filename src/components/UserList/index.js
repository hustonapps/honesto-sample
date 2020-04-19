import React from 'react';
import PropTypes from 'prop-types';
import UserRow from './UserRow';
import './UserList.css';

const UserList = ({ feedbacks, history }) => {

  const onClickFillOut = feedbackId => () => {
    history.push(`/app/giveFeedback/${feedbackId}`);
  };

  const onClickViewSubmission = feedbackId => () => {
    history.push(`/app/teamFeedback/${feedbackId}`)
  };

  return(
    <div className="UserList">
      {feedbacks.map(feedback => {
        return (
          <UserRow
            feedback={feedback}
            onClickFillOut={onClickFillOut}
            onClickViewSubmission={onClickViewSubmission}
          />
        )
      })}
    </div>
  );
};

UserList.propTypes = {
  feedbacks: PropTypes.array,
  history: PropTypes.object,
};

export default UserList;
