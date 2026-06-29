import Course from "../models/Course.js";
import Profile from "../models/Profile.js";
import mongoose from "mongoose";
//UPdated Entire recommendation with new learning style also 

const normalizeArray = (arr) => arr.map((item) => item.toLowerCase());

const getUniqueMatchedSkills = (courseSkills, userSkills) =>
  [...new Set(courseSkills)].filter((skill) => userSkills.includes(skill));

const scoreACourse = (course, profile) => {
  let score = 0;

  const userSkills = normalizeArray(profile.skills.map((s) => s.name));
  const courseSkills = normalizeArray(course.skills);
  const matchedSkills = getUniqueMatchedSkills(courseSkills, userSkills);

  score += matchedSkills.length * 40;

  matchedSkills.forEach((skill) => {
    const userSkill = profile.skills.find((s) => s.name.toLowerCase() === skill);
    if (userSkill?.level === course.level) score += 15;
  });

  const userInterests = normalizeArray(profile.interests);
  if (userInterests.includes(course.category.toLowerCase())) score += 25;

  const careerPaths = normalizeArray(course.careerPaths);
  if (careerPaths.includes(profile.careerGoal.toLowerCase())) score += 20;

  if (
    profile.preferredLearningStyle === "mixed" ||
    course.type === profile.preferredLearningStyle
  ) score += 10;
  if (course.level === profile.preferredDifficultyLevel) score += 15;

  const courseHours = parseInt(course.duration);
  if (!isNaN(courseHours) && courseHours <= profile.weeklyLearningHours) {
    score += 10;
  }

  return score;
};

export const getRecommendedCourses = async (userId) => {
  console.log(userId);
  const profile = await Profile.findOne({
    userId: new mongoose.Types.ObjectId(userId)
  });
  if (!profile) return [];

  const courses = await Course.find();
  const result = [];

  for (const course of courses) {
    const alreadyEnrolled = profile.enrolledCourses.some(
      (e) => e.courseId.toString() === course._id.toString()
    );
    if (alreadyEnrolled) continue;

    result.push({
      ...course.toObject(),
      recommendationScore: scoreACourse(course, profile),
    });
  }

  return result
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, 20);
};

export const getStageRecommendedCourses = async (userId, stageSkills) => {
  const profile = await Profile.findOne({ userId });
  if (!profile) throw new Error("Profile not found");

  const courses = await Course.find({ skills: { $in: stageSkills } });

  return courses
    .map((course) => ({
      ...course.toObject(),
      recommendationScore: scoreACourse(course, profile),
    }))
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, 3);
};