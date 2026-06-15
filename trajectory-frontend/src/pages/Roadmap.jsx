import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard.jsx";
import "../style/Roadmap.css";


function Roadmap() {
    const [roadmap, setRoadmap] = useState(null);
    const fetchRoadmap = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/roadmap/me", {
                headers: {
                     Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(res.data);
            setRoadmap(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRoadmap();
    }, []);
    return (
        <main className="roadmap">
                <section className="roadmap-header">
                    <h1>Your Roadmap</h1>
                    <p>Your personalized learning roadmap helps you stay focused, track progress, and explore the best courses for your goals.</p>
                </section>

                {!roadmap ? (
                    <div className="roadmap-empty">Loading your roadmap...</div>
                ) : (
                    <div className="roadmap-content">
                        <section className="roadmap-summary">
                            <div className="roadmap-summary-row">
                                <div>
                                    <h2>{roadmap.role}</h2>
                                    <p className="roadmap-description">{roadmap.description}</p>
                                </div>
                                <div className="roadmap-meta">
                                    <span><strong>Category:</strong> {roadmap.category}</span>
                                    <span><strong>Level:</strong> {roadmap.level}</span>
                                    <span><strong>Duration:</strong> {roadmap.estimatedDuration}</span>
                                    <span><strong>Skills Required:</strong> {roadmap.skillsRequired.join(", ")}</span>
                                </div>
                            </div>
                        </section>

                        <section className="roadmap-stages">
                            <h3>Roadmap Stages</h3>
                            <ul>
                                {roadmap.stages.map((stage, index) => (
                                    <li className="roadmap-stage" key={index}>
                                        <div className="roadmap-stage-header">
                                            <div>
                                                <p className="roadmap-stage-label">Stage {index + 1}</p>
                                                <h4>{stage.title}</h4>
                                            </div>
                                            <span className="roadmap-stage-time">{stage.estimatedTime}</span>
                                        </div>
                                        <p className="roadmap-stage-description">{stage.description}</p>
                                        <div className="roadmap-stage-details">
                                            <p><strong>Skills:</strong> {stage.skills.join(", ")}</p>
                                            <p><strong>Projects:</strong> {stage.projects.join(", ")}</p>
                                        </div>
                                        <div className="roadmap-stage-courses">
                                            <p className="roadmap-stage-courses-title">Recommended Courses</p>
                                            <div className="roadmap-course-grid">
                                                {stage.recommendedCourses.map((course, courseIndex) => (
                                                    <div className="roadmap-course-card" key={courseIndex}>
                                                        <CourseCard course={course} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                )}
            </main>
    );
}
export default Roadmap;