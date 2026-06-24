import Roadmap from "../models/Roadmap.js";
import Profile from "../models/Profile.js";
import { getStageRecommendedCourses } from "../services/recommendation.js";

const normalizeTitle = (title) =>
  title?.toString().trim().toLowerCase() || "";

const getRoadmap = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const careerGoal = profile.careerGoal;
    const roadmap = await Roadmap.findOne({ role: careerGoal });
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    const userRoadmap = profile.roadmap || [];

    const stagesWithCourses = await Promise.all(
      roadmap.stages.map(async (stage, idx) => {
        const recommendedCourses = await getStageRecommendedCourses(req.user, stage.skills);
        const stageOrder = stage.order !== undefined ? stage.order : idx + 1;

        const normalizedStageTitle = normalizeTitle(stage.title);
        const match = userRoadmap.find((r) => {
          const rOrder = Number(r.order);
          const normalizedROrder = Number.isFinite(rOrder) ? rOrder : undefined;
          if (normalizedROrder !== undefined) {
            return normalizedROrder === stageOrder;
          }
          return normalizeTitle(r.title) === normalizedStageTitle;
        });

        return {
          ...stage.toObject(),
          order: stageOrder,
          status: match ? match.status : "pending",
          recommendedCourses,
        };
      })
    );

    const totalStages = stagesWithCourses.length;
    const completedCount = stagesWithCourses.filter((s) => s.status === "completed").length;
    const percentage = totalStages > 0 ? Math.round((completedCount / totalStages) * 100) : 0;

    res.json({
      ...roadmap.toObject(),
      stages: stagesWithCourses,
      progress: {
        totalStages,
        completedCount,
        percentage,
        remaining: totalStages - completedCount,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const completeStage = async (req, res) => {
  try {
    const { stageOrder } = req.params;
    const profile = await Profile.findOne({ userId: req.user });
    if (!profile) {
      return res.status(404).json({ message: "Profile document missing for this user." });
    }

    const roadmap = await Roadmap.findOne({ role: profile.careerGoal });
    if (!roadmap) {
      return res.status(404).json({ message: `Roadmap definition not found for path: "${profile.careerGoal}".` });
    }

    if (!profile.roadmap) {
      profile.roadmap = [];
    }

    roadmap.stages.forEach((blueprintStage, idx) => {
      const expectedOrder = blueprintStage.order !== undefined ? blueprintStage.order : idx + 1;
      const userHasStage = profile.roadmap.some(
        (r) => r.order === expectedOrder || r.title === blueprintStage.title
      );
      if (!userHasStage) {
        profile.roadmap.push({
          title: blueprintStage.title,
          order: expectedOrder,
          status: "pending"
        });
      }
    });

    profile.roadmap.sort((a, b) => a.order - b.order);

    const stageIndex = profile.roadmap.findIndex((r) => {
      const rOrder = r.order !== undefined ? r.order : undefined;
      return (
        (rOrder !== undefined && (rOrder.toString() === stageOrder || rOrder === Number(stageOrder))) ||
        r.title === stageOrder ||
        r.title === String(stageOrder)
      );
    });

    if (stageIndex === -1) {
      return res.status(404).json({ message: "Stage tracking element not found in profile." });
    }

    profile.roadmap[stageIndex].status = "completed";
    await profile.save();

    const mergedStages = await Promise.all(
      roadmap.stages.map(async (stage, idx) => {
        const stageOrderNum = stage.order !== undefined ? stage.order : idx + 1;
        const match = profile.roadmap.find((r) => (r.order !== undefined && r.order === stageOrderNum) || r.title === stage.title);
        const recommendedCourses = await getStageRecommendedCourses(req.user, stage.skills);

        return {
          ...stage.toObject(),
          order: stageOrderNum,
          status: match ? match.status : "pending",
          recommendedCourses,
        };
      })
    );

    const totalStages = mergedStages.length;
    const completedCount = mergedStages.filter((s) => s.status === "completed").length;
    const percentage = totalStages > 0 ? Math.round((completedCount / totalStages) * 100) : 0;

    return res.json({
      ...roadmap.toObject(),
      success: true,
      stages: mergedStages,
      progress: { totalStages, completedCount, percentage, remaining: totalStages - completedCount },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};



const undoStageController = async (req, res) => {
  try {
    const userId = req.user; 
    const { order } = req.body; 

    if (!order) {
      return res.status(400).json({ message: "Order value parameter is required." });
    }

    const profile = await Profile.findOne({ userId: userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile tracking record data not found." });
    }

    const roadmap = await Roadmap.findOne({ role: profile.careerGoal });
    if (!roadmap) {
      return res.status(404).json({ message: `Master blueprint not found for role: "${profile.careerGoal}"` });
    }

    if (!profile.roadmap) {
      profile.roadmap = [];
    }

    const stageIndex = profile.roadmap.findIndex((r) => Number(r.order) === Number(order));

    if (stageIndex === -1) {
      return res.status(404).json({ message: `Stage index tracking sequence ${order} not found in profile.` });
    }

    profile.roadmap[stageIndex].status = "pending";
    await profile.save();

    const mergedStages = await Promise.all(
      roadmap.stages.map(async (stage, idx) => {
        const stageOrderNum = stage.order !== undefined ? stage.order : idx + 1;
        const match = profile.roadmap.find((r) => (r.order !== undefined && r.order === stageOrderNum) || r.title === stage.title);
        const recommendedCourses = await getStageRecommendedCourses(userId, stage.skills);

        return {
          ...stage.toObject(),
          order: stageOrderNum,
          status: match ? match.status : "pending",
          recommendedCourses,
        };
      })
    );

    const totalStages = mergedStages.length;
    const completedCount = mergedStages.filter((s) => s.status === "completed").length;
    const percentage = totalStages > 0 ? Math.round((completedCount / totalStages) * 100) : 0;

    return res.status(200).json({
      data: {
        ...roadmap.toObject(),
        stages: mergedStages,
        progress: { totalStages, completedCount, percentage, remaining: totalStages - completedCount },
      }
    });

  } catch (error) {
    console.error("Backend Error on Stage Status Reversal:", error);
    return res.status(500).json({ message: "Internal server error execution fault." });
  }
};

export { getRoadmap, completeStage, undoStageController };