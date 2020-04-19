import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ActionButton } from 'office-ui-fabric-react';
import { getFeedbackById } from '../../services/api.service';
import QuestionWizard from '../../components/QuestionWizard';
import './GiveFeedback.css';

const GiveFeedback = ({ match, history }) => {

  const [state, setState] = useState({
    feedback: null,
    loading: true,
  });

  const getData = async () => {
    try {
      const { feedbackId } = match.params;
      const { data } = await getFeedbackById(feedbackId);
      setState({
        feedback: data,
        loading: false,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (match.params.feedbackId) {
      getData();
    }
  }, [match.params.feedbackId]);

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="GiveFeedback">
      <ActionButton text="Back" onClick={goBack} iconProps={{ iconName: 'ChevronLeft' }}/>
      {state.feedback && state.feedback.length > 0 &&
        <QuestionWizard questions={state.feedback} to={state.feedback[0].to} history={history} />
      }
    </div>
  );
}

GiveFeedback.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default GiveFeedback;
