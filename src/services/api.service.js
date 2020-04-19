import axios from 'axios';

export const getTeamFeedback = () => axios.get('/api/teamFeedback');

export const getFeedbackById = feedbackId => axios.get(`/api/feedback/${feedbackId}`)
