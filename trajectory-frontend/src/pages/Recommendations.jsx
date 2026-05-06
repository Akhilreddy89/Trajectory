import React, { useEffect, useState } from "react";
import axios from "axios";

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

        setCourses(res.data.courses); // 🔥 important
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!courses.length) return <p>No recommendations available</p>;

  return (
    <div>
      <h2>Recommended Courses</h2>

      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <h4>{course.title}</h4>
            <p>{course.source}</p>
            <img src={course.thumbnail} alt={course.title} width="200" />
            <br />
            <a href={course.url} target="_blank">Go to Course</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;