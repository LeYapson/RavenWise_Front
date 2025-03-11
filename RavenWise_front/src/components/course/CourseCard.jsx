import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
        <h1>Course Card</h1>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
    </div>
  );
};

export default CourseCard;