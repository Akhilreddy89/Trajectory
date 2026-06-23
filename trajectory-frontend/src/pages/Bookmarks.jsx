import React, { useEffect, useState } from "react";
import { getSavedCourses, deleteSavedCourse, completedCourse,getCompletedCourses } from "../../services/courseServices.js";
import CourseCard from "../components/CourseCard.jsx";
import "../style/bookmarks.css";

function Bookmarks() {
    const [activeTab, setActiveTab] = useState("saved");
    const [savedCourses, setSavedCourses] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllDashboardData = async () => {
        try {
            setLoading(true);
            const [savedRes, completedRes] = await Promise.allSettled([
                getSavedCourses(),
                getCompletedCourses()
            ]);

            if (savedRes.status === "fulfilled") {
                const rawSavedData = savedRes.value?.data || savedRes.value;
                setSavedCourses(rawSavedData?.savedCourses || []);
            }
            
            if (completedRes.status === "fulfilled") {
                const rawCompletedData = completedRes.value?.data || completedRes.value;
                
                if (rawCompletedData && rawCompletedData.completedCourses) {
                    setCompletedCourses(rawCompletedData.completedCourses);
                } else if (Array.isArray(rawCompletedData)) {
                    setCompletedCourses(rawCompletedData);
                } else {
                    setCompletedCourses([]);
                }
            }
        } catch (err) {
            console.error("Error aggregating workspace datasets:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllDashboardData();
    }, []);

    const deleteCourse = async (e, bookmarkId) => {
        e.stopPropagation();
        try {
            await deleteSavedCourse(bookmarkId);
            alert("Course removed from bookmarks!");
            fetchAllDashboardData();
        } catch (err) {
            console.error(err);
            alert("Failed to remove course.");
        }
    };

    const handleMarkCompleted = async (e, courseId) => {
        e.stopPropagation();
        try {
            await completedCourse(courseId);
            alert("Course marked as completed!");
            await fetchAllDashboardData();
        } catch (err) {
            console.error(err);
            alert("Failed to mark course as completed.");
        }
    };

    if (loading) {
        return (
            <div className="space-loading-view">
                <div className="space-spinner"></div>
                <p>Loading your courses...</p>
            </div>
        );
    }

    return (
        <div className="bookmarks-container">
            <div className="space-header-block">
                <h1 className="bookmarks-header-title">My Learning Workspace</h1>
                
                <div className="workspace-tabs-menu">
                    <button 
                        className={`tab-toggle-btn ${activeTab === "saved" ? "active" : ""}`}
                        onClick={() => setActiveTab("saved")}
                    >
                        Saved Courses <span>{savedCourses.length||0}</span>
                    </button>
                    <button 
                        className={`tab-toggle-btn ${activeTab === "completed" ? "active" : ""}`}
                        onClick={() => setActiveTab("completed")}
                    >
                        Completed <span>{completedCourses.length||0}</span>
                    </button>
                </div>
            </div>

            {activeTab === "saved" ? (
                savedCourses.length === 0 ? (
                    <div className="empty-bookmarks">
                        <p>You have no bookmarked courses yet.</p>
                    </div>
                ) : (
                    <div className="courses-grid">
                        {savedCourses.map((savedCourse) => {
                            if (!savedCourse.courseId) return null;
                            return (
                                <div key={savedCourse._id} className="bookmark-card-wrapper">
                                    <button 
                                        className="bookmark-delete-badge"
                                        onClick={(e) => deleteCourse(e, savedCourse._id)}
                                        title="Remove Bookmark"
                                    >
                                        🗑️
                                    </button>
                                    <CourseCard course={savedCourse.courseId} />
                                    <div className="bookmark-actions-bar">
                                        <button 
                                            className="action-btn complete-btn"
                                            onClick={(e) => handleMarkCompleted(e, savedCourse.courseId._id)}
                                        >
                                            ✓ Mark as Completed
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
            ) : (
                completedCourses.length === 0 ? (
                    <div className="empty-bookmarks">
                        <p>No completed courses found yet. Keep learning! 🚀</p>
                    </div>
                ) : (
                    <div className="courses-grid">
                        {completedCourses.map((item) => {
                            const targetCourseDetails = item.courseId;
                            if (!targetCourseDetails) return null;
                            return (
                                <div key={item._id} className="bookmark-card-wrapper completed-greyed-card">
                                    <div className="completed-success-ribbon">
                                        Completed ✓
                                    </div>
                                    <CourseCard course={targetCourseDetails} />
                                </div>
                            );
                        })}
                    </div>
                )
            )}
        </div>
    );
}

export default Bookmarks;