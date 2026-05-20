import React from "react";
import axios from "axios";
import { useEffect,useState } from "react";
import { getSavedCourses,deleteSavedCourse,completedCourse } from "../../services/courseServices.js";
import Navbar from "../components/Navbar.jsx";
import "../style/Home.css";
function Bookmarks() {
    const [savedCourses, setSavedCourses] = useState([]);

    const getCourses = async() => {
        try{
            const res = await getSavedCourses();
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
            await deleteSavedCourse(courseId);
            alert("Course deleted successfully!");
            await getCourses();
        } catch (err) {
            console.error(err);
            alert("Failed to delete course.");
        }
    };
    const handleMarkCompleted = async (courseId) => {
        try {
            await completedCourse(courseId);
            alert("Course marked as completed!");
            getCourses(); // Refresh the list after marking as completed
        } catch (err) {
            console.error(err);
            alert("Failed to mark course as completed.");
        }
    };
  return (
    <>
      <Navbar />
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
                        <button onClick={()=> handleMarkCompleted(savedCourse.courseId._id)}>Mark as Completed</button>
                        <p>------------------------------------------</p>
                    </div>
                ))
            )}
        </div>
    </div>
    </>
  );
}
export default Bookmarks;