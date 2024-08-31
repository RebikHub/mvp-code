import axios from 'axios';

import cognito from './cognito/cognito';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(async (request) => {
  const { token } = await cognito.checkAuthTokens();
  if (token) {
    request.headers.set('Authorization', token);
  }

  return request;
});

export const feedbackInstance = axios.create({
  baseURL: import.meta.env.VITE_FEEDBACK_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_FEEDBACK_API_KEY,
  },
});

// пока интерсептер не нужен
// feedbackInstance.interceptors.request.use(async (request) => {
//   return request;
// });
