import React, { useEffect, useState } from "react";
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
    const fetchCourseDetailsAndStatus = async () => {
      try {
        setLoading(true);
        
        // Fetch course core payload data
        const res = await axios.get(`http://localhost:5000/api/course/${courseId}`);
        setCourse(res.data.course);

        // Optional cross-check against saved bookmark states if authenticated
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const savedRes = await axios.get("http://localhost:5000/api/saved-courses", {
              headers: { Authorization: `Bearer ${token}` }
            });
            // Inspect array elements matchers
            const alreadyBookmarked = savedRes.data.savedCourses?.some(
              (item) => item.courseId?._id === courseId || item.courseId === courseId
            );
            if (alreadyBookmarked) setIsSaved(true);
          } catch (statusErr) {
            console.log("Non-critical bookmark state sync pass:", statusErr.message);
          }
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
        { headers: { Authorization: `Bearer ${token}` } }
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
        
        {/* Navigation Action header control */}
        <button className="back-navigation-btn" onClick={() => navigate(-1)}>
          ← Back to Explorer
        </button>

        {/* Course Header */}
        <div className="details-main-header">
          <h1 className="course-title-display">{course.title}</h1>
          
          {/* Elegant Unified Meta Tags */}
          <div className="course-meta-tags-row">
            <span className="meta-tag tag-source">🏛️ {course.source}</span>
            <span className="meta-tag tag-level">🎯 {course.level}</span>
            {course.type && <span className="meta-tag tag-type">⚡ {course.type}</span>}
            <span className="meta-tag tag-category">📁 {course.category}</span>
          </div>
        </div>

        {/* Course Description */}
        <div className="details-content-section">
          <h2>Overview & Scope</h2>
          <p className="description-text-block">{course.description}</p>
        </div>

        {/* Dynamic Skills Array Map Grid */}
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

        {/* Career Targets Maps */}
        {course.careerPaths && course.careerPaths.length > 0 && (
          <div className="details-content-section">
            <h2>Target Professional Paths</h2>
            <div className="careers-pill-box-flex">
              {course.careerPaths.map((path, index) => (
                <span key={index} className="pill-career-node">
                  💼 {path}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Execution Actions Footnotes Panel */}
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