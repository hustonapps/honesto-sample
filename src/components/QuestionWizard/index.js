import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { userAvatarMap } from '../../helpers/ui-helpers';
import './QuestionWizard.css';

const QuestionWizard = ({ questions, to }) => {
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState()

  useEffect(() => {
    setQuestionList(questions);
    setCurrentQuestionIndex(0);
  }, [questions]);

  useEffect(() => {
    if (currentQuestionIndex !== undefined && questionList.length) {
      setCurrentQuestion(questionList[currentQuestionIndex]);
    }
  }, [currentQuestionIndex]);

  const renderQuestionContainer = () => {
    return <p>{currentQuestion.questionType}</p>;
  };

  return (
    <div className="QuestionWizard">
      <div className="QuestionHeader">
        <div className="question">
          <h2>{currentQuestion.question}</h2>
          <img src={userAvatarMap[to.name]} alt={to.name} />
        </div>
        <p>{`Share your feedback with ${to.name}`}</p>
      </div>
      <div className="QuestionContainer">
        {renderQuestionContainer()}
      </div>
    </div>
  );
}

QuestionWizard.propTypes = {
  questions: PropTypes.array.isRequired,
  to: PropTypes.object.isRequired,
};

export default QuestionWizard;
