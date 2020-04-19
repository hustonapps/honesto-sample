import React from 'react';
import PropTypes from 'prop-types';

const OptionsQuestion = ({ question, handleChange }) => {

  const onClick = (e) => {
    const { value } = e.currentTarget.dataset;
    if (value === question.answer) {
      handleChange(null, null);
    } else {
      handleChange(null, value);
    }
  }

  const selected = question.answer;

  return (
    <div className="options">
      <p className={selected === 'belowAvg' ? 'selected' : ''} onClick={onClick} data-value="belowAvg">{question.options.belowAvg}</p>
      <p className={selected === 'avg' ? 'selected' : ''} onClick={onClick} data-value="avg">{question.options.avg}</p>
      <p className={selected === 'aboveAvg' ? 'selected' : ''} onClick={onClick} data-value="aboveAvg">{question.options.aboveAvg}</p>
    </div>
  );
}

OptionsQuestion.propTypes = {
  question: PropTypes.object.isRequired,
};

export default OptionsQuestion;
