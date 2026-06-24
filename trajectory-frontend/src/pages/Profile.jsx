import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile, getProfile } from "../../services/profileService.js";
import "../style/Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");

  const [profile, setProfile] = useState({
    fullName: "",
    college: "",
    branch: "",
    year: "",
    careerGoal: "",
    skills: [],
    interests: [],
    learningGoals: [],
    preferredLearningStyle: "video",
    preferredDifficultyLevel: "beginner",
    weeklyLearningHours: 5,
  });

  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("beginner");
  const [interestInput, setInterestInput] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [loading, setLoading] = useState(true);

  const validateStep = () => {
    const nextErrors = {};

    if (step === 1) {
      if (!profile.fullName.trim()) {
        nextErrors.fullName = "Full name is required.";
      }
      if (profile.year && (profile.year < 1 || profile.year > 5)) {
        nextErrors.year = "Year must be between 1 and 5.";
      }
    } else if (step === 2) {
      if (!profile.careerGoal) {
        nextErrors.careerGoal = "Career goal is required.";
      }
      if (profile.learningGoals.length === 0) {
        nextErrors.learningGoals = "Add at least one learning goal.";
      }
    } else if (step === 3) {
      if (profile.skills.length === 0) {
        nextErrors.skills = "Add at least one skill.";
      }
      if (profile.interests.length === 0) {
        nextErrors.interests = "Add at least one interest.";
      }
    } else if (step === 4) {
      if (!profile.weeklyLearningHours || profile.weeklyLearningHours < 1) {
        nextErrors.weeklyLearningHours = "Weekly hours must be at least 1.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      if (res) {
        setProfile({
          fullName: res.fullName || "",
          college: res.college || "",
          branch: res.branch || "",
          year: res.year || "",
          careerGoal: res.careerGoal || "",
          skills: res.skills || [],
          interests: res.interests || [],
          learningGoals: res.learningGoals || [],
          preferredLearningStyle: res.preferredLearningStyle || "video",
          preferredDifficultyLevel: res.preferredDifficultyLevel || "beginner",
          weeklyLearningHours: res.weeklyLearningHours || 5,
        });
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
      setErrors({});
      setStatusMessage("");
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setErrors({});
    setStatusMessage("");
  };

  const addSkill = () => {
    if (!skillName.trim()) return;
    setProfile({
      ...profile,
      skills: [...profile.skills, { name: skillName, level: skillLevel }],
    });
    setSkillName("");
    setSkillLevel("beginner");
  };

  const removeSkill = (index) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((_, i) => i !== index),
    });
  };

  const addInterest = () => {
    if (!interestInput.trim()) return;
    setProfile({
      ...profile,
      interests: [...profile.interests, interestInput],
    });
    setInterestInput("");
  };

  const removeInterest = (index) => {
    setProfile({
      ...profile,
      interests: profile.interests.filter((_, i) => i !== index),
    });
  };

  const addGoal = () => {
    if (!goalInput.trim()) return;
    setProfile({
      ...profile,
      learningGoals: [...profile.learningGoals, goalInput],
    });
    setGoalInput("");
  };

  const removeGoal = (index) => {
    setProfile({
      ...profile,
      learningGoals: profile.learningGoals.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async () => {
    try {
      setStatusMessage("");
      await updateProfile(profile);
      navigate("/dashboard");
    } catch (err) {
      setStatusMessage(err.message || "Failed to update profile. Please try again.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="loading-state">
            <div className="spinner"></div>
            <h2>Loading your profile...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="step-indicator">Step {step} of 5</div>
          <h1>Profile Setup</h1>
          <p>Complete your profile to get personalized course recommendations and your optimal roadmap.</p>
        </div>

        {statusMessage && (
          <div className="status-message error">{statusMessage}</div>
        )}

        {/* STEP 1: BASIC INFORMATION */}
        {step === 1 && (
          <div className="form-section">
            <h2>Basic Information</h2>
            <div className="form-field">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                placeholder="Your full name"
                value={profile.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <p className="field-error">{errors.fullName}</p>}
            </div>

            <div className="form-field">
              <label>College</label>
              <input
                type="text"
                name="college"
                placeholder="Your college"
                value={profile.college}
                onChange={handleChange}
              />
            </div>

            <div className="form-grid-2col">
              <div className="form-field">
                <label>Branch</label>
                <input
                  type="text"
                  name="branch"
                  placeholder="Your branch/major"
                  value={profile.branch}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>Year</label>
                <input
                  type="number"
                  name="year"
                  placeholder="Year (1-4)"
                  value={profile.year}
                  onChange={handleChange}
                  min="1"
                  max="4"
                />
                {errors.year && <p className="field-error">{errors.year}</p>}
              </div>
            </div>

            <div className="button-group single-next">
              <button type="button" className="btn-next" onClick={nextStep}>
                Next Step →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CAREER GOALS */}
        {step === 2 && (
          <div className="form-section">
            <h2>Career Goals & Learning Goals</h2>
            <div className="form-field">
              <label>Career Goal *</label>
              <select name="careerGoal" value={profile.careerGoal} onChange={handleChange}>
                <option value="">Select a career path</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="AI Engineer">AI Engineer</option>
                <option value="Data Analyst">Data Analyst</option>
              </select>
              {errors.careerGoal && <p className="field-error">{errors.careerGoal}</p>}
            </div>

            <div className="form-field">
              <label>Add Learning Goal</label>
              <div className="add-button-group full">
                <input
                  type="text"
                  placeholder="e.g., Master React, Build REST APIs"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                />
                <button type="button" className="add-btn" onClick={addGoal}>
                  Add
                </button>
              </div>
            </div>

            {profile.learningGoals.length > 0 && (
              <div className="item-list">
                {profile.learningGoals.map((goal, index) => (
                  <div key={index} className="item-tag">
                    <span>{goal}</span>
                    <button type="button" className="item-remove" onClick={() => removeGoal(index)}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.learningGoals && <p className="field-error">{errors.learningGoals}</p>}

            <div className="button-group">
              <button type="button" className="btn-back" onClick={prevStep}>
                ← Back
              </button>
              <button type="button" className="btn-next" onClick={nextStep}>
                Next Step →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SKILLS & INTERESTS */}
        {step === 3 && (
          <div className="form-section">
            <h2>Skills & Interests</h2>
            
            <div className="form-field">
              <label>Add Skills *</label>
              <div className="add-button-group add-skill-group">
                <input
                  type="text"
                  placeholder="Skill name (e.g. JavaScript)"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                />
                <select value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)}>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <button type="button" className="add-btn" onClick={addSkill}>
                  Add
                </button>
              </div>
            </div>

            {profile.skills.length > 0 && (
              <div className="item-list">
                {profile.skills.map((skill, index) => (
                  <div key={index} className="item-tag">
                    <span>{skill.name} <span className="level">({skill.level})</span></span>
                    <button type="button" className="item-remove" onClick={() => removeSkill(index)}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.skills && <p className="field-error">{errors.skills}</p>}

            <div className="form-field">
              <label>Add Interests *</label>
              <div className="add-button-group full">
                <input
                  type="text"
                  placeholder="e.g., Web Development, Open Source"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                />
                <button type="button" className="add-btn" onClick={addInterest}>
                  Add
                </button>
              </div>
            </div>

            {profile.interests.length > 0 && (
              <div className="item-list">
                {profile.interests.map((interest, index) => (
                  <div key={index} className="item-tag">
                    <span>{interest}</span>
                    <button type="button" className="item-remove" onClick={() => removeInterest(index)}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.interests && <p className="field-error">{errors.interests}</p>}

            <div className="button-group">
              <button type="button" className="btn-back" onClick={prevStep}>
                ← Back
              </button>
              <button type="button" className="btn-next" onClick={nextStep}>
                Next Step →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: LEARNING PREFERENCES */}
        {step === 4 && (
          <div className="form-section">
            <h2>Learning Preferences</h2>

            <div className="form-grid-2col">
              <div className="form-field">
                <label>Preferred Learning Style</label>
                <select name="preferredLearningStyle" value={profile.preferredLearningStyle} onChange={handleChange}>
                  <option value="video">Video Lessons</option>
                  <option value="theory">Theory & Docs</option>
                  <option value="project">Project-Based</option>
                  <option value="mixed">Mixed Strategy</option>
                </select>
              </div>

              <div className="form-field">
                <label>Target Difficulty</label>
                <select name="preferredDifficultyLevel" value={profile.preferredDifficultyLevel} onChange={handleChange}>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label>Weekly Commitment (Hours) *</label>
              <input
                type="number"
                name="weeklyLearningHours"
                value={profile.weeklyLearningHours}
                onChange={handleChange}
                min="1"
              />
              {errors.weeklyLearningHours && (
                <p className="field-error">{errors.weeklyLearningHours}</p>
              )}
            </div>

            <div className="button-group">
              <button type="button" className="btn-back" onClick={prevStep}>
                ← Back
              </button>
              <button type="button" className="btn-next" onClick={nextStep}>
                Review Profile →
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW */}
        {step === 5 && (
          <div className="form-section">
            <h2>Review Your Profile</h2>
            <p className="review-subtitle">Make sure everything looks right before initialization.</p>

            <div className="review-grid">
              <div className="review-card span-2">
                <h3>Personal & Academic</h3>
                <div className="review-details">
                  <div className="detail-row"><span>Name:</span> <strong>{profile.fullName || "Not provided"}</strong></div>
                  <div className="detail-row"><span>College:</span> <strong>{profile.college || "Not provided"}</strong></div>
                  <div className="detail-row"><span>Branch & Year:</span> <strong>{profile.branch ? `${profile.branch} — Year ${profile.year}` : "Not provided"}</strong></div>
                </div>
              </div>

              <div className="review-card">
                <h3>Target Path</h3>
                <span className="badge-highlight">{profile.careerGoal || "Not selected"}</span>
              </div>

              <div className="review-card">
                <h3>Routine Pace</h3>
                <div className="review-details">
                  <div className="detail-row"><span>Style:</span> <strong className="capitalize">{profile.preferredLearningStyle}</strong></div>
                  <div className="detail-row"><span>Level:</span> <strong className="capitalize">{profile.preferredDifficultyLevel}</strong></div>
                  <div className="detail-row"><span>Commitment:</span> <strong>{profile.weeklyLearningHours} hrs/week</strong></div>
                </div>
              </div>

              <div className="review-card span-2">
                <h3>Learning Core Targets</h3>
                <div className="review-badges">
                  {profile.learningGoals.map((goal, i) => (
                    <span key={i} className="review-pill-tag">{goal}</span>
                  ))}
                </div>
              </div>

              <div className="review-card">
                <h3>Current Stack</h3>
                <div className="review-badges">
                  {profile.skills.map((skill, i) => (
                    <span key={i} className="review-pill-tag text-p">{skill.name} <small>({skill.level})</small></span>
                  ))}
                </div>
              </div>

              <div className="review-card">
                <h3>General Focus</h3>
                <div className="review-badges">
                  {profile.interests.map((interest, i) => (
                    <span key={i} className="review-pill-tag">{interest}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="button-group">
              <button type="button" className="btn-back" onClick={prevStep}>
                Modify Data
              </button>
              <button type="button" className="btn-submit" onClick={handleSubmit}>
                Complete Setup & Launch →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;