import React from "react";
import { useLocation } from "react-router-dom";
import "../style/Navbar.css";

function Navbars() {
  const location = useLocation();

  // Helper function to map pathnames to clean dashboard page titles
  const getPageTitle = () => {
    const path = location.pathname.toLowerCase();
    
    if (path.includes("/dashboard")) return "Dashboard";
    if (path.includes("/roadmap")) return "My Roadmap";
    if (path.includes("/courses")) return "Explore Courses";
    if (path.includes("/bookmarks")) return "My Workspace";
    if(path.includes("/progress")) return "My Progress";
    if (path.includes("/settings")) return "Settings";
    if (path.includes("/profile")) return "Profile Setup";
    if (path.includes("/course/")) return "Course Details";
    
    return "Trajectory"; // Fallback name
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        {/* Title now dynamically updates based on route context */}
        <h1 className="page-title">{getPageTitle()}</h1>
      </div>

      <div className="navbar-right">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search courses..."
          />
        </div>

        <button className="icon-btn" title="Notifications">
          🔔
        </button>
      </div>
    </header>
  );
}

export default Navbars;