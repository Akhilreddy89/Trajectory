import React from "react";
import axios from "axios";
import { useEffect,useState } from "react";
function Bookmarks() {
    const [savedCourses, setSavedCourses] = useState([]);

    const getCourses = async() => {
        try{
            const res = await axios.get(
                "http://localhost:5000/api/saved-courses",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log("Saved courses response:", res.data);
            setSavedCourses(res.data.savedCourses);
            console.log("Saved courses set in state:", res.data.savedCourses);
        }
        catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);
    const deleteCourse = async (courseId) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/delete-saved-course/${courseId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            alert("Course deleted successfully!");
            getCourses(); // Refresh the list after deletion
        } catch (err) {
            console.error(err);
            alert("Failed to delete course.");
        }
    };
    const completedCourse = async (courseId) => {
        try {
            await axios.post(
                `http://localhost:5000/api/mark-completed/${courseId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            alert("Course marked as completed!");
            getCourses(); // Refresh the list after marking as completed
        } catch (err) {
            console.error(err);
            alert("Failed to mark course as completed.");
        }
    };
  return (
    <div className="bookmarks">
        <h1>Your Bookmarked Courses</h1>
        <div>
            {savedCourses.length === 0 ? (
                <p>You have no bookmarked courses.</p>
            ) : (
                savedCourses.map((savedCourse) => (
                    <div key={savedCourse._id}>
                        <p>{savedCourse.courseId?.title}</p>
                        <p>{savedCourse.courseId?.description}</p>
                        <p>{savedCourse.courseId?.source}</p>
                        <p>{savedCourse.courseId?.category}</p>
                        <p>{savedCourse.courseId?.skills?.join(", ")}</p>
                        <button onClick={() => deleteCourse(savedCourse._id)}>Delete</button>
                        <button onClick={()=> completedCourse(savedCourse.courseId._id)}>Mark as Completed</button>
                        <p>------------------------------------------</p>
                    </div>
                ))
            )}
        </div>
    </div>
  );
}
export default Bookmarks;