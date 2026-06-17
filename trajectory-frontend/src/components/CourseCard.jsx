import '../style/CourseCard.css';
import axios from 'axios';
  import { useNavigate, useLocation } from 'react-router-dom';

function CourseCard({ course }) {
  const navigate = useNavigate();


  const location = useLocation();
  const isBookmarksPage = location.pathname.includes('bookmarks');

  const saveCourse = async (e) => {
    e.stopPropagation();
    try {
      await axios.post(
        `http://localhost:5000/api/save-course/${course._id}`,
        { courseId: course._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Course saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save course");
    }
  };

  const goToCourse = (e) => {
    e.stopPropagation();
  };


return (
     <div className="course-card" onClick={() => navigate(`/course/${course._id}`)}>
      {/* Conditionally hide default button if on bookmarks page */}
      {!isBookmarksPage && (
        <button className="course-bookmark" onClick={saveCourse} title="Save course">
          🔖
        </button>
      )}

    {/* Everything that sits above the button goes here */}
    <div className="course-content">
      <span className="course-category">{course.category}</span>
      <h4 className="course-title">{course.title}</h4>
      <p className="course-source">{course.source}</p>

      <div className="course-skills">
        {(course.skills || []).slice(0, 4).map((skill, i) => (
          <span key={i} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
    </div>

    {/* The button stays at the bottom level */}
    {course.url && (
      <a
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