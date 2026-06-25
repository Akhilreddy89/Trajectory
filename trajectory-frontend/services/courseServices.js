import api from "./api";
export const getCourses = async () => {
    try{
        const res = await api.get("/dashboard");
        return res;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
};
export const getSavedCourses = async () => {
    try {
        const res = await api.get("/saved-courses");
        return res;
    } catch (error) {
        console.error("Error fetching saved courses:", error);
        throw error;
    }
};
export const deleteSavedCourse = async (courseId) => {
    try {
        const res = await api.delete(`/delete-saved-course/${courseId}`);
        return res;
    } catch (error) {
        console.error("Error deleting saved course:", error);
        throw error;
    }
};
export const completedCourse = async (courseId) => {
    try {
        const res = await api.post(`/mark-completed/${courseId}`, {});
        return res;
    } catch (error) {
        console.error("Error marking course as completed:", error);
        throw error;
    }
};
export const getCompletedCourses = async () => {
    try {
        const res = await api.get("/completed-courses");
        return res;
    } catch (error) {
        console.error("Error fetching completed courses:", error);
        throw error;
    }
};

export const getCourseById = async (courseId) => {
  try {
    const res = await api.get(`/course/${courseId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
};

export const savedCourse = async (courseId) => {
  try {
    const res = await api.post(`/save-course/${courseId}`, {});
    return res.data;
  } catch (error) {
    console.error("Error saving a course:", error);
    throw error;
  }
};
export const searchCourses = async (query, filters = {}) => {
  try {
    const params = new URLSearchParams({ q: query, ...filters });
    const res = await api.get(`/search?${params}`);
    return res.data;
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};