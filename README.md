Trajectory — Personalized Learning Roadmap Platform

Trajectory is a MERN stack platform that helps tech students figure out what to learn next. Instead of generic course lists, it builds role-based roadmaps (Frontend, Backend, Full Stack, AI Engineer, Data Analyst) and recommends courses and follow-up projects stage by stage, matched to a user's skills, interests, career goals, and learning style.


Status: Actively in development. Core auth, roadmap generation, and the course recommendation engine are functional. Current focus is tightening the link between courses and project follow-ups so each stage feels like a connected learning path rather than a sorted list of links. Not deployed yet — deployment comes after this logic is solid.



Why this project exists

Most students don't struggle to find courses — they struggle to find the right next step. Trajectory tries to solve:


Information overload from too many course options
Unstructured, non-sequential learning
Lack of personalized guidance based on actual skill level
Difficulty knowing what to build after finishing a course


Features

Authentication


User registration & login
JWT-based authentication
Protected routes and secure sessions


Personalized Profiles

Users configure:


Career goal
Current skills
Interests
Preferred learning style
Preferred difficulty level


Dynamic Roadmap Generation

Role-based roadmaps for Frontend Developer, Backend Developer, Full Stack Developer, AI Engineer, and Data Analyst. Each roadmap includes learning stages, required skills, suggested projects, and estimated duration.

Recommendation Engine

A custom scoring system that ranks courses per stage based on:


Skill match
Career path match
Interest match
Learning style match
Difficulty match


Courses are pulled from Coursera, Udemy, freeCodeCamp, YouTube, and edX, with bookmarking and skill tagging.

Course → Project Follow-Up (in progress)

The current build phase: tying project suggestions to the specific skills a user just gained from a completed course, not just to the broader roadmap stage — so a finished course leads to a concrete, relevant project rather than a generic "next stage" link.

Tech Stack

Frontend: React.js, Tailwind CSS, Axios, React Router DOM
Backend: Node.js, Express.js, JWT Authentication
Database: MongoDB, Mongoose

Project Structure

Trajectory
├── trajectory-frontend
│   ├── Authentication
│   ├── Dashboard
│   ├── Roadmap Pages
│   ├── Course Recommendations
│   └── Notes & Progress UI
│
├── trajectory-backend
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

Recommendation Engine Flow

User Profile → Career Goal → Fetch Roadmap → Loop Through Stages
→ Recommendation Engine → Recommended Courses → Course-Linked Project
→ Frontend Rendering

Getting Started

1. Clone the repository

bashgit clone https://github.com/Akhilreddy89/Trajectory.git

2. Install dependencies

Frontend

bashcd trajectory-frontend
npm install

Backend

bashcd trajectory-backend
npm install

3. Configure environment variables

Create a .env file inside trajectory-backend:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

4. Run the app

Backend

bashnpm run dev

Frontend

bashnpm run dev

5. Seed the database

bashnode seedRoadmaps.js
node seedCourses.js

Roadmap (Project, not user-facing)


 Authentication system
 Role-based roadmap generation
 Course recommendation scoring engine
 Course-to-project follow-up logic
 Progress tracking & consistency heatmap
 Notes system
 AI chatbot mentor
 Resume builder
 Deployment (frontend + backend + DB)


Author

Manda Akhil Reddy
B.Tech Information Technology

License

Developed for educational and research purposes.
