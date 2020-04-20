import React from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { userAvatarMap } from '../../helpers/ui-helpers';
import './UserRow.css';

const styles = {
  button: {
    root: {
      minWidth: 150,
    },
  }
}

const UserRow = ({
  feedback,
  onClickFillOut,
  onClickViewSubmission,
  displayOnly = false,
  onClickUserRow = () => {},
  selected = false,
}) => {
  const isComplete = feedback.entries.every(q => q.answer);
  const user = displayOnly ? feedback._id : feedback.entries[0].to;
  return (
    <div className={`UserRow${selected ? ' selected' : ''}${displayOnly ? ' displayOnly' : ''}`} onClick={onClickUserRow} data-value={feedback._id}>
      <div className="user">
        <img src={userAvatarMap[user]} alt={user} />
        <h3>{user}</h3>
      </div>
      {!displayOnly && !isComplete && (
        <PrimaryButton text="Fill Out" styles={styles.button} onClick={onClickFillOut(feedback._id)} />
      )}
      {!displayOnly && isComplete && (
        <DefaultButton text="View Submission" onClick={onClickViewSubmission(feedback._id)} />
      )}
    </div>
  );
}

UserRow.propTypes = {
  feedback: PropTypes.object.isRequired,
  onClickFillOut: PropTypes.func.isRequired,
  onClickViewSubmission: PropTypes.func.isRequired,
  displayOnly: PropTypes.bool,
  selected: PropTypes.bool,
};

export default UserRow;
