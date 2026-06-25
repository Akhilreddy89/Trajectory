import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard.jsx";
import { completeStage, undoStage, getCompleteRoadmap } from "../../services/roadmapServices.js";

import "../style/Roadmap.css";

function Roadmap() {
    const [roadmap, setRoadmap] = useState(null);
    const [progress, setProgress] = useState({ percentage: 0, completedCount: 0, totalStages: 0, remaining: 0 });
    const [expandedStages, setExpandedStages] = useState({});

    const fetchRoadmap = async () => {
        try {
            const res = await getCompleteRoadmap();
            setRoadmap(res.data);
            if (res.data && res.data.progress) {
                setProgress(res.data.progress);
            }
            
            if (res.data && res.data.stages) {
                const initialExpansion = {};
                const firstIncompleteIndex = res.data.stages.findIndex(stage => stage.status !== "completed");
                res.data.stages.forEach((_, idx) => {
                    // Expand the first incomplete stage by default, keep others collapsed
                    initialExpansion[idx] = firstIncompleteIndex === -1 ? idx === 0 : idx === firstIncompleteIndex;
                });
                setExpandedStages(initialExpansion);
            }
        } catch (err) {
            console.error("Error fetching roadmap workspace metrics:", err);
        }
    };

    useEffect(() => {
        fetchRoadmap();
    }, []);

    const toggleStageCourses = (index) => {
        setExpandedStages(prev => ({ 
            ...prev, 
            [index]: !prev[index] 
        }));
    };

    const handleStageAction = async (index, stage, actionType) => {
        try {
            const order = stage.order ?? index + 1;
            const resp = actionType === "COMPLETE" ? await completeStage(order) : await undoStage(order);
            
            if (resp && resp.data) {
                // Defensive extraction step: targets raw response data or nested data depending on controller wrap
                const updatedRoadmapData = resp.data.data ? resp.data.data : resp.data;
                
                setRoadmap(updatedRoadmapData);
                if (updatedRoadmapData.progress) {
                    setProgress(updatedRoadmapData.progress);
                }
                
                alert(`Stage status updated successfully.`);
            }
        } catch (err) {
            console.error(`Error executing stage state change (${actionType}):`, err);
            alert(`Failed to modify phase completion matrix.`);
        }
    };

    return (
        <main className="roadmap">
            <section className="roadmap-header">
                <h1>Your Roadmap</h1>
                <p>Your personalized learning roadmap helps you stay focused, track progress, and explore the best courses for your goals.</p>
            </section>

            {!roadmap ? (
                <div className="roadmap-empty">
                    <div className="spinner"></div>
                    <p>Compiling roadmap workspace matrix...</p>
                </div>
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
                                <span><strong>Pre-requisites:</strong> {(roadmap.skillsRequired || []).join(", ")}</span>
                            </div>
                        </div>
                    </section>

                    <section className="roadmap-stages">
                        <div className="stages-section-header">
                            <h3>Roadmap Stages</h3>
                            <div className="roadmap-progress-badge">
                                Progress Matrix: <strong>{progress.percentage}%</strong> ({progress.completedCount}/{progress.totalStages} Complete)
                            </div>
                        </div>

                        <ul>
                            {(roadmap.stages || []).map((stage, index) => {
                                const isExpanded = !!expandedStages[index];
                                return (
                                    <li className={`roadmap-stage ${stage.status === "completed" ? "stage-is-completed" : ""}`} key={index}>
                                        <div className="roadmap-stage-header">
                                            <div>
                                                <p className="roadmap-stage-label">Stage {index + 1}</p>
                                                <h4>{stage.title}</h4>
                                            </div>
                                            <span className="roadmap-stage-time">{stage.estimatedTime}</span>
                                        </div>
                                        
                                        <p className="roadmap-stage-description">{stage.description}</p>
                                        
                                        <div className="roadmap-stage-details">
                                            <p><strong>Core Competencies:</strong> {(stage.skills || []).join(", ")}</p>
                                            <p><strong>Target Projects:</strong> {(stage.projects || []).join(", ")}</p>
                                        </div>

                                        <div className="roadmap-stage-courses">
                                            <button 
                                                type="button" 
                                                className={`roadmap-stage-courses-toggle ${isExpanded ? "is-expanded" : ""}`}
                                                onClick={() => toggleStageCourses(index)}
                                            >
                                                <span>Recommended Courses ({(stage.recommendedCourses || []).length})</span>
                                                <svg className="dropdown-chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                            </button>
                                            
                                            <div className={`roadmap-course-dropdown-wrapper ${isExpanded ? "open" : "collapsed"}`}>
                                                <div className="roadmap-course-grid">
                                                    {(stage.recommendedCourses || []).map((course, courseIndex) => (
                                                        <div className="roadmap-course-card" key={courseIndex}>
                                                            <CourseCard course={course} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="roadmap-stage-actions">
                                            {stage.status !== "completed" ? (
                                                <button 
                                                    className="btn-complete-stage" 
                                                    onClick={() => handleStageAction(index, stage, "COMPLETE")}
                                                >
                                                    Mark Stage Completed
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                </button>
                                            ) : (
                                                <div className="action-completed-wrapper">
                                                    <span className="stage-completed-badge">
                                                        Completed
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    </span>
                                                    <button 
                                                        className="btn-undo-stage"
                                                        onClick={() => handleStageAction(index, stage, "UNDO")}
                                                        title="Revert phase status back to incomplete"
                                                    >
                                                        Undo
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                </div>
            )}
        </main>
    );
}

export default Roadmap;