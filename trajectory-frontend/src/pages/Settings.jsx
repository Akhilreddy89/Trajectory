import React, { useState, useEffect } from "react";
import { useProfile } from "../context/ProfileContext.jsx";
import { getProfile, updateProfile } from "../../services/profileService.js";
import { useAuth } from "../context/AuthContext.jsx";
import Footer from "../components/Footer.jsx";
import "../style/settings.css";

function Settings() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [settings, setSettings] = useState({
    fullName: "",
    email: "",
    preferredLearningStyle: "video",
    preferredDifficultyLevel: "beginner",
    weeklyLearningHours: 5,
  });


  useEffect(() => {
    if (!profile) {
      setLoading(false);
      return;
    }

    const fetchSettingsData = async () => {
      try {
        const res = await getProfile();
        if (res) {
          setSettings({
            fullName: res.fullName || "",
            email: user?.email || "",
            preferredLearningStyle: res.preferredLearningStyle || "video",
            preferredDifficultyLevel: res.preferredDifficultyLevel || "beginner",
            weeklyLearningHours: res.weeklyLearningHours || 5,
          });
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchSettingsData();
  }, [profile, user]);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      if (!settings.fullName.trim()) {
        setStatus({ type: "error", message: "Full name cannot be empty." });
        return;
      }
      await updateProfile(settings);
      setStatus({ type: "success", message: "Settings saved successfully." });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to save settings." });
    }
  };


  if (loading) {
    return (
      <div className="dashboard-workspace-settings">
        <div className="settings-dashboard-container">
          <div className="loading-state">
            <div className="spinner"></div>
            <h2>Fetching terminal configuration parameters...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="dashboard-workspace-settings">
      <div className="settings-dashboard-container">

        <div className="workspace-settings-header">
          <div className="settings-title-block">
            <h1>Account Settings</h1>
            <p>Manage your algorithmic tracking parameters and platform identity values.</p>
          </div>
        </div>

        {status.message && (
          <div className={`status-message-banner ${status.type}`}>
            {status.type === "success" ? "✓" : "⚠️"} {status.message}
          </div>
        )}

        <form onSubmit={handleSave} className="settings-form-layout">

          {/* Section 1: Profile Matrix Identity */}
          <div className="settings-card-group">
            <div className="settings-card-meta">
              <h3>Identity Parameters</h3>
              <p>Core system credentials and display signatures across workspace dashboards.</p>
            </div>

            <div className="settings-card-fields">
              <div className="form-field">
                <label>Account Identity Link (Immutable)</label>
                <input
                  type="email"
                  value={settings.email}
                  disabled
                  className="disabled-input-field"
                  title="System authentication root values cannot be altered natively."
                />
              </div>

              <div className="form-field">
                <label>Full Name Master Value *</label>
                <input
                  type="text"
                  name="fullName"
                  value={settings.fullName}
                  onChange={handleChange}
                  placeholder="Enter profile legal identity"
                />
              </div>
            </div>
          </div>
          <div className="settings-card-group">
            <div className="settings-card-meta">
              <h3>Engine Tuning Specs</h3>
              <p>Pacing parameters utilized by the pipeline engine to query custom courses.</p>
            </div>

            <div className="settings-card-fields">
              <div className="form-grid-2col">
                <div className="form-field">
                  <label>Resource Delivery Format</label>
                  <div className="select-wrapper">
                    <select
                      name="preferredLearningStyle"
                      value={settings.preferredLearningStyle}
                      onChange={handleChange}
                    >
                      <option value="video">Video Resources</option>
                      <option value="theory">Documentation & Theory</option>
                      <option value="project">Project Archetypes</option>
                      <option value="mixed">Mixed Strategy</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label>Target Complexity Baseline</label>
                  <div className="select-wrapper">
                    <select
                      name="preferredDifficultyLevel"
                      value={settings.preferredDifficultyLevel}
                      onChange={handleChange}
                    >
                      <option value="beginner">Beginner Baseline</option>
                      <option value="intermediate">Intermediate Scope</option>
                      <option value="advanced">Advanced Intensity</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-field">
                <label>Weekly Commitment Allocation (Hours)</label>
                <input
                  type="number"
                  name="weeklyLearningHours"
                  value={settings.weeklyLearningHours}
                  onChange={handleChange}
                  min="1"
                  max="168"
                />
              </div>
            </div>
          </div>

          <div className="settings-action-footer">
            <button type="submit" className="btn-save-settings">
              Save Configuration Changes
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
            </button>
          </div>

        </form>

      </div>
    </div>
    <Footer />
    </>
  );
}

export default Settings;