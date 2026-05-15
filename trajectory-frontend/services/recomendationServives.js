import axios from "axios";
export const getRecommendations = async () => {
    const res = await axios.get(
        "http://localhost:5000/api/recommendations",
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res;
};