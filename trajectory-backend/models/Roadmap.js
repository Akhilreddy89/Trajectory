// models/Roadmap.js

import mongoose from "mongoose";


const stageSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  skills: [String],

  projects: [String],

  estimatedTime: {
    type: String,
    default: "",
  },

  order: {
    type: Number,
    required: true,
  },

});


const roadmapSchema = new mongoose.Schema(

  {
    role: {
      type: String,
      required: true,
    },

    category: {
      type: String,

      enum: [
        "Frontend",
        "Backend",
        "Full Stack",
        "AI/ML",
        "Data Science",
        "Cybersecurity",
        "Cloud",
        "DevOps",
        "Mobile Development",
      ],

      required: true,
    },

    level: {
      type: String,

      enum: [
        "Beginner",
        "Intermediate",
        "Advanced",
      ],

      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    estimatedDuration: {
      type: String,
      default: "",
    },

    skillsRequired: [String],

    roadmapImage: {
      type: String,
      default: "",
    },

    stages: [stageSchema],
  },

  {
    timestamps: true,
  }

);

const Roadmap = mongoose.model(
  "Roadmap",
  roadmapSchema
);

export default Roadmap;