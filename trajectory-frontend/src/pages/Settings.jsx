import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/profileService";
import "../style/Settings.css";

function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    college: "",
    branch: "",
    year: "",
    careerGoal: "",
    skills: [],
    interests: [],
    preferredLearningStyle: "video",
    preferredDifficultyLevel: "beginner",
    weeklyLearningHours: 5,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();

        setFormData({
          fullName: profile.fullName || "",
          college: profile.college || "",
          branch: profile.branch || "",
          year: profile.year || "",
          careerGoal: profile.careerGoal || "",
          skills: profile.skills || [],
          interests: profile.interests || [],
          preferredLearningStyle:
            profile.preferredLearningStyle || "video",
          preferredDifficultyLevel:
            profile.preferredDifficultyLevel || "beginner",
          weeklyLearningHours:
            profile.weeklyLearningHours || 5,
        });
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "weeklyLearningHours"
          ? Number(value)
          : value,
    }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateProfile(formData);

      alert("Settings updated successfully!");
    } catch (err) {
      console.error("Failed to save settings:", err);
      alert("Unable to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="settings-loading">Loading settings...</div>;
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your profile and learning preferences.</p>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        <section className="settings-section">
          <h2>Profile Information</h2>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="college"
            placeholder="College"
            value={formData.college}
            onChange={handleChange}
          />

          <input
            type="text"
            name="branch"
            placeholder="Branch"
            value={formData.branch}
            onChange={handleChange}
          />

          <input
            type="text"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
          />

          <input
            type="text"
            name="careerGoal"
            placeholder="Career Goal"
            value={formData.careerGoal}
            onChange={handleChange}
          />
        </section>

        <section className="settings-section">
          <h2>Learning Preferences</h2>

          <label>Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills.join(", ")}
            onChange={handleArrayChange}
          />

          <label>Interests (comma separated)</label>
          <input
            type="text"
            name="interests"
            value={formData.interests.join(", ")}
            onChange={handleArrayChange}
          />

          <label>Learning Style</label>
          <select
            name="preferredLearningStyle"
            value={formData.preferredLearningStyle}
            onChange={handleChange}
          >
            <option value="video">Video</option>
            <option value="reading">Reading</option>
            <option value="hands-on">Hands-on</option>
          </select>

          <label>Difficulty Level</label>
          <select
            name="preferredDifficultyLevel"
            value={formData.preferredDifficultyLevel}
            onChange={handleChange}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <label>Weekly Learning Hours</label>
          <input
            type="number"
            min="1"
            max="40"
            name="weeklyLearningHours"
            value={formData.weeklyLearningHours}
            onChange={handleChange}
          />
        </section>

        <button
          type="submit"
          className="save-btn"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default Settings;