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
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<ProtectedRoute><App /></ProtectedRoute>} />
        <Route element={<AppLayout />}>
        <Route path="/course/:courseId" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        /* change these to actual pages when they are created */
        <Route path="/progress" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
        <Route path="/roadmap" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
