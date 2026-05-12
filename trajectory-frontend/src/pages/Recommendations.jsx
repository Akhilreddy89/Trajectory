import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import "../style/recommendation.css";

function Recommendations() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/recommendations",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setCourses(res.data.courses);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!courses.length) return <div className="recommendations-empty"><p>No recommendations available.</p></div>;

  return (
    <div className="recommendations-page">
      <div className="recommendations-header">
        <h2>Recommended Courses</h2>
        <p>Explore tailored learning paths and discover courses that match your current goals.</p>
      </div>

      <div className="recommendations-grid">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default Recommendations;