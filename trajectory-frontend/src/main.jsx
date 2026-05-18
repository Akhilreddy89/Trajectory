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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/app" element={<ProtectedRoute><App /></ProtectedRoute>} />
        <Route path="/course/:courseId" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
