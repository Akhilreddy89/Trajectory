import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import "./index.css";

import { AuthProvider } from "./context/AuthContext.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import About from "./pages/About.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Bookmarks from "./pages/Bookmarks.jsx";
import Profile from "./pages/Profile.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import Roadmap from "./pages/Roadmap.jsx";
import Courses from "./pages/Courses.jsx";

import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import PublicRoute from "./pages/PublicRoute.jsx";
import Settings from "./pages/Settings.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
          </Route>
          {/* Protected Routes */}

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/course/:courseId"
                element={<CourseDetails />}
              />

              <Route
                path="/progress"
                element={<Dashboard />}
              />

              <Route
                path="/settings"
                element={<Settings />}
              />

              <Route
                path="/profile"
                element={<Profile />}
              />

              <Route
                path="/bookmarks"
                element={<Bookmarks />}
              />

              <Route
                path="/roadmap"
                element={<Roadmap />}
              />

              <Route
                path="/courses"
                element={<Courses />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);