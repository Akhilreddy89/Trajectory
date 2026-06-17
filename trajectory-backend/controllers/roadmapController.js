import Roadmap from "../models/Roadmap.js";
import Profile from "../models/Profile.js";

import {
  getStageRecommendedCourses,
} from "../services/recommendation.js";

const normalizeTitle = (title) =>
  title?.toString().trim().toLowerCase() || "";

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

    // Merge user profile roadmap statuses (if any) into the roadmap stages
    const userRoadmap = profile.roadmap || [];

    const stagesWithCourses =
      await Promise.all(
        roadmap.stages.map(async (stage, idx) => {
          const recommendedCourses = await getStageRecommendedCourses(
            req.user,
            stage.skills
          );

          // Normalize stage order (use stored order or fallback to index+1)
          const stageOrder = stage.order !== undefined ? stage.order : idx + 1;

          // Find matching status in user profile by order or normalized title
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

    // compute progress
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

    res.status(500).json({
      message: err.message,
    });

  }
};



const completeStage = async (req, res) => {
  try {
    const { stageOrder } = req.params;
    
    console.log("=== DESKTOP TRACE DEBUGGING ===");
    console.log("Incoming stageOrder parameter value:", stageOrder);
    console.log("Authenticated User ID from middleware:", req.user);

    // 1. CRITICAL FIX: Fetch the User Profile Document
    const profile = await Profile.findOne({ userId: req.user });
    if (!profile) {
      console.log(`❌ Profile document lookup failed for User ID: ${req.user}`);
      return res.status(404).json({ 
        message: "Profile document missing for this user. Ensure profile creation is finalized." 
      });
    }

    // 2. CRITICAL FIX: Fetch the Global Roadmap Document matching the user's careerGoal
    const roadmap = await Roadmap.findOne({ role: profile.careerGoal });
    if (!roadmap) {
      console.log(`❌ Roadmap matching error. No database document found where role matches exactly "${profile.careerGoal}"`);
      return res.status(404).json({ 
        message: `Roadmap database definition not found for path selection: "${profile.careerGoal}". Check spelling/case matches.` 
      });
    }

    // 3. Ensure profile.roadmap is initialized as an array
    if (!profile.roadmap) {
      profile.roadmap = [];
    }

    // 4. Crosscheck and dynamically push any missing blueprint stages into the user's tracker
    roadmap.stages.forEach((blueprintStage, idx) => {
      const expectedOrder = blueprintStage.order !== undefined ? blueprintStage.order : idx + 1;
      
      // Check if the user already has this stage tracked by order or title
      const userHasStage = profile.roadmap.some(
        (r) => r.order === expectedOrder || r.title === blueprintStage.title
      );

      // If the stage is missing from the user's profile, append it
      if (!userHasStage) {
        profile.roadmap.push({
          title: blueprintStage.title,
          order: expectedOrder,
          status: "pending"
        });
      }
    });

    // Sort the tracker by order to keep the database tidy
    profile.roadmap.sort((a, b) => a.order - b.order);

    // 5. Find stage index matches (Handles both numerical ID strings and full text titles)
    const stageIndex = profile.roadmap.findIndex((r) => {
      const rOrder = r.order !== undefined ? r.order : undefined;
      return (
        (rOrder !== undefined && (rOrder.toString() === stageOrder || rOrder === Number(stageOrder))) ||
        r.title === stageOrder ||
        r.title === String(stageOrder)
      );
    });

    if (stageIndex === -1) {
      console.log(`❌ Array search index mismatch. Input "${stageOrder}" did not resolve against tracking elements.`);
      console.log("User's available tracking roadmap nodes:", profile.roadmap.map(r => ({ order: r.order, title: r.title })));
      return res.status(404).json({ 
        message: `Stage tracking element assignment "${stageOrder}" was not matched inside your profile context array.` 
      });
    }

    // 6. Update stage status and persist to the database
    profile.roadmap[stageIndex].status = "completed";
    await profile.save();
    console.log("✓ Target element changed to completed and written to DB.");

    // 7. Recompute merged roadmap and populate its recommended courses arrays
    const { getStageRecommendedCourses } = await import("../services/recommendation.js");
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

    console.log("=== DEBUG COMPLETED SUCCESS ===");

    return res.json({
      ...roadmap.toObject(),
      success: true,
      stages: mergedStages,
      progress: { totalStages, completedCount, percentage, remaining: totalStages - completedCount },
    });

  } catch (err) {
    console.error("CRITICAL RUNTIME ERROR INSIDE CONTROLLER BLOCK:", err);
    return res.status(500).json({ message: err.message });
  }
};

export { getRoadmap, completeStage };