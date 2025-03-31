import React from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import QuizPage from './pages/QuizPage';
import NotFound from './pages/404Page';
import Login_Register from './pages/Login_Register';
import Community from './pages/Community';
import GlobalStyles from './assets/styles/GlobalStyle';

function App() {

  return (
    <>
    <GlobalStyles />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/login" element={<Login_Register />} />
        <Route path="/signup" element={<Login_Register />} />
        {/* <Route path="/courses/:id" element={<CourseDetails />} /> */}
        {/* <Route path="/quiz/:id" element={<QuizDetails />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;