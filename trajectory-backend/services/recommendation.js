import Course from "../models/Course.js";
import Profile from "../models/Profile.js";

const normalizeArray = (arr) => arr.map((item) => item.toLowerCase());
const getUniqueMatchedSkills = (courseSkills, userSkills) =>
  [...new Set(courseSkills)].filter((skill) => userSkills.includes(skill));

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
    const userSkills = normalizeArray(
      profile.skills.map((skill) => skill.name)
    );

    const courseSkills = normalizeArray(course.skills);

    const matchedSkills = getUniqueMatchedSkills(
      courseSkills,
      userSkills
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
  const courses = await Course.find({
    skills: {
      $in: stageSkills,
    },
  });

  const recommendedCourses = [];

  for (const course of courses) {

    let score = 0;


    const userSkills = normalizeArray(
      profile.skills.map((skill) => skill.name)
    );

    const courseSkills = normalizeArray(course.skills);

    const matchedSkills = getUniqueMatchedSkills(
      courseSkills,
      userSkills
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

  return recommendedCourses.slice(0, 3);
};