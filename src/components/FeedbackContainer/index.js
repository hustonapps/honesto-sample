import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserList from '../../components/UserList';
import QuestionList from '../../components/QuestionList';
import './FeedbackContainer.css';

const FeedbackContainer = ({ feedback = [] }) => {
  const [selected, setSelected] = useState(null);

  const setSelectedUser = user => {
    const selectedUser = feedback.find(f => f._id === user) || feedback[0];
    setSelected(selectedUser);
  };

  const onClickUserRow = (e) => {
    const { value } = e.currentTarget.dataset;
    setSelectedUser(value);
  };

  useEffect(() => {
    if (feedback) {
      if (!selected) {
        setSelected(feedback[0]);
      }
    }
  }, [feedback, selected]);

  if (!feedback || !feedback.length) {
    return null;
  }

  return (
    <div className="FeedbackContainer">
      <div className="userList">
        <h3>Feedback Received</h3>
        <UserList
          feedbacks={feedback}
          displayOnly
          onClickUserRow={onClickUserRow}
          selectedUser={selected && selected._id}
        />
      </div>
      <div className="responses">
        <div className="header">
          <h3>{`${(selected && selected._id) || 'User'}'s Feedback`}</h3>
        </div>
        <QuestionList questions={(selected && selected.entries) || []} />
      </div>
    </div>
  );
}

FeedbackContainer.propTypes = {
  feedback: PropTypes.array,
};

export default FeedbackContainer;
