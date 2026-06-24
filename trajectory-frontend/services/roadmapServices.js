import axios from "axios";
import api from "./api";
export const getCompleteRoadmap = async () => {
    try {
        const res = await api.get("/roadmap/me");
        return res;
    } catch (error) {
        console.error("Error fetching complete roadmap:", error);
        throw error;
    }
};
export const completeStage = async (order) => {
    try{
        const resp = await api.post(`/roadmap/complete-stage/${order}`);
        return resp;
    }
    catch(err){
        console.error("Error patching stage completion metrics:", err);
        throw err;
    }
}
export const currentStage = (roadmap) => {
    if(!roadmap) return null;
    const current = roadmap.stages.find(stage => stage.status === "pending");
    return current || null;
}
export const undoStage = async (orderId) => {
  return await api.patch("/roadmap/stage/undo", { order: orderId });
};