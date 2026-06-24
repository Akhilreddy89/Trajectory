import { getRecommendedCourses } from "../services/recommendation.js";
import Course from "../models/Course.js";
import Profile from "../models/Profile.js";
const recommendedCourses = async (
  req,
  res
) => {
  try {
    const courses =
      await getRecommendedCourses(req.user);

    res.json({
      success: true,
      courses,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const homecourses = async (req, res) => {
  try {
    const courses = await Course.find().limit(10);  

    res.json({
      success: true,
      courses,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.json({
      success: true,
      course,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const saveCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const profile = await Profile.findOne({
      userId: req.user,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }


    const alreadyExists =
      profile.enrolledCourses.find(
        (course) =>
          course.courseId.toString() === courseId
      );

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Course already saved",
      });
    }


    profile.enrolledCourses.push({
      courseId,
      progress: 0,
      status: "saved",
    });

    await profile.save();

    res.json({
      success: true,
      message: "Course saved successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getSavedCourses = async (
  req,
  res
) => {
  try {
    const profile = await Profile.findOne({
      userId: req.user,
    }).populate("enrolledCourses.courseId");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Filter only saved courses

    const savedCourses =
      profile.enrolledCourses.filter(
        (course) =>
          course.status === "saved"
      );

    res.json({
      success: true,
      savedCourses,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const profile = await Profile.findOne({
      userId: req.user,
    });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }
    profile.enrolledCourses = profile.enrolledCourses.filter(
      (course) =>
        course._id.toString() !== courseId
    );
    await profile.save();
    res.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const markCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;

    const profile = await Profile.findOne({
      userId: req.user,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Find enrolled course (support both raw ObjectId and populated course objects)
    const course = profile.enrolledCourses.find((course) => {
      const storedCourseId = course.courseId?._id
        ? course.courseId._id
        : course.courseId;
      return storedCourseId?.toString() === courseId;
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Mark as completed
    course.status = "completed";
    course.progress = 100;

    // Get full course data
    const courseData = await Course.findById(
      course.courseId?._id || course.courseId
    );

    if (!courseData) {
      return res.status(404).json({
        success: false,
        message: "Course data not found",
      });
    }

    // Add course skills to profile
    if (courseData.skills?.length > 0) {
      courseData.skills.forEach((skill) => {
        const alreadyExists = profile.skills.some(
          (s) =>
            s.name.toLowerCase() ===
            skill.toLowerCase()
        );

        if (!alreadyExists) {
          profile.skills.push({
            name: skill,
            level: "beginner",
          });
        }
      });
    }

    // Add category to interests
    if (
      courseData.category &&
      !profile.interests.includes(
        courseData.category
      )
    ) {
      profile.interests.push(
        courseData.category
      );
    }

    // Update career goal
    if (
      courseData.careerPaths &&
      courseData.careerPaths.length > 0
    ) {
      profile.careerGoal =
        courseData.careerPaths[0];
    }

    await profile.save();

    res.json({
      success: true,
      message: "Course marked as completed",
      profile,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getCompletedCourses = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user }).populate({
      path: "enrolledCourses.courseId",
      model: "Course",
      select: "title description category source skills url" 
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
      message: "Internal Server Error context trace pinpoint." 
    });
  }
};


export { recommendedCourses, homecourses, saveCourse ,getSavedCourses, deleteCourse, markCompleted, getCourseById, getCompletedCourses};