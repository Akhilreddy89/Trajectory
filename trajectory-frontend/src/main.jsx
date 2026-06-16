import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'
import Bookmarks from './pages/Bookmarks.jsx'
import { AuthProvider } from './context/authContext.jsx'
import Profile from './pages/Profile.jsx'
import CourseDetails from './pages/CourseDetails.jsx'
import Roadmap from './pages/Roadmap.jsx'
import About from './pages/About.jsx'
import AppLayout from './pages/AppLayout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />

            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/course/:courseId" element={<CourseDetails />} />
            <Route path="/progress" element={<Dashboard />} />
            <Route path="/settings" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/roadmap" element={<Roadmap />} />

            </Route>

          </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
