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

const UserRow = ({ feedback, onClickFillOut, onClickViewSubmission }) => (
  <div className="UserRow" key={feedback._id}>
    <div className="user">
      <img src={userAvatarMap[feedback.to.name]} alt={feedback.to.name} />
      <h3>{feedback.to.name}</h3>
    </div>
    {feedback.from !== undefined ? (
      <PrimaryButton text="Fill Out" styles={styles.button} onClick={onClickFillOut(feedback._id)} />
    ) : (
      <DefaultButton text="View Submission" onClick={onClickViewSubmission(feedback._id)} />
    )}
  </div>
);

UserRow.propTypes = {
  feedback: PropTypes.object.isRequired,
  onClickFillOut: PropTypes.func.isRequired,
  onClickViewSubmission: PropTypes.func.isRequired,
};

export default UserRow;
