import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/CourseDetails.css";

function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/course/${courseId}`
        );
        setCourse(res.data.course);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course details");
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleSaveCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to save courses");
        navigate("/login");
        return;
      }

      await axios.post(
        `http://localhost:5000/api/save-course/${courseId}`,
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsSaved(true);
      alert("Course saved successfully!");
    } catch (err) {
      console.error("Error saving course:", err);
      if (err.response?.status === 400) {
        alert("Course already saved");
        setIsSaved(true);
      } else {
        alert("Failed to save course");
      }
    }
  };

  if (loading) return <div className="course-details"><p>Loading...</p></div>;
  if (error) return <div className="course-details"><p className="error">{error}</p></div>;
  if (!course) return <div className="course-details"><p>Course not found</p></div>;

  return (
    <div className="course-details">
      <div className="course-details-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1 className="course-title">{course.title}</h1>

        <div className="course-meta">
          <span className="course-source">Source: {course.source}</span>
          <span className="course-level">Level: {course.level}</span>
          <span className="course-type">Type: {course.type}</span>
          <span className="course-category">Category: {course.category}</span>
        </div>

        <div className="course-description">
          <h2>Description</h2>
          <p>{course.description}</p>
        </div>

        {course.skills && course.skills.length > 0 && (
          <div className="course-skills">
            <h2>Skills You'll Learn</h2>
            <ul>
              {course.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {course.careerPaths && course.careerPaths.length > 0 && (
          <div className="course-careers">
            <h2>Career Paths</h2>
            <ul>
              {course.careerPaths.map((path, index) => (
                <li key={index}>{path}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="course-actions">
          {course.url && (
            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Go to Course
            </a>
          )}
          <button
            className={`btn ${isSaved ? "btn-saved" : "btn-secondary"}`}
            onClick={handleSaveCourse}
            disabled={isSaved}
          >
            {isSaved ? "✓ Saved" : "Save Course"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
