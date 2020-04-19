import axios from 'axios';

export const getTeamFeedback = () => axios.get('/api/teamFeedback');

export const getFeedbackById = feedbackId => axios.get(`/api/feedback/${feedbackId}`)

export const answerFeedbackQuestion = (feedbackId, questionId, answer) => axios.post(`/api/feedback/${feedbackId}`, { questionId, answer });

export const skipFeedbackQuestion = (feedbackId, questionId, answer) => axios.post(`/api/feedback/${feedbackId}/skip`, { questionId });
