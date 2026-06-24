import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { savedCourse } from '../../services/courseServices';
import '../style/CourseCard.css';

function CourseCard({ course }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isBookmarksPage = location.pathname.includes('bookmarks');

  const saveCourse = async (e) => {
    e.stopPropagation(); 
    try {
      await savedCourse(course._id);
      alert("Course saved successfully!");
    } catch (err) {
      console.error("Component catch received:", err);
      alert("Failed to save course");
    }
  };

  const goToCourse = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="course-card" onClick={() => navigate(`/course/${course._id}`)}>
      {!isBookmarksPage && (
        <button className="course-bookmark" onClick={saveCourse} title="Save course">
          🔖
        </button>
      )}

      <div className="course-content">
        <span className="course-category">{course.category}</span>
        <h4 className="course-title">{course.title}</h4>
        <p className="course-source">{course.source}</p>

        <div className="course-skills">
          {(course.skills || []).slice(0, 3).map((skill, i) => (
            <span key={i} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {course.url && (
        <a 
          className="course-link"
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={goToCourse}
        >
          Start Learning →
        </a>
      )}
    </div>
  );
}

export default CourseCard;