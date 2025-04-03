import React from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import CourseDetailPage from './pages/CourseDetailPage';
import QuizPage from './pages/QuizPage';
import NotFound from './pages/404Page';
import Login_Register from './pages/Login_Register';
import Community from './pages/Community';
import DashboardPage from './pages/DashboardPage';
import PartnershipsPage from './pages/PartnershipsPage';
import GlobalStyles from './assets/styles/GlobalStyle';

function App() {
  return (
    <>
    <GlobalStyles />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/login" element={<Login_Register />} />
        <Route path="/signup" element={<Login_Register />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/partnerships" element={<PartnershipsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;