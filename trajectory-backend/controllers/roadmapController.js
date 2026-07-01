import Roadmap from "../models/Roadmap.js";
import Profile from "../models/Profile.js";
import { getStageRecommendedCourses } from "../services/recommendation.js";

const normalizeTitle = (title) =>
  title?.toString().trim().toLowerCase() || "";

const buildMergedStages = async (roadmap, profile, userId) => {
  return Promise.all(
    roadmap.stages.map(async (stage, idx) => {
      const stageOrderNum = stage.order !== undefined ? stage.order : idx + 1;
      const match = profile.roadmap.find(
        (r) =>
          (r.order !== undefined && r.order === stageOrderNum) ||
          r.title === stage.title
      );
      const recommendedCourses = await getStageRecommendedCourses(userId, stage.skills, profile);

      return {
        ...stage.toObject(),
        order: stageOrderNum,
        status: match ? match.status : "pending",
        recommendedCourses,
      };
    })
  );
};

const calcProgress = (stages) => {
  const totalStages = stages.length;
  const completedCount = stages.filter((s) => s.status === "completed").length;
  const percentage = totalStages > 0 ? Math.round((completedCount / totalStages) * 100) : 0;
  return { totalStages, completedCount, percentage, remaining: totalStages - completedCount };
};

const getRoadmap = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user });
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    const roadmap = await Roadmap.findOne({ role: profile.careerGoal });
    if (!roadmap) {
      return res.status(404).json({ success: false, message: "Roadmap not found" });
    }

    const userRoadmap = profile.roadmap || [];

    const stagesWithCourses = await Promise.all(
      roadmap.stages.map(async (stage, idx) => {
        const recommendedCourses = await getStageRecommendedCourses(req.user, stage.skills, profile);
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

    return res.json({
      success: true,
      ...roadmap.toObject(),
      stages: stagesWithCourses,
      progress: calcProgress(stagesWithCourses),
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const completeStage = async (req, res) => {
  try {
    const { stageOrder } = req.params;

    const profile = await Profile.findOne({ userId: req.user });
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    const roadmap = await Roadmap.findOne({ role: profile.careerGoal });
    if (!roadmap) {
      return res.status(404).json({ success: false, message: "Roadmap not found" });
    }

    if (!profile.roadmap) profile.roadmap = [];

    roadmap.stages.forEach((blueprintStage, idx) => {
      const expectedOrder = blueprintStage.order !== undefined ? blueprintStage.order : idx + 1;
      const userHasStage = profile.roadmap.some(
        (r) => r.order === expectedOrder || r.title === blueprintStage.title
      );
      if (!userHasStage) {
        profile.roadmap.push({ title: blueprintStage.title, order: expectedOrder, status: "pending" });
      }
    });

    profile.roadmap.sort((a, b) => a.order - b.order);

    const stageIndex = profile.roadmap.findIndex((r) => {
      const rOrder = r.order !== undefined ? r.order : undefined;
      return (
        (rOrder !== undefined && (rOrder.toString() === stageOrder || rOrder === Number(stageOrder))) ||
        r.title === stageOrder ||
        r.title === String(stageOrder) ||
        r.skills?.includes(stageOrder)
      );
    });

    if (stageIndex === -1) {
      return res.status(404).json({ success: false, message: "Stage not found in profile" });
    }

    profile.roadmap[stageIndex].status = "completed";

    // Add stage skills to profile
    const blueprintStage = roadmap.stages.find(
      (s) => s.order === profile.roadmap[stageIndex].order || s.title === profile.roadmap[stageIndex].title
    );

    if (blueprintStage && blueprintStage.skills && blueprintStage.skills.length > 0) {
      blueprintStage.skills.forEach((skill) => {
        const skillExists = profile.skills.some(
          (s) => s.name.toLowerCase() === skill.toLowerCase()
        );
        if (!skillExists) {
          profile.skills.push({ name: skill, level: "beginner" });
        }
      });
    }

    console.log("Profile roadmap after completion:", profile.roadmap[stageIndex]);
    await profile.save();

    const mergedStages = await buildMergedStages(roadmap, profile, req.user);

    return res.json({
      success: true,
      ...roadmap.toObject(),
      stages: mergedStages,
      progress: calcProgress(mergedStages),
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const undoStageController = async (req, res) => {
  try {
    const userId = req.user;
    const { order } = req.body;

    if (!order) {
      return res.status(400).json({ success: false, message: "Order is required" });
    }

    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    const roadmap = await Roadmap.findOne({ role: profile.careerGoal });
    if (!roadmap) {
      return res.status(404).json({ success: false, message: "Roadmap not found" });
    }

    if (!profile.roadmap) profile.roadmap = [];

    const stageIndex = profile.roadmap.findIndex((r) => Number(r.order) === Number(order));
    if (stageIndex === -1) {
      return res.status(404).json({ success: false, message: `Stage with order ${order} not found` });
    }

    profile.roadmap[stageIndex].status = "pending";

    // Remove stage skills from profile
    const blueprintStage = roadmap.stages.find(
      (s) => s.order === profile.roadmap[stageIndex].order || s.title === profile.roadmap[stageIndex].title
    );

    if (blueprintStage && blueprintStage.skills && blueprintStage.skills.length > 0) {
      blueprintStage.skills.forEach((skill) => {
        profile.skills = profile.skills.filter(
          (s) => s.name.toLowerCase() !== skill.toLowerCase()
        );
      });
    }

    await profile.save();

    const mergedStages = await buildMergedStages(roadmap, profile, userId);

    return res.status(200).json({
      success: true,
      ...roadmap.toObject(),
      stages: mergedStages,
      progress: calcProgress(mergedStages),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { getRoadmap, completeStage, undoStageController };