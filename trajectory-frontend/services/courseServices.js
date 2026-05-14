import axios from "axios";
export const getCourses = async () => {
    const res = await axios.get(
        "http://localhost:5000/api/dashboard",
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res;
    console.log(res.data);
};
export const getSavedCourses = async () => {
    const res = await axios.get(
        "http://localhost:5000/api/saved-courses",
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res;
    console.log(res.data);
}
export const deleteSavedCourse = async (courseId) => {
    const res = await axios.delete(
        `http://localhost:5000/api/delete-saved-course/${courseId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res;
}
export const completedCourse = async (courseId) => {
    const res = await axios.post(
        `http://localhost:5000/api/mark-completed/${courseId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res;
}