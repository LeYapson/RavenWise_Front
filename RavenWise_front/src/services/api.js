import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
});

export const fetchCourses = async () => {
  const response = await api.get('/courses');
  return response.data;
};

export const fetchQuiz = async (quizId) => {
  const response = await api.get(`/quiz/${quizId}`);
  return response.data;
};