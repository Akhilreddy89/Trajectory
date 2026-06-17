import React from "react";
import Recommendations from "./Recommendations";
import "../style/courses.css";

function Courses() {
  return (
    <div className="courses-page">
      <div className="courses-topbar">
        <div>
          <h1>Courses</h1>
          <p>Browse and discover courses across 16+ platforms.</p>
        </div>
      </div>

      <Recommendations />
    </div>
  );
}

export default Courses;