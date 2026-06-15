import mongoose from "mongoose";
import dotenv from "dotenv";

import Roadmap from "./models/Roadmap.js";

dotenv.config();


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const roadmapData = [

  {
    role: "Frontend Developer",
    category: "Frontend",
    level: "Beginner",

    description:
      "Frontend roadmap for beginners",

    estimatedDuration: "4 Months",

    skillsRequired: [
      "HTML",
      "CSS",
      "JavaScript",
    ],

    roadmapImage: "",

    stages: [

      {
        title: "HTML Basics",

        description:
          "Learn structure of websites",

        skills: [
          "HTML",
          "Semantic HTML",
          "Forms",
        ],

        projects: [
          "Portfolio Website",
        ],

        estimatedTime: "1 Week",

        order: 1,
      },

      {
        title: "CSS Fundamentals",

        description:
          "Learn styling and layouts",

        skills: [
          "CSS",
          "Flexbox",
          "Grid",
          "Responsive Design",
        ],

        projects: [
          "Responsive Landing Page",
        ],

        estimatedTime: "2 Weeks",

        order: 2,
      },

      {
        title: "JavaScript Basics",

        description:
          "Learn frontend programming",

        skills: [
          "JavaScript",
          "DOM",
          "Arrays",
          "Functions",
        ],

        projects: [
          "Todo App",
        ],

        estimatedTime: "3 Weeks",

        order: 3,
      },

      {
        title: "React.js",

        description:
          "Build modern UI applications",

        skills: [
          "React",
          "Hooks",
          "State Management",
        ],

        projects: [
          "Dashboard UI",
        ],

        estimatedTime: "4 Weeks",

        order: 4,
      },
    ],
  },



  {
    role: "Backend Developer",

    category: "Backend",

    level: "Beginner",

    description:
      "Backend roadmap for beginners",

    estimatedDuration: "5 Months",

    skillsRequired: [
      "Java",
      "SQL",
      "Node.js",
    ],

    roadmapImage: "",

    stages: [

      {
        title: "Programming Basics",

        description:
          "Learn programming concepts",

        skills: [
          "Variables",
          "Loops",
          "Functions",
          "OOP",
        ],

        projects: [
          "Student Management System",
        ],

        estimatedTime: "2 Weeks",

        order: 1,
      },

      {
        title: "Databases",

        description:
          "Learn relational databases",

        skills: [
          "SQL",
          "Joins",
          "Indexes",
        ],

        projects: [
          "Library Database",
        ],

        estimatedTime: "2 Weeks",

        order: 2,
      },

      {
        title: "Backend APIs",

        description:
          "Build backend APIs",

        skills: [
          "Node.js",
          "Express.js",
          "REST API",
        ],

        projects: [
          "Task API",
        ],

        estimatedTime: "3 Weeks",

        order: 3,
      },

      {
        title: "Authentication",

        description:
          "Secure backend systems",

        skills: [
          "JWT",
          "Authentication",
          "Authorization",
        ],

        projects: [
          "Login System",
        ],

        estimatedTime: "1 Week",

        order: 4,
      },
    ],
  },



  {
    role: "Full Stack Developer",

    category: "Full Stack",

    level: "Beginner",

    description:
      "Complete full stack roadmap",

    estimatedDuration: "6 Months",

    skillsRequired: [
      "Frontend",
      "Backend",
      "Database",
    ],

    roadmapImage: "",

    stages: [

      {
        title: "Frontend Basics",

        description:
          "Learn frontend technologies",

        skills: [
          "HTML",
          "CSS",
          "JavaScript",
        ],

        projects: [
          "Portfolio Website",
        ],

        estimatedTime: "1 Month",

        order: 1,
      },

      {
        title: "React Frontend",

        description:
          "Build frontend apps",

        skills: [
          "React",
          "Hooks",
          "Routing",
        ],

        projects: [
          "Movie App",
        ],

        estimatedTime: "1 Month",

        order: 2,
      },

      {
        title: "Backend Development",

        description:
          "Create APIs and backend systems",

        skills: [
          "Node.js",
          "Express",
          "MongoDB",
        ],

        projects: [
          "Blog Backend",
        ],

        estimatedTime: "1 Month",

        order: 3,
      },

      {
        title: "Deployment",

        description:
          "Deploy applications",

        skills: [
          "Vercel",
          "Render",
          "Environment Variables",
        ],

        projects: [
          "Deploy Full Stack App",
        ],

        estimatedTime: "1 Week",

        order: 4,
      },
    ],
  },



  {
    role: "AI Engineer",

    category: "AI/ML",

    level: "Beginner",

    description:
      "AI Engineer roadmap for beginners",

    estimatedDuration: "7 Months",

    skillsRequired: [
      "Python",
      "Machine Learning",
      "Deep Learning",
    ],

    roadmapImage: "",

    stages: [

      {
        title: "Python Basics",

        description:
          "Learn Python programming",

        skills: [
          "Python",
          "Functions",
          "OOP",
        ],

        projects: [
          "CLI Calculator",
        ],

        estimatedTime: "2 Weeks",

        order: 1,
      },

      {
        title: "Data Analysis",

        description:
          "Learn data handling",

        skills: [
          "NumPy",
          "Pandas",
          "Matplotlib",
        ],

        projects: [
          "Data Visualization",
        ],

        estimatedTime: "3 Weeks",

        order: 2,
      },

      {
        title: "Machine Learning",

        description:
          "Learn ML fundamentals",

        skills: [
          "Regression",
          "Classification",
          "Scikit-Learn",
        ],

        projects: [
          "Prediction Model",
        ],

        estimatedTime: "1 Month",

        order: 3,
      },

      {
        title: "Deep Learning",

        description:
          "Build neural networks",

        skills: [
          "TensorFlow",
          "Neural Networks",
          "CNN",
        ],

        projects: [
          "Image Classifier",
        ],

        estimatedTime: "1 Month",

        order: 4,
      },
    ],
  },



  {
    role: "Data Analyst",

    category: "Data Science",

    level: "Beginner",

    description:
      "Data Analyst roadmap for beginners",

    estimatedDuration: "5 Months",

    skillsRequired: [
      "Excel",
      "SQL",
      "Python",
    ],

    roadmapImage: "",

    stages: [

      {
        title: "Excel Basics",

        description:
          "Learn spreadsheets and formulas",

        skills: [
          "Excel",
          "Charts",
          "Pivot Tables",
        ],

        projects: [
          "Sales Dashboard",
        ],

        estimatedTime: "2 Weeks",

        order: 1,
      },

      {
        title: "SQL for Analysis",

        description:
          "Analyze data using SQL",

        skills: [
          "SQL",
          "Aggregation",
          "Joins",
        ],

        projects: [
          "Customer Analysis",
        ],

        estimatedTime: "3 Weeks",

        order: 2,
      },

      {
        title: "Python for Data Analysis",

        description:
          "Analyze datasets using Python",

        skills: [
          "Pandas",
          "NumPy",
          "Data Cleaning",
        ],

        projects: [
          "Netflix Dataset Analysis",
        ],

        estimatedTime: "1 Month",

        order: 3,
      },

      {
        title: "Visualization Tools",

        description:
          "Create dashboards and charts",

        skills: [
          "Power BI",
          "Tableau",
          "Visualization",
        ],

        projects: [
          "Business Dashboard",
        ],

        estimatedTime: "2 Weeks",

        order: 4,
      },
    ],
  },

];


// ============================================
// SEED FUNCTION
// ============================================

const seedRoadmaps = async () => {

  try {

    await Roadmap.deleteMany();

    await Roadmap.insertMany(
      roadmapData
    );

    console.log(
      "Roadmaps Seeded Successfully"
    );

    process.exit();

  } catch (err) {

    console.log(err);

    process.exit(1);

  }
};

seedRoadmaps();