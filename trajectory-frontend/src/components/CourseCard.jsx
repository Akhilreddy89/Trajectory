import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { savedCourse } from '../../services/courseServices';
import '../style/CourseCard.css';

function CourseCard({ course, isCompleted = false, onMarkComplete, isCompleting = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isBookmarksPage = location.pathname.includes('bookmarks');
  const isFromSavedTab = location.pathname.includes('bookmarks') && isCompleted === false;

  const saveCourse = async (e) => {
    e.stopPropagation(); 
    try {
      await savedCourse(course._id);
    } catch (err) {
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

      {isFromSavedTab && onMarkComplete ? (
        <button 
          className="action-btn complete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onMarkComplete(course._id);
          }}
          disabled={isCompleting}
        >
          {isCompleting ? (
            <>
              <span className="btn-spinner"></span>
              Completing...
            </>
          ) : (
            <>
              ✓ Mark as Completed
            </>
          )}
        </button>
      ) : course.url && (
        <a 
          className={`course-link ${isCompleted ? 'course-link-completed' : ''}`}
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={goToCourse}
          style={{ pointerEvents: isCompleted ? 'none' : 'auto' }}
        >
          {isCompleted ? "✓ Completed" : "Start Learning →"}
        </a>
      )}
    </div>
  );
}

export default CourseCard;