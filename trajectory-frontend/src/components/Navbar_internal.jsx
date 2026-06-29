import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../style/Navbar_internal.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loading, isAuthenticated } = useAuth();

  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    if (query.trim().length < 1) return;

    const timer = setTimeout(() => {
      navigate(`/courses?q=${encodeURIComponent(query.trim())}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/courses?q=${encodeURIComponent(query.trim())}`);
    }
    if (e.key === "Escape") {
      setQuery("");
      navigate("/courses");
    }
  };

  const handleClear = () => {
    setQuery("");
    navigate("/courses");
  };

  const getPageTitle = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("/dashboard")) return "Dashboard";
    if (path.includes("/roadmap")) return "My Roadmap";
    if (path.includes("/courses")) return "Explore Courses";
    if (path.includes("/bookmarks")) return "My Workspace";
    if (path.includes("/progress")) return "My Progress";
    if (path.includes("/settings")) return "Settings";
    if (path.includes("/profile")) return "Profile Setup";
    if (path.includes("/course/")) return "Course Details";
    return "Trajectory";
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="page-title">{getPageTitle()}</h1>
      </div>

      <div className="navbar-right">
        {!loading && isAuthenticated && (
          <>
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search courses..."
              />
              {query && (
                <span className="search-clear" onClick={handleClear}>
                  ✕
                </span>
              )}
            </div>

            <button className="icon-btn" title="Notifications">
              🔔
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;