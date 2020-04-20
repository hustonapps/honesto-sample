import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import './QuestionList.css';

const QuestionList = ({ questions }) => {
  if (!questions || !questions.length) {
    return null;
  }

  return (
    <div className="QuestionList">
      {questions.map(q => (
        <Question question={q} key={q._id}/>
      ))}
    </div>
  );
}

QuestionList.propTypes = {
  feedback: PropTypes.array,
};

export default QuestionList;
