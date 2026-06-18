import React from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar_internal.jsx";
import "../style/AppLayout.css";

function AppLayout() {
  const { logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

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

    return "Workspace";
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="app-layout-wrapper">
      <Sidebar />

      <div className="main-content-layout">
        <Navbar />

        <div className="page-content-viewport">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;