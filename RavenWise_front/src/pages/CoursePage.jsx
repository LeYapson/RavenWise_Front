import React from 'react';
import CourseList from '../components/course/CourseList';
import styled from 'styled-components';
import Header from '../components/common/Header';

const MainContainer = styled.div`
  padding: 20px;
`;

const CoursePage = () => {
  const courses = [
    { id: 1, title: 'Course 1', description: 'Description of Course 1' },
    { id: 2, title: 'Course 2', description: 'Description of Course 2' },
  ];

  return (
    <MainContainer>
        <Header />
      <h2>Courses</h2>
      <CourseList courses={courses} />
    </MainContainer>
  );
};

export default CoursePage;