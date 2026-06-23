import axios from "axios";
import api from "./api";
export const getRecommendations = async () => {
    try {
        const res = await api.get("/recommendations");
        return res;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        throw error;
    }
};