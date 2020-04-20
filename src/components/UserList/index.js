import React from 'react';
import PropTypes from 'prop-types';
import UserRow from './UserRow';

const UserList = ({
  feedbacks,
  history,
  displayOnly = false,
  onClickUserRow = () => {},
  selectedUser,
}) => {

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
            key={feedback._id}
            displayOnly={displayOnly}
            feedback={feedback}
            onClickFillOut={onClickFillOut}
            onClickViewSubmission={onClickViewSubmission}
            onClickUserRow={onClickUserRow}
            selected={feedback._id === selectedUser}
          />
        )
      })}
    </div>
  );
};

UserList.propTypes = {
  feedbacks: PropTypes.array,
  history: PropTypes.object,
  displayOnly: PropTypes.bool,
  onClickUserRow: PropTypes.func,
  selectedUser: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default UserList;
