import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import "../style/recommendation.css";
import { getRecommendations } from "../../services/recomendationServives.js";

const CATEGORIES = ["All", "Frontend", "Backend", "Full Stack", "AI/ML", "Data Science", "Cybersecurity", "Cloud", "DevOps", "Mobile Development"];

function Recommendations() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getRecommendations();
        setCourses(res.data.courses);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  if (loading) {
    return (
      <div className="recommendations-page">
        <div className="recommendations-header">
          <h2>Recommended Courses</h2>
          <p>Explore tailored learning paths and discover courses that match your current goals.</p>
        </div>
        <div className="recommendations-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="course-card-skeleton" />
          ))}
        </div>
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div className="recommendations-page">
        <div className="recommendations-empty">
          <p>No recommendations available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-page">
      <div className="recommendations-header">
        <h2>Recommended Courses</h2>
        <p>Explore tailored learning paths and discover courses that match your current goals.</p>
      </div>

      <div className="recommendations-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-pill ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredCourses.length ? (
        <div className="recommendations-grid">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="recommendations-empty">
          <p>No courses found in this category.</p>
        </div>
      )}
    </div>
  );
}

export default Recommendations;