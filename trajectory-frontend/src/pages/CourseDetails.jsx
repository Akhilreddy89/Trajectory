import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById, getSavedCourses, savedCourse } from '../../services/courseServices.js';
import "../style/CourseDetails.css";

function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchCourseDetailsAndStatus = async () => {
      try {
        setLoading(true);

        const data = await getCourseById(courseId);
        setCourse(data.course);

        try {
          const savedRes = await getSavedCourses();
          const alreadyBookmarked = savedRes.data.savedCourses?.some(
            (item) => item.courseId?._id === courseId || item.courseId === courseId
          );
          if (alreadyBookmarked) setIsSaved(true);
        } catch (statusErr) {
          console.log("Non-critical bookmark state sync pass:", statusErr.message);
        }

      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course details. Please return later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetailsAndStatus();
  }, [courseId]);

  const handleSaveCourse = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await savedCourse(courseId);
      setIsSaved(true);
    } catch (err) {
      console.error("Error saving course:", err);
      if (err.response?.status === 400) {
        setIsSaved(true);
      }
    }
  };

  if (loading) {
    return (
      <div className="details-loader-view">
        <div className="details-spinner"></div>
        <p>Fetching dynamic module parameters...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-loader-view">
        <div className="error-card">
          <p className="error-text">⚠️ {error}</p>
          <button className="back-button-fallback" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="details-loader-view">
        <p>Requested course module context could not be located.</p>
      </div>
    );
  }

  return (
    <div className="course-details-page">
      <div className="course-details-container">
        
        <button className="back-navigation-btn" onClick={() => navigate(-1)}>
          ← Back to Explorer
        </button>

        <div className="details-main-header">
          <h1 className="course-title-display">{course.title}</h1>
        
          
          <div className="course-meta-tags-row">
            <span className="meta-tag tag-source">{course.source}</span>
            <span className="meta-tag tag-level">{course.level}</span>
            {course.type && <span className="meta-tag tag-type">{course.type}</span>}
            <span className="meta-tag tag-category">{course.category}</span>
          </div>
        </div>

        <div className="details-content-section">
          <h2>Overview & Scope</h2>
          <p className="description-text-block">{course.description}</p>
        </div>

        {course.skills && course.skills.length > 0 && (
          <div className="details-content-section">
            <h2>Skills You'll Master</h2>
            <div className="skills-pill-box-flex">
              {course.skills.map((skill, index) => {
                const targetLabel = typeof skill === "object" && skill !== null ? skill.name : skill;
                return (
                  <span key={index} className="pill-learning-node">
                    {targetLabel}
                  </span>
                );
              })}
            </div>
          </div>
        )}
        {/* {course.duration && (
          <div className="details-content-section">
            <h2>Estimated Completion Time</h2>
            <p>{course.duration}</p>
          </div>
        )} */}

        {course.careerPaths && course.careerPaths.length > 0 && (
          <div className="details-content-section">
            <h2>Target Professional Paths</h2>
            <div className="careers-pill-box-flex">
              {course.careerPaths.map((path, index) => (
                <span key={index} className="pill-career-node">
                  {path}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="course-actions-footer-bar">
          {course.url && (
            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="action-cta-btn launch-primary-btn"
            >
              Start Learning Now →
            </a>
          )}
          <button
            className={`action-cta-btn ${isSaved ? "saved-disabled-btn" : "save-secondary-btn"}`}
            onClick={handleSaveCourse}
            disabled={isSaved}
          >
            {isSaved ? "✓ Added to Workspace" : "Bookmark Course"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default CourseDetails;