import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCompleteRoadmap } from "../../services/roadmapServices.js";
import "../style/Progress.css";

function Progress() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    role: "",
    percentage: 0,
    completedCount: 0,
    totalStages: 0,
    remainingCount: 0,
    skillsMastered: [],
    pendingSkills: [],
    historyLog: []
  });

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const res = await getCompleteRoadmap();
        if (res.data) {
          const stages = res.data.stages || [];
          const prog = res.data.progress || {};
          
          // Compute dynamic analytics sets from actual backend data
          const mastered = [];
          const pending = [];
          const log = [];

          stages.forEach((stage, idx) => {
            if (stage.status === "completed") {
              mastered.push(...stage.skills);
              log.push({
                event: `Completed Stage ${idx + 1}: ${stage.title}`,
                date: "Completed",
                type: "success"
              });
            } else {
              pending.push(...stage.skills);
            }
          });

          setMetrics({
            role: res.data.role || "Engineering Profile",
            percentage: prog.percentage || 0,
            completedCount: prog.completedCount || 0,
            totalStages: prog.totalStages || stages.length || 0,
            remainingCount: prog.remaining || 0,
            skillsMastered: [...new Set(mastered)], // De-duplicate arrays
            pendingSkills: [...new Set(pending)].filter(s => !mastered.includes(s)),
            historyLog: log.length > 0 ? log : [{ event: "Roadmap compilation initialized", date: "System Sync", type: "info" }]
          });
        }
        setLoading(false);
      } catch (err) {
        console.error("Error loading workspace status indicators:", err);
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-workspace-progress">
        <div className="progress-dashboard-container">
          <div className="loading-state">
            <div className="spinner"></div>
            <h2>Analyzing metric sequences...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-workspace-progress">
      <div className="progress-dashboard-container">
        
        {/* Workspace Context Tracker Header */}
        <div className="workspace-progress-header">
          <div className="progress-title-block">
            <h1>Analytics & Progress</h1>
            <p>Real-time matrix verification of your compiled tracking goals for <strong>{metrics.role}</strong>.</p>
          </div>
          <span className="sync-status-indicator">
            <span className="pulse-dot"></span> Live Pipeline Verified
          </span>
        </div>

        {/* Top Tier Metrics Layout Core Block Row */}
        <div className="progress-metrics-grid">
          <div className="metric-score-card summary-main-block">
            <span className="metric-label">Compilation Status</span>
            <div className="percentage-display-group">
              <span className="giant-percentage-text">{metrics.percentage}%</span>
              <div className="progress-ring-track">
                <div className="progress-ring-fill" style={{ width: `${metrics.percentage}%` }}></div>
              </div>
            </div>
          </div>

          <div className="metric-score-card">
            <span className="metric-label">Completed Milestones</span>
            <div className="numerical-metric-value">{metrics.completedCount}</div>
            <p className="metric-sub-narrative">Stages verified active out of {metrics.totalStages} targets.</p>
          </div>

          <div className="metric-score-card">
            <span className="metric-label">Pipeline Remaining</span>
            <div className="numerical-metric-value">{metrics.remainingCount}</div>
            <p className="metric-sub-narrative">Unlocking sequences remaining to match vector targets.</p>
          </div>
        </div>

        {/* Bottom Split Matrix Blocks Layout System */}
        <div className="progress-split-matrix">
          
          {/* Core Skills Competency Distribution Split Box */}
          <div className="progress-matrix-block">
            <div className="matrix-block-title-bar">
              <h3>Capabilities Distribution</h3>
            </div>
            
            <div className="capabilities-split-box">
              <div className="capability-stack-group">
                <span className="stack-group-title mastered-title">Mastered Core Assets ({metrics.skillsMastered.length})</span>
                {metrics.skillsMastered.length === 0 ? (
                  <p className="empty-stack-text">No skill sequences checked off yet.</p>
                ) : (
                  <div className="stack-badge-wrap">
                    {metrics.skillsMastered.map((skill, i) => (
                      <span key={i} className="progress-matrix-pill skill-mastered-pill">{skill}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="capability-stack-group">
                <span className="stack-group-title pending-title">Incomplete Pipeline Skills ({metrics.pendingSkills.length})</span>
                {metrics.pendingSkills.length === 0 && metrics.skillsMastered.length > 0 ? (
                  <p className="empty-stack-text">All parameters successfully verified.</p>
                ) : (
                  <div className="stack-badge-wrap">
                    {metrics.pendingSkills.map((skill, i) => (
                      <span key={i} className="progress-matrix-pill skill-pending-pill">{skill}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Activity Audit Pipeline Log Split Box */}
          <div className="progress-matrix-block">
            <div className="matrix-block-title-bar">
              <h3>System Event Audit Log</h3>
            </div>
            
            <div className="timeline-audit-pipeline">
              {metrics.historyLog.map((log, i) => (
                <div key={i} className="audit-entry-item">
                  <div className={`audit-indicator-dot ${log.type === "success" ? "active-success" : ""}`}></div>
                  <div className="audit-content-block">
                    <span className="audit-title-text">{log.event}</span>
                    <span className="audit-timestamp-label">{log.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Progress;