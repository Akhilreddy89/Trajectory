import Roadmap from "../models/Roadmap.js";
import Profile from "../models/Profile.js";

import {
  getStageRecommendedCourses,
} from "../services/recommendation.js";

const getRoadmap = async (req, res) => {

  try {


    const profile = await Profile.findOne({
      userId: req.user,
    });

    if (!profile) {

      return res.status(404).json({
        message: "Profile not found",
      });

    }

    const careerGoal = profile.careerGoal;


    const roadmap = await Roadmap.findOne({
      role: careerGoal,
    });

    if (!roadmap) {

      return res.status(404).json({
        message: "Roadmap not found",
      });

    }

    const stagesWithCourses =
      await Promise.all(

        roadmap.stages.map(async (stage) => {

          const recommendedCourses =
            await getStageRecommendedCourses(

              req.user,

              stage.skills

            );

          return {
            ...stage.toObject(),
            recommendedCourses,

          };
        })

      );

    res.json({

      ...roadmap.toObject(),
      stages: stagesWithCourses,

    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

export { getRoadmap };