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
    const profile = await Profile.findOne({ userId: req.user }).populate({
      path: "enrolledCourses.courseId",
      model: "Course"
    });
    console.log(profile);
    if (!profile) {
      return res.json({
        success: true,
        count: 0,
        completedCourses: []
      });
    }

    const completedCourses = profile.enrolledCourses.filter(
      (course) => course.status === "completed"
    );

    const completedCoursesData = completedCourses.map((enrollment) => {
      const course = enrollment.courseId;
      return {
        _id: enrollment._id,
        courseId: course ? course._id : enrollment.courseId,
        courseName: course ? course.title : "Unknown Course",
        courseDescription: course ? course.description : "",
        category: course ? course.category : "",
        progress: enrollment.progress,
        status: enrollment.status,
        completedAt: enrollment.savedAt,
      };
    });

    res.json({
      success: true,
      count: completedCoursesData.length,
      completedCourses: completedCoursesData,
    });
  } catch (error) {
    console.error("GET COMPLETED COURSES ERROR:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { getProfile, getCompletedCourses };