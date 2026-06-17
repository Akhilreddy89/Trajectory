import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, getCompletedCourses } from "../../services/profileService.js";
import { getRecommendations } from "../../services/recomendationServives.js";
import "../style/personalinfo.css";

function Personalinfo() {
  const navigate = useNavigate();
  const [completedCount, setCompletedCount] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [profile, setProfile] = useState({
    fullName: "",
    college: "",
    branch: "",
    year: "",
    careerGoal: "",
    skills: [],
    interests: [],
    learningGoals: [],
    preferredLearningStyle: "video",
    preferredDifficultyLevel: "beginner",
    weeklyLearningHours: 5,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Execute fetches concurrently
        const [profileRes, completedRes, recommendationsRes] = await Promise.allSettled([
          getProfile(),
          getCompletedCourses(),
          getRecommendations()
        ]);

        if (profileRes.status === "fulfilled" && profileRes.value) {
          const p = profileRes.value;
          setProfile({
            fullName: p.fullName || "",
            college: p.college || "",
            branch: p.branch || "",
            year: p.year || "",
            careerGoal: p.careerGoal || "",
            skills: p.skills || [],
            interests: p.interests || [],
            learningGoals: p.learningGoals || [],
            preferredLearningStyle: p.preferredLearningStyle || "video",
            preferredDifficultyLevel: p.preferredDifficultyLevel || "beginner",
            weeklyLearningHours: p.weeklyLearningHours || 5,
          });
        } else if (profileRes.status === "rejected") {
          console.error("Profile fetch failed:", profileRes.reason);
        }

        if (completedRes.status === "fulfilled" && completedRes.value) {
          setCompletedCount(completedRes.value.count || 0);
        }

        if (recommendationsRes.status === "fulfilled" && recommendationsRes.value?.data) {
          setRecommendations(recommendationsRes.value.data.courses || []);
        }

        setLoading(false);
      } catch (err) {
        console.error("Dashboard data fetching anomaly:", err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading-view">
        <div className="dashboard-spinner"></div>
        <p>Assembling your personalized learning metric matrix...</p>
      </div>
    );
  }

  return (
    <section className="personal-info">
      {/* Upper Action Header */}
      <div className="dashboard-header">
        <div className="welcome-meta">
          <h1>Good Evening, {profile.fullName || "Learner"} 👋</h1>
          <p>Continue your global path toward becoming a premier <strong>{profile.careerGoal || "Tech Professional"}</strong>.</p>
        </div>
        <Link to="/roadmap">
          <button className="primary-btn">
            View Roadmap
          </button>
        </Link>
      </div>

      {/* Grid Row Metrics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper blue-tint">⏱️</div>
          <div className="stat-text-block">
            <h3>Weekly Commitment</h3>
            <span>{profile.weeklyLearningHours} hrs</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper orange-tint">🔥</div>
          <div className="stat-text-block">
            <h3>Current Streak</h3>
            <span>0 Days</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper green-tint">🎉</div>
          <div className="stat-text-block">
            <h3>Completed Modules</h3>
            <span>{completedCount}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper purple-tint">🎯</div>
          <div className="stat-text-block">
            <h3>Roadmap Progress</h3>
            <span>42%</span>
          </div>
        </div>
      </div>

      {/* Primary Split Workspace */}
      <div className="dashboard-grid split-70-30">
        {/* Core Learning Module Tracking */}
        <div className="card continue-learning">
          <div className="card-header">
            <h2>Continue Learning</h2>
            <button className="text-action-link" onClick={() => navigate("/roadmap")}>Resume Segment →</button>
          </div>

          <div className="learning-content">
            <div className="meta-info-row">
              <div className="meta-chunk">
                <p className="label">Current Target Track</p>
                <h3>{profile.careerGoal || "Full Stack Architecture"}</h3>
              </div>
              <div className="meta-chunk">
                <p className="label">Active Block Stage</p>
                <h4>REST APIs Development</h4>
              </div>
            </div>

            <div className="progress-wrapper">
              <div className="progress-label-bar-group">
                <span className="progress-percentage-flag">42% Overall Track Completion</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "42%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Recommended Modules Block */}
        <div className="card recommendations">
          <div className="card-header">
            <h2>Recommended for You</h2>
            <button className="text-action-link" onClick={() => navigate("/courses")}>View All</button>
          </div>

          <div className="course-list">
            {recommendations.length > 0 ? (
              recommendations.slice(0, 3).map((course, index) => (
                <div key={course._id || index} className="course-item">
                  <h4>{course.title}</h4>
                  <p>{course.source} • <span className="difficulty-tag">{course.level}</span></p>
                </div>
              ))
            ) : (
              <div className="empty-recommendations-state">
                <p>No optimization matches found. Add core profile skill tags to refresh recommendations.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Structural Lower Grid Split */}
      <div className="dashboard-grid split-30-70">
        {/* Quick Insights Counts */}
        <div className="card micro-metric-card">
          <h2>Bookmarked Items</h2>
          <div className="big-number-display">
            <span className="numerical-metric">18</span>
            <span className="metric-context-label">Courses Saved</span>
          </div>
        </div>

        {/* General Auditing Feeds */}
        <div className="card chronological-activity-log">
          <div className="card-header">
            <h2>Recent System Activity</h2>
          </div>
          <ul className="activity-list">
            <li>
              <span className="activity-bullet green-node"></span>
              <p>Successfully completed <strong>HTML Structural Semantics</strong> module</p>
            </li>
            <li>
              <span className="activity-bullet blue-node"></span>
              <p>Added <strong>React Custom Hooks Engine Architecture</strong> to saved items</p>
            </li>
            <li>
              <span className="activity-bullet purple-node"></span>
              <p>Initiated learning branch for <strong>REST APIs Secure Routing</strong></p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Personalinfo;