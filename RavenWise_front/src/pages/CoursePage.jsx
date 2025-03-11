import React from 'react';
import CourseList from '../components/course/CourseList';
import Header from '../components/common/Header';

const CoursePage = () => {
  const courses = [
    { id: 1, title: 'Course 1', description: 'Description of Course 1' },
    { id: 2, title: 'Course 2', description: 'Description of Course 2' },
  ];

  return (
    <div>
        <Header />
      <h2>Courses</h2>
      <CourseList courses={courses} />
    </div>
  );
};

export default CoursePage;