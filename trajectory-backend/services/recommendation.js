import Course from "../models/Course.js";
import Profile from "../models/Profile.js";

export const getRecommendedCourses = async (userId) => {


  const profile = await Profile.findOne({
    userId,
  });

  if (!profile) {
    throw new Error("Profile not found");
  }


  const courses = await Course.find();

  const recommendedCourses = [];

  for (const course of courses) {
    let score = 0;
    //we need to check this in user profile completed courses
    const alreadyEnrolled =
      profile.enrolledCourses.some(
        (enrolledCourse) =>
          enrolledCourse.courseId.toString() ===
          course._id.toString()
      );

    if (alreadyEnrolled) {
      continue;
    }
    const userSkills = profile.skills.map(
      (skill) => skill.name.toLowerCase()
    );

    const courseSkills = course.skills.map(
      (skill) => skill.toLowerCase()
    );

    const matchedSkills = courseSkills.filter(
      (skill) => userSkills.includes(skill)
    );

    score += matchedSkills.length * 40;



    const userInterests = profile.interests.map(
      (interest) => interest.toLowerCase()
    );

    if (
      userInterests.includes(
        course.category.toLowerCase()
      )
    ) {
      score += 25;
    }


    const careerPaths = course.careerPaths.map(
      (path) => path.toLowerCase()
    );

    if (
      careerPaths.includes(
        profile.careerGoal.toLowerCase()
      )
    ) {
      score += 20;
    }


    if (
      course.type ===
      profile.preferredLearningStyle
    ) {
      score += 10;
    }

    if (
      course.difficulty ===
      profile.preferredDifficultyLevel
    ) {
      score += 5;
    }

    // Add final score

    recommendedCourses.push({
      ...course.toObject(),
      recommendationScore: score,
    });
  }


  recommendedCourses.sort(
    (a, b) =>
      b.recommendationScore -
      a.recommendationScore
  );


  return recommendedCourses.slice(0, 20);
};
// ============================================
// ROADMAP STAGE RECOMMENDATIONS
// ============================================

export const getStageRecommendedCourses = async (
  userId,
  stageSkills
) => {

  const profile = await Profile.findOne({
    userId,
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  // ============================================
  // FILTER COURSES BY STAGE SKILLS
  // ============================================

  const courses = await Course.find({
    skills: {
      $in: stageSkills,
    },
  });

  const recommendedCourses = [];

  for (const course of courses) {

    let score = 0;

    // ============================================
    // SKILL MATCHING
    // ============================================

    const userSkills = profile.skills.map(
      (skill) => skill.name.toLowerCase()
    );

    const courseSkills = course.skills.map(
      (skill) => skill.toLowerCase()
    );

    const matchedSkills = courseSkills.filter(
      (skill) => userSkills.includes(skill)
    );

    score += matchedSkills.length * 40;

    // ============================================
    // INTEREST MATCHING
    // ============================================

    const userInterests = profile.interests.map(
      (interest) => interest.toLowerCase()
    );

    if (
      userInterests.includes(
        course.category.toLowerCase()
      )
    ) {
      score += 25;
    }

    // ============================================
    // CAREER GOAL MATCHING
    // ============================================

    const careerPaths = course.careerPaths.map(
      (path) => path.toLowerCase()
    );

    if (
      careerPaths.includes(
        profile.careerGoal.toLowerCase()
      )
    ) {
      score += 20;
    }

    // ============================================
    // LEARNING STYLE MATCHING
    // ============================================

    if (
      course.type ===
      profile.preferredLearningStyle
    ) {
      score += 10;
    }

    // ============================================
    // DIFFICULTY MATCHING
    // ============================================

    if (
      course.difficulty ===
      profile.preferredDifficultyLevel
    ) {
      score += 5;
    }

    // ============================================
    // FINAL SCORE
    // ============================================

    recommendedCourses.push({
      ...course.toObject(),
      recommendationScore: score,
    });
  }

  // Sort descending
  recommendedCourses.sort(
    (a, b) =>
      b.recommendationScore -
      a.recommendationScore
  );

  // Return only top 3 for roadmap stage
  return recommendedCourses.slice(0, 3);
};