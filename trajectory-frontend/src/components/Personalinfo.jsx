import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "../../services/profileService.js";
import { getRecommendations } from "../../services/recomendationServives.js";
import { getCompleteRoadmap, currentStage } from "../../services/roadmapServices.js";
import { getSavedCourses, getCompletedCourses } from "../../services/courseServices.js";
import "../style/personalinfo.css";

function Personalinfo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    fullName: "", college: "", branch: "", year: "",
    careerGoal: "", skills: [], interests: [], learningGoals: [],
    preferredLearningStyle: "video",
    preferredDifficultyLevel: "beginner",
    weeklyLearningHours: 5,
  });
  const [recommendations, setRecommendations] = useState([]);
  const [savedCourses, setSavedCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [roadmap, setRoadmap] = useState(null);
  const [progress, setProgress] = useState({
    percentage: 0, completedCount: 0, totalStages: 0, remaining: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [profileRes, recommendationsRes, roadmapRes, savedRes, completedRes] =
          await Promise.allSettled([
            getProfile(),
            getRecommendations(),
            getCompleteRoadmap(),
            getSavedCourses(),
            getCompletedCourses(),
          ]);

        // Profile
        if (profileRes.status === "fulfilled") {
          const p = profileRes.value;
          setProfile({
            fullName: p?.fullName || "",
            college: p?.college || "",
            branch: p?.branch || "",
            year: p?.year || "",
            careerGoal: p?.careerGoal || "",
            skills: p?.skills || [],
            interests: p?.interests || [],
            learningGoals: p?.learningGoals || [],
            preferredLearningStyle: p?.preferredLearningStyle || "video",
            preferredDifficultyLevel: p?.preferredDifficultyLevel || "beginner",
            weeklyLearningHours: p?.weeklyLearningHours || 5,
          });
        }

        // Recommendations
        if (recommendationsRes.status === "fulfilled") {
          setRecommendations(recommendationsRes.value?.data?.courses || []);
        }

        // Roadmap + Progress
        if (roadmapRes.status === "fulfilled") {
          const roadmapData = roadmapRes.value?.data;
          if (roadmapData) {
            const activeStage = currentStage(roadmapData);
            setRoadmap(activeStage);
            if (roadmapData.progress) {
              setProgress(roadmapData.progress);
            }
          }
        }

        // Saved Courses
        if (savedRes.status === "fulfilled") {
          setSavedCourses(savedRes.value?.data?.savedCourses || []);
        }

        // Completed Courses
        if (completedRes.status === "fulfilled") {
          const data = completedRes.value?.data || completedRes.value;
          const courses = data?.completedCourses || data?.courses || [];
          setCompletedCourses(courses);
          setCompletedCount(data?.count || courses.length);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading-view">
        <div className="dashboard-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <section className="personal-info">
      {/* Header */}
      <div className="dashboard-header">
        <div className="welcome-meta">
          <h1>Good Evening, {profile.fullName || "Learner"}</h1>
          <p>Continue your path toward becoming a <strong>{profile.careerGoal || "Tech Professional"}</strong>.</p>
        </div>
        <Link to="/roadmap">
          <button className="primary-btn">View Roadmap</button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-text-block">
            <h3>Weekly Commitment</h3>
            <span>{profile.weeklyLearningHours} hrs</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-text-block">
            <h3>Current Streak</h3>
            <span>0 Days</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-text-block">
            <h3>Completed Modules</h3>
            <span>{completedCount}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-text-block">
            <h3>Roadmap Progress</h3>
            <span>{progress.percentage}%</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid split-70-30">
        {/* Continue Learning */}
        <div className="card continue-learning">
          <div className="card-header">
            <h2>Continue Learning</h2>
            <button className="text-action-link" onClick={() => navigate("/roadmap")}>
              Resume Segment →
            </button>
          </div>
          <div className="learning-content">
            <div className="meta-info-row">
              <div className="meta-chunk">
                <p className="label">Current Target Track</p>
                <h3>{profile.careerGoal || "Not set"}</h3>
              </div>
              <div className="meta-chunk">
                <p className="label">Active Stage</p>
                <h4>{roadmap?.title || "Not Started"}</h4>
              </div>
            </div>
            <div className="progress-wrapper">
              <div className="progress-label-bar-group">
                <span className="progress-percentage-flag">
                  {progress.percentage}% Overall Completion
                </span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress.percentage}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="card recommendations">
          <div className="card-header">
            <h2>Recommended for You</h2>
            <button className="text-action-link" onClick={() => navigate("/courses")}>
              View All
            </button>
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
                <p>Complete your profile to get personalised course recommendations.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Grid */}
      <div className="dashboard-grid split-30-70">
        {/* Bookmarks */}
        <div className="card micro-metric-card">
          <h2>Bookmarked Items</h2>
          <div className="big-number-display">
            <span className="numerical-metric">{savedCourses.length}</span>
            <span className="metric-context-label">Courses Saved</span>
          </div>
        </div>

        {/* Activity Log */}
        <div className="card chronological-activity-log">
          <div className="card-header">
            <h2>Recent Activity</h2>
          </div>
          <ul className="activity-list">
            <li>
              <span className="activity-bullet green-node"></span>
              <p>Completed <strong>{completedCourses[0]?.courseId?.title || "no courses yet"}</strong></p>
            </li>
            <li>
              <span className="activity-bullet blue-node"></span>
              <p>Saved <strong>{savedCourses[0]?.courseId?.title || "no saved courses yet"}</strong></p>
            </li>
            <li>
              <span className="activity-bullet purple-node"></span>
              <p>Active stage: <strong>{roadmap?.title || "start your roadmap"}</strong></p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Personalinfo;