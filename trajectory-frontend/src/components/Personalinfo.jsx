import "../style/personalinfo.css";
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
//fe
import { getProfile,getCompletedCourses} from "../../services/profileService.js";
import { getRecommendations } from "../../services/recomendationServives.js";

function Personalinfo() {
    const [count, setCount] = useState(0);
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
      fetchProfile();
    }, []);

    useEffect(() => {
        fetchCompletedCourses();
    }, []);
    useEffect(() => {
        fetchRecommendations();
    }, []); 
    
    const fetchRecommendations = async () => {
        try {
            const res = await getRecommendations();
            setRecommendations(res.data.courses);
        }
        catch (err) {
            console.error("Error fetching recommendations:", err);
        }
    };
    const fetchCompletedCourses = async () => {
        try {
            const res = await getCompletedCourses();
            setCount(res.count);
            console.log("Completed Courses Count:", res);
        } catch (err) {
            console.error("Error fetching completed courses:", err);
        }
    };
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        const p = res;
  
        if (p) {
          setProfile({
            fullName: p.fullName || "",
            college: p.college || "",
            branch: p.branch || "",
            year: p.year || "",
  
            careerGoal: p.careerGoal || "",
  
            skills: p.skills || [],
  
            interests: p.interests || [],
  
            learningGoals: p.learningGoals || [],
  
            preferredLearningStyle:
              p.preferredLearningStyle || "video",
  
            preferredDifficultyLevel:
              p.preferredDifficultyLevel || "beginner",
  
            weeklyLearningHours:
              p.weeklyLearningHours || 5,
          });
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
  return (
    <section className="personal-info">

      {/* Header */}

      <div className="dashboard-header">

        <div>
          <h1>Good Evening, {profile.fullName} 👋</h1>

          <p>
            Continue your {profile.careerGoal} journey.
          </p>
        </div>
        <Link to="/roadmap">
          <button className="primary-btn">
            View Roadmap
          </button>
        </Link>
      </div>

      {/* Stats */}

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Learning Hours</h3>

          <span>{profile.weeklyLearningHours}</span>

          {/* TODO:
             Sum completed course hours
          */}
        </div>

        <div className="stat-card">
          <h3>Current Streak</h3>

          <span>12 Days</span>

          {/* TODO:
             Calculate consecutive activity days
          */}
        </div>

        <div className="stat-card">
          <h3>Completed Courses</h3>

          <span>{count}</span>

          {/* TODO:
             Count completed courses
          */}
        </div>

        <div className="stat-card">
          <h3>Roadmap Progress</h3>

          <span>42%</span>

        </div>

      </div>


      <div className="dashboard-grid">

        {/* Continue Learning */}

        <div className="card continue-learning">

          <div className="card-header">
            <h2>Continue Learning</h2>

            <button>Resume</button>
          </div>

          <div className="learning-content">

            <p className="label">
              Current Roadmap
            </p>

            <h3>Backend Developer</h3>

            <p className="label">
              Current Stage
            </p>

            <h4>REST APIs</h4>

            <div className="progress-wrapper">

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "42%" }}
                />
              </div>

              <span>42%</span>

              {/* TODO:
                 roadmap progress percentage
              */}

            </div>

          </div>

        </div>

        {/* Recommended Courses */}

        <div className="card recommendations">

          <div className="card-header">
            <h2>Recommended Courses</h2>

            <button>View All</button>
          </div>

          <div className="course-list">

            <div className="course-item">
                {recommendations.length > 0 ? (
                    recommendations.map((course, index) => (
                        <div key={index}>
                            <h4>{course.title}</h4>
                            <p>{course.source} • {course.level}</p>
                        </div>
                    )).slice(0, 3) // Display only the first 3 recommendations
                ) : (
                    <p>No recommendations available.</p>
                )}

            </div>
            </div>

      </div>

      {/* Bottom Grid */}

      <div className="dashboard-grid">

        {/* Saved Courses */}

        <div className="card">

          <h2>Saved Courses</h2>

          <p className="big-number">18</p>

          {/* TODO:
             Count bookmarked courses
          */}

        </div>

        {/* Recent Activity */}

        <div className="card">

          <h2>Recent Activity</h2>

          <ul className="activity-list">

            <li>Completed HTML Basics</li>

            <li>Saved React Course</li>

            <li>Started REST APIs</li>

          </ul>

          {/* TODO:
             Fetch user activities
          */}

        </div>

      </div>
        </div>
    </section>
  );
}

export default Personalinfo;