import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Roadmap from "./models/Roadmap.js";

dotenv.config();

connectDB();

const roadmapData = [
  {
    role: "Frontend Developer",
    category: "Frontend",
    level: "Beginner",

    description: "Frontend roadmap for beginners",

    estimatedDuration: "4 Months",

    skillsRequired: [
      "HTML",
      "CSS",
      "JavaScript"
    ],

    stages: [
      {
        title: "HTML Basics",

        description: "Learn structure of websites",

        skills: [
          "Tags",
          "Forms",
          "Semantic HTML"
        ],

        projects: [
          "Portfolio Website"
        ],

        estimatedTime: "1 Week",

        order: 1,

        courses: [
          {
            title: "HTML Full Course",

            platform: "freeCodeCamp",

            url: "https://www.youtube.com/watch?v=pQN-pnXPaVg",

            level: "Beginner",

            priceType: "Free",

            courseType: "Video"
          }
        ]
      }
    ]
  },

  {
    role: "Backend Developer",
    category: "Backend",
    level: "Beginner",

    description: "Backend roadmap for beginners",

    estimatedDuration: "5 Months",

    skillsRequired: [
      "Java",
      "SQL"
    ],

    stages: [
      {
        title: "Java Basics",

        description: "Learn Java fundamentals",

        skills: [
          "Loops",
          "Functions",
          "OOP"
        ],

        projects: [
          "Student Management System"
        ],

        estimatedTime: "2 Weeks",

        order: 1,

        courses: [
          {
            title: "Java Programming",

            platform: "YouTube",

            url: "https://youtube.com",

            level: "Beginner",

            priceType: "Free",

            courseType: "Video"
          }
        ]
      }
    ]
  }
];

const seedRoadmaps = async () => {
  try {
    await Roadmap.deleteMany();

    await Roadmap.insertMany(roadmapData);

    console.log("Roadmaps Seeded");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedRoadmaps();