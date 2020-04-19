import React from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { userAvatarMap } from '../../helpers/ui-helpers';

const styles = {
  button: {
    root: {
      minWidth: 150,
    },
  }
}

const UserRow = ({ feedback, onClickFillOut, onClickViewSubmission }) => {
  const isComplete = feedback.entries.every(q => q.answer);
  return (
    <div className="UserRow" key={feedback._id}>
      <div className="user">
        <img src={userAvatarMap[feedback.entries[0].to]} alt={feedback.entries[0].to} />
        <h3>{feedback.entries[0].to}</h3>
      </div>
      {!isComplete ? (
        <PrimaryButton text="Fill Out" styles={styles.button} onClick={onClickFillOut(feedback._id)} />
      ) : (
        <DefaultButton text="View Submission" onClick={onClickViewSubmission(feedback._id)} />
      )}
    </div>
  );
}

UserRow.propTypes = {
  feedback: PropTypes.object.isRequired,
  onClickFillOut: PropTypes.func.isRequired,
  onClickViewSubmission: PropTypes.func.isRequired,
};

export default UserRow;
