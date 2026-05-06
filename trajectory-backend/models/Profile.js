import mongoose from "mongoose";
import User from "./User.js";
import Course from "./Course.js"; 
const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",          
      required: true,
      unique: true          
    },

    name: {
      type: String,
      required: true
    },
    college: String,
    branch: String,
    year: Number,

    skills: [
      {
        name: { type: String },
        level: {
          type: String,
          enum: ["beginner", "intermediate", "advanced"],
          default: "beginner"
        }
      }
    ],
    interests: [String],
    learningGoals: [String],

    preferredLearningStyle: {
      type: String,
      enum: ["video", "theory", "project"]
    },

    completedCourses: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course"   
        },
        progress: {
          type: Number,
          min: 0,
          max: 100
        }
      }
    ],
    roadmap: [
      {
        title: String,
        status: {
          type: String,
          enum: ["pending", "in-progress", "completed"],
          default: "pending"
        }
      }
    ]
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;