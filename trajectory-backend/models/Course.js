import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      default: "",
    },

    careerPaths: {
      type: [String],
      default: [],
    },

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

    duration: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4,
    },

    instructor: {
      type: String,
      default: "",
    },

    thumbnail: {
      type: String,
      default: "",
    },

    enrolledCount: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);
courseSchema.index({ skills: 1 });
courseSchema.index({ category: 1 });
courseSchema.index({ careerPaths: 1 });
const Course = mongoose.model("Course", courseSchema);

export default Course;