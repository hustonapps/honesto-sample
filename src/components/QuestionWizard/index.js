import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  DefaultButton,
  PrimaryButton,
  ProgressIndicator,
  Rating,
  RatingSize,
  IconButton,
} from 'office-ui-fabric-react';
import { userAvatarMap } from '../../helpers/ui-helpers';
import { answerFeedbackQuestion, skipFeedbackQuestion } from '../../services/api.service';
import RatingBar from './RatingBar';
import OptionsQuestion from './OptionsQuestion';
import './QuestionWizard.css';

const QuestionWizard = ({ history, questions, to }) => {
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

  const handleChange = questionId => (e, value) => {
    setQuestionList(ql => ql.map(q => {
      if (q._id === questionId) {
        q.skipped = false;
        q.answer = value;
      }
      return q;
    }))
  };

  const renderQuestionContainer = () => {
    if (currentQuestion.questionType === 'question') {
      return (
        <TextField
          value={currentQuestion.answer}
          multiline
          onChange={handleChange(currentQuestion._id)}
          placeholder="Say Something"
          styles={{
            fieldGroup: {
              borderColor: '#D9DCDE',
            }
          }}
        />
      );
    }

    if (currentQuestion.questionType === 'options') {
      return (
        <OptionsQuestion question={currentQuestion} handleChange={handleChange(currentQuestion._id)} />
      );
    }

    if (currentQuestion.questionType === 'scaleRating') {
      return (
        <div className="options scale">
          <p>{currentQuestion.scaleRatingText}</p>
          <RatingBar rating={currentQuestion.answer} onSelectRating={handleChange(currentQuestion._id)} />
        </div>
      );
    }

    return null;
  };

  const nextQuestion = async () => {
    await answerFeedbackQuestion(currentQuestion.feedbackId, currentQuestion._id, currentQuestion.answer);
    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex(cqi => cqi + 1);
    } else if (currentQuestionIndex === questionList.length -1) {
      history.push('/app/thankYou');
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(cqi => cqi - 1);
    }
  };

  const skipQuestion = async () => {
    await skipFeedbackQuestion(currentQuestion.feedbackId, currentQuestion._id);
    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex(cqi => cqi + 1);
    } else if (currentQuestionIndex === questionList.length -1) {
      history.push('/app');
    }
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
        <div className="QuestionActions">
          <DefaultButton text="Previous" onClick={previousQuestion} disabled={currentQuestionIndex === 0}/>
          <DefaultButton text="Skip/Reset" onClick={skipQuestion} />
          <PrimaryButton text="Next" onClick={nextQuestion} />
        </div>
        <ProgressIndicator
          styles={{
            progressBar: {
              backgroundColor: 'aquamarine',
              height: 4
            },
            progressTrack: {
              height: 4,
            },
          }}
          percentComplete={(currentQuestionIndex + 1) / questionList.length}
          description={
            <div className="progressDescription">
              <div className="description">
                <label>Questions Completed</label>
                <p>{`${currentQuestionIndex + 1} / ${questionList.length}`}</p>
              </div>
              <div className="questionFeedback">
                <Rating
                  min={0}
                  max={5}
                  rating={3}
                  size={RatingSize.Large}
                  styles={{
                    ratingStarFront: {
                      color: '#AB61E5',
                    },
                    ratingStarBack: {
                      color: '#ACB1B6'
                    },
                  }}
                />
                <IconButton
                  onClick={() => {}}
                  iconProps={{
                    iconName: 'Flag',
                  }}
                />
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

QuestionWizard.propTypes = {
  history: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  to: PropTypes.object.isRequired,
};

export default QuestionWizard;
