import Profile from "../models/Profile.js";

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user });
    res.json({
      success: true,
      profile: profile || null,
    });
  } catch (error) {
    console.error("PROFILE ERROR:", error.message);
    res.status(500).json({ success: false });
  }
};
const getCompletedCourses = async (req, res) => {
  try {
    // 1. Fetch profile and populate standard course fields needed by CourseCard
    const profile = await Profile.findOne({ userId: req.user }).populate({
      path: "enrolledCourses.courseId",
      model: "Course",
      select: "title description category source skills url" // Explicitly bring fields needed by CourseCard
    });

    // 2. Handle empty profile states cleanly
    if (!profile || !profile.enrolledCourses) {
      return res.status(200).json({
        success: true,
        count: 0,
        completedCourses: []
      });
    }

    // 3. Filter for fully completed statuses
    const completedEnrollments = profile.enrolledCourses.filter(
      (item) => item.status === "completed" && item.courseId // Ensure referenced course document wasn't deleted
    );

    // 4. Formulate the response to match the shape expected by frontend views
    const completedCoursesData = completedEnrollments.map((enrollment) => {
      const coreCourse = enrollment.courseId;
      
      return {
        _id: enrollment._id,
        status: enrollment.status,
        progress: enrollment.progress,
        completedAt: enrollment.savedAt,
        courseId: {
          _id: coreCourse._id,
          title: coreCourse.title || "Unknown Module",
          description: coreCourse.description || "",
          category: coreCourse.category || "General",
          source: coreCourse.source || "External Platform",
          skills: coreCourse.skills || [],
          url: coreCourse.url || ""
        }
      };
    });
   
    return res.status(200).json({
      success: true,
      count: completedCoursesData.length,
      completedCourses: completedCoursesData
    });

  } catch (error) {
    console.error("GET COMPLETED COURSES CONTROLLER ERROR:", error.message);
    return res.status(500).json({ 
      success: false, 
      error: "Internal Server Error context trace pinpoint." 
    });
  }
};

export { getProfile, getCompletedCourses };