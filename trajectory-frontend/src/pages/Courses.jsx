import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Recommendations from "./Recommendations";
import { searchCourses } from "../../services/courseServices.js";
import CourseCard from "../components/CourseCard.jsx";
import "../style/courses.css";

function Courses() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await searchCourses(query);
        setResults(data.courses || []);
      } catch (err) {
        setError("Search failed. Please try again.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]); 

  return (
    <div className="courses-page">
      <div className="courses-topbar">
        <div>
          {query ? (
            <>
              <h1>Results for "{query}"</h1>
              <p>
                {loading
                  ? "Searching..."
                  : `${results.length} course${results.length !== 1 ? "s" : ""} found`}
              </p>
            </>
          ) : (
            <>
              <h1>Courses</h1>
              <p>Browse and discover courses across 16+ platforms.</p>
            </>
          )}
        </div>
      </div>

      {query ? (
        loading ? (
          <div className="recommendations-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="course-card-skeleton" />
            ))}
          </div>
        ) : error ? (
          <div className="recommendations-empty">
            <p> {error}</p>
          </div>
        ) : results.length === 0 ? (
          
          <div className="recommendations-empty">
            <p>No courses found for "{query}".</p>
            <p>Try a different keyword or browse recommendations below.</p>
          </div>
        ) : (
       
          <div className="recommendations-grid">
            {results.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )
      ) : (
        <Recommendations />
      )}
    </div>
  );
}

export default Courses;