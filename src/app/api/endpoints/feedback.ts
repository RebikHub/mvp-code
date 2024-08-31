import { feedbackInstance } from '../baseApi';
import {
  IBodyAnswers,
  IBodyFeedbackReview,
  IBodyFeedbackTickets,
  IFeedbacks,
} from '../types';

const postFeedbackReviews = async (body: IBodyFeedbackReview) => {
  return await feedbackInstance.post('/reviews', body);
};

const postFeedbackTickets = async (body: IBodyFeedbackTickets) => {
  return await feedbackInstance.post('/tickets', body);
};

const getFeedbacksUUID = async () => {
  return await feedbackInstance.get<IFeedbacks>(
    `/feedbacks/${import.meta.env.VITE_FEEDBACK_UUID}`,
  );
};

const postFeedbacksAnswers = async (body: IBodyAnswers) => {
  return await feedbackInstance.post(
    `/feedbacks/${import.meta.env.VITE_FEEDBACK_UUID}/answers`,
    body,
  );
};

export default {
  postFeedbackReviews,
  postFeedbackTickets,
  getFeedbacksUUID,
  postFeedbacksAnswers,
};
