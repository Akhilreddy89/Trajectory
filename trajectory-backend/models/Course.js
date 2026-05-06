import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    source: {
      type: String,
      required: true, 
    },

    url: {
      type: String,
      required: true,
    },

    skills: [String], 

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },

    type: {
      type: String,
      enum: ["video", "theory", "project"],
      required: true,
    },

    duration: String, 

    rating: {
      type: Number,
      min: 0,
      max: 5,
    },

    instructor: String,
    category: String, 

    thumbnail: String,
    enrolledCount: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;