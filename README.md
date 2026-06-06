Trajectory – AI-Powered Personalized Learning Platform
 Overview

Trajectory is an AI-powered personalized learning platform designed for tech students to discover structured roadmaps, recommended courses, and project-based learning paths based on their skills, interests, and career goals.

The platform dynamically generates personalized learning experiences using:

Roadmap generation
Recommendation engine
Skill-based course matching
Career-oriented learning paths
Progress tracking concepts
AI-ready architecture

 Features
  Authentication System
  User Registration & Login
  JWT Authentication
  Protected Routes
  Secure User Sessions
  Personalized User Profiles

Users can configure:

Career Goals
Skills
Interests
Preferred Learning Style
Preferred Difficulty Level
Dynamic Roadmap Generation

Trajectory generates role-based roadmaps for:

Frontend Developer
Backend Developer
Full Stack Developer
AI Engineer
Data Analyst

Each roadmap contains:

Learning stages
Required skills
Projects
Estimated learning duration
AI-Based Recommendation Engine

Custom recommendation system that suggests courses based on:

User skills
Career goals
Interests
Learning preferences
Difficulty preference
Stage-Wise Course Recommendations

Every roadmap stage dynamically fetches:

2–3 recommended courses
From multiple learning platforms

Supported platforms include:

Coursera
Udemy
freeCodeCamp
YouTube
edX
Course Features
Save/Bookmark Courses
Skill Tags
Platform Information
Course Categorization
Personalized Recommendations
Smart Recommendation Logic

The recommendation engine uses:

Skill matching
Career path matching
Interest matching
Learning style matching
Difficulty matching
Score-based ranking system
Future Enhancements
AI Chatbot Mentor
Progress Tracking
Consistency Heatmap
Notes System
Gamification
Internship Recommendations
Resume Builder
AI-generated Notes & Summaries


Tech Stack
  Frontend
  React.js
  Tailwind CSS
  Axios
  React Router DOM
  Backend
  Node.js
  Express.js
  JWT Authentication
  Database
  MongoDB
  Mongoose

  
Project Architecture
Trajectory
│
├── Frontend
│   ├── Authentication
│   ├── Dashboard
│   ├── Roadmap Pages
│   ├── Course Recommendations
│   └── Notes & Progress UI
│
├── Backend
│   ├── Auth APIs
│   ├── Profile APIs
│   ├── Roadmap APIs
│   ├── Recommendation Engine
│   └── Course APIs
│
└── Database
    ├── Users
    ├── Profiles
    ├── Courses
    └── Roadmaps
    
Installation & Setup
1️⃣ Clone Repository
git clone <your-repo-url>
2️⃣ Install Dependencies
Frontend
cd frontend
npm install
Backend
cd backend
npm install
3️⃣ Configure Environment Variables

Create .env inside backend:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
4️⃣ Run Backend
npm run dev
5️⃣ Run Frontend
npm run dev


Seed Database

To seed roadmap data:

node seedRoadmaps.js

To seed courses:

node seedCourses.js
🧠 Recommendation Engine Flow
User Profile
     ↓
Career Goal
     ↓
Fetch Roadmap
     ↓
Loop Through Stages
     ↓
Recommendation Engine
     ↓
Recommended Courses
     ↓
Frontend Rendering
📸 Screenshots
Login Page
Modern authentication UI
Responsive layout
Frontend validation
Roadmap Page
Dynamic roadmap rendering
Stage-wise recommendations
Personalized learning path
🎯 Project Goal

Trajectory aims to solve the problem of:

Information overload
Unstructured learning
Lack of personalized guidance
Difficulty choosing the right courses

by providing:

structured, personalized, AI-driven learning journeys for tech students.

👨‍💻 Author

Manda Akhil Reddy
B.Tech Information Technology Student

📄 License

This project is developed for educational and research purposes.
