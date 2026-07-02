import Roadmap from "../models/Roadmap.js";
import Profile from "../models/Profile.js";
import { getStageRecommendedCourses } from "../services/recommendation.js";

const normalizeTitle = (title) =>
  title?.toString().trim().toLowerCase() || "";

const resolveStageOrder = (stage, idx) =>
  stage.order !== undefined ? stage.order : idx + 1;

// Single source of truth for merging a blueprint roadmap with a user's profile progress.
const buildMergedStages = async (roadmap, profile, userId) => {
  const userRoadmap = profile.roadmap || [];

  return Promise.all(
    roadmap.stages.map(async (stage, idx) => {
      const stageOrder = resolveStageOrder(stage, idx);
      const normalizedStageTitle = normalizeTitle(stage.title);

      const match = userRoadmap.find((r) => {
        const rOrder = Number(r.order);
        if (Number.isFinite(rOrder)) {
          return rOrder === stageOrder;
        }
        return normalizeTitle(r.title) === normalizedStageTitle;
      });

      const recommendedCourses = await getStageRecommendedCourses(userId, stage.skills, profile);

      return {
        ...stage.toObject(),
        order: stageOrder,
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

const loadProfileAndRoadmap = async (userId) => {
  const profile = await Profile.findOne({ userId });
  if (!profile) return { error: { status: 404, message: "Profile not found" } };

  const roadmap = await Roadmap.findOne({ role: profile.careerGoal });
  if (!roadmap) return { error: { status: 404, message: "Roadmap not found" } };

  return { profile, roadmap };
};

const getRoadmap = async (req, res) => {
  try {
    const { profile, roadmap, error } = await loadProfileAndRoadmap(req.user);
    if (error) return res.status(error.status).json({ success: false, message: error.message });

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

const completeStage = async (req, res) => {
  try {
    const { stageOrder } = req.params;
    if (!stageOrder) {
      return res.status(400).json({ success: false, message: "stageOrder is required" });
    }

    const { profile, roadmap, error } = await loadProfileAndRoadmap(req.user);
    if (error) return res.status(error.status).json({ success: false, message: error.message });

    if (!profile.roadmap) profile.roadmap = [];

    // Ensure the profile has an entry for every blueprint stage before matching.
    roadmap.stages.forEach((blueprintStage, idx) => {
      const expectedOrder = resolveStageOrder(blueprintStage, idx);
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
        r.title === stageOrder
      );
    });

    if (stageIndex === -1) {
      return res.status(404).json({ success: false, message: "Stage not found in profile" });
    }

    profile.roadmap[stageIndex].status = "completed";

    const blueprintStage = roadmap.stages.find(
      (s) => s.order === profile.roadmap[stageIndex].order || s.title === profile.roadmap[stageIndex].title
    );

    if (blueprintStage?.skills?.length > 0) {
      blueprintStage.skills.forEach((skill) => {
        const skillExists = profile.skills.some(
          (s) => s.name.toLowerCase() === skill.toLowerCase()
        );
        if (!skillExists) {
          profile.skills.push({ name: skill, level: "beginner" });
        }
      });
    }

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
    const { order } = req.body;
    const numericOrder = Number(order);

    if (order === undefined || order === null || !Number.isFinite(numericOrder)) {
      return res.status(400).json({ success: false, message: "A valid numeric order is required" });
    }

    const { profile, roadmap, error } = await loadProfileAndRoadmap(req.user);
    if (error) return res.status(error.status).json({ success: false, message: error.message });

    if (!profile.roadmap) profile.roadmap = [];

    const stageIndex = profile.roadmap.findIndex((r) => Number(r.order) === numericOrder);
    if (stageIndex === -1) {
      return res.status(404).json({ success: false, message: `Stage with order ${numericOrder} not found` });
    }

    profile.roadmap[stageIndex].status = "pending";

    const blueprintStage = roadmap.stages.find(
      (s) => s.order === profile.roadmap[stageIndex].order || s.title === profile.roadmap[stageIndex].title
    );

    if (blueprintStage?.skills?.length > 0) {
      blueprintStage.skills.forEach((skill) => {
        profile.skills = profile.skills.filter(
          (s) => s.name.toLowerCase() !== skill.toLowerCase()
        );
      });
    }

    await profile.save();

    const mergedStages = await buildMergedStages(roadmap, profile, req.user);

    return res.status(200).json({
      success: true,
      ...roadmap.toObject(),
      stages: mergedStages,
      progress: calcProgress(mergedStages),
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { getRoadmap, completeStage, undoStageController };