import React from 'react';
import PropTypes from 'prop-types';
import './Question.css';

const Question = ({ question }) => {
  if (!question) {
    return null;
  }

  if (question.questionType === 'question') {
    return (
      <div className="question text-question">
        <p>
          {question.question}
          {(!question.answer || question.skipped) &&
            <span className="skipped">Skipped</span>
          }
        </p>
        <blockquote>{question.answer}</blockquote>
      </div>
    );
  }

  if (question.questionType === 'options') {
    const answerMap = {
      belowAvg: 0,
      avg: 1,
      aboveAvg: 2,
    };
    const answerRating = answerMap[question.answer];
    return (
      <div className="question options-question">
        <p>
          {question.question}
          {(!question.answer || question.skipped) &&
            <span className="skipped">Skipped</span>
          }
        </p>
        <div className={`answer ${question.answer}`}>
          <div className={answerRating >= 0 ? 'selected' : ''}/>
          <div className={answerRating >= 1 ? 'selected' : ''}/>
          <div className={answerRating === 2 ? 'selected' : ''}/>
        </div>
      </div>
    );
  }

  if (question.questionType === 'scaleRating') {
    const getRating = () => {
      const val = +question.answer;
      if (val < 4) {
        return 'belowAvg';
      }

      if (val > 3 && val < 7) {
        return 'avg';
      }

      if (val > 6) {
        return 'aboveAvg';
      }

      return '';
    };
    const rating = getRating();
    return (
      <div className="question scale-question">
        <p>
          {question.question}
          {(!question.answer || question.skipped) &&
            <span className="skipped">Skipped</span>
          }
        </p>
        <div className={`answer ${rating}`}>
          <div key={1} className={question.answer >= 1 ? 'selected' : ''}/>
          <div key={2} className={question.answer >= 2 ? 'selected' : ''}/>
          <div key={3} className={question.answer >= 3 ? 'selected' : ''}/>
          <div key={4} className={question.answer >= 4 ? 'selected' : ''}/>
          <div key={5} className={question.answer >= 5 ? 'selected' : ''}/>
          <div key={6} className={question.answer >= 6 ? 'selected' : ''}/>
          <div key={7} className={question.answer >= 7 ? 'selected' : ''}/>
          <div key={8} className={question.answer >= 8 ? 'selected' : ''}/>
          <div key={9} className={question.answer >= 9 ? 'selected' : ''}/>
          <div key={10} className={question.answer === 10 ? 'selected' : ''}/>
        </div>
      </div>
    );
  }
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
};

export default Question;
