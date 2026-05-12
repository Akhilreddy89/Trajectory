import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    fullName: {
      type: String,
      required: true,
      trim: true
    },

    college: {
      type: String,
      trim: true
    },

    branch: {
      type: String,
      trim: true
    },

    year: {
      type: Number,
      min: 1,
      max: 5
    },

    careerGoal: {
      type: String,
      required: true,
      trim: true
    },

    skills: {
      type: [
        {
          name: {
            type: String,
            required: true,
            trim: true
          },

          level: {
            type: String,
            enum: ["beginner", "intermediate", "advanced"],
            default: "beginner"
          }
        }
      ],
      default: []
    },

    interests: {
      type: [String],
      default: []
    },

    learningGoals: {
      type: [String],
      default: []
    },

    preferredLearningStyle: {
      type: String,
      enum: ["video", "theory", "project", "mixed"],
      required: true
    },

    preferredDifficultyLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true
    },

    weeklyLearningHours: {
      type: Number,
      min: 1,
      default: 5
    },
    enrolledCourses: [
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    },

    progress: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: [
        "saved",
        "ongoing",
        "completed"
      ],
      default: "saved"
    },

    savedAt: {
      type: Date,
      default: Date.now
    }
  }
],
    

    roadmap: {
      type: [
        {
          title: {
            type: String,
            required: true
          },
          status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending"
          }
        }
      ],
      default: []
    }
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;