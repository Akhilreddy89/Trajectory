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
      const p = res;

      if (p) {
        setProfile({
          fullName: p.fullName || "",
          college: p.college || "",
          branch: p.branch || "",
          year: p.year || "",

          careerGoal: p.careerGoal || "",

          skills: p.skills || [],

          interests: p.interests || [],

          learningGoals: p.learningGoals || [],

          preferredLearningStyle:
            p.preferredLearningStyle || "video",

          preferredDifficultyLevel:
            p.preferredDifficultyLevel || "beginner",

          weeklyLearningHours:
            p.weeklyLearningHours || 5,
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

  // Skills

  const addSkill = () => {
    if (!skillName.trim()) return;

    setProfile({
      ...profile,
      skills: [
        ...profile.skills,
        {
          name: skillName,
          level: skillLevel,
        },
      ],
    });

    setSkillName("");
    setSkillLevel("beginner");
  };

  const removeSkill = (index) => {
    const updated = profile.skills.filter(
      (_, i) => i !== index
    );

    setProfile({
      ...profile,
      skills: updated,
    });
  };


  const addInterest = () => {
    if (!interestInput.trim()) return;

    setProfile({
      ...profile,
      interests: [
        ...profile.interests,
        interestInput,
      ],
    });

    setInterestInput("");
  };

  const removeInterest = (index) => {
    const updated = profile.interests.filter(
      (_, i) => i !== index
    );

    setProfile({
      ...profile,
      interests: updated,
    });
  };

  // Goals

  const addGoal = () => {
    if (!goalInput.trim()) return;

    setProfile({
      ...profile,
      learningGoals: [
        ...profile.learningGoals,
        goalInput,
      ],
    });

    setGoalInput("");
  };

  const removeGoal = (index) => {
    const updated = profile.learningGoals.filter(
      (_, i) => i !== index
    );

    setProfile({
      ...profile,
      learningGoals: updated,
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

  if (loading)
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="loading-state">
            <h2>Loading your profile...</h2>
          </div>
        </div>
      </div>
    );

  return (
    <div className="profile-page">
      <div className="profile-container">
          <div className="profile-header">
            <h1>Profile Setup</h1>
            <div className="step-indicator">Step {step} of 5</div>
            <p>Complete your profile to get personalized course recommendations and roadmap.</p>
          </div>

          {statusMessage && (
            <div className="status-message">{statusMessage}</div>
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
                  placeholder="Year (1-5)"
                  value={profile.year}
                  onChange={handleChange}
                  min="1"
                  max="5"
                />
                {errors.year && <p className="field-error">{errors.year}</p>}
              </div>

              <div className="button-group">
                <button type="button" className="btn-next btn-1" onClick={nextStep}>
                  Next
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
                <select
                  name="careerGoal"
                  value={profile.careerGoal}
                  onChange={handleChange}
                >
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
                <div className="add-button-group">
                  <input
                    type="text"
                    placeholder="e.g., Master React, Build APIs"
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
                      {goal}
                      <button
                        type="button"
                        className="item-remove"
                        onClick={() => removeGoal(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {errors.learningGoals && (
                <p className="field-error">{errors.learningGoals}</p>
              )}

              <div className="button-group">
                <button type="button" className="btn-back" onClick={prevStep}>
                  Back
                </button>
                <button type="button" className="btn-next" onClick={nextStep}>
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SKILLS & INTERESTS */}
          {step === 3 && (
            <div className="form-section">
              <h2>Skills & Interests</h2>
              
              <div className="form-field">
                <label style={{ fontWeight: 600, marginBottom: "12px", display: "block" }}>Add Skills *</label>
                <div className="add-button-group add-skill-group">
                  <input
                    type="text"
                    placeholder="Skill name"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                  />
                  <select
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  <button
                    type="button"
                    className="add-btn"
                    onClick={addSkill}
                  >
                    Add Skill
                  </button>
                </div>
              </div>

              {profile.skills.length > 0 && (
                <div className="item-list">
                  {profile.skills.map((skill, index) => (
                    <div key={index} className="item-tag">
                      {skill.name} <span className="level">({skill.level})</span>
                      <button
                        type="button"
                        className="item-remove"
                        onClick={() => removeSkill(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {errors.skills && <p className="field-error">{errors.skills}</p>}

              <div className="form-field">
                <label style={{ fontWeight: 600, marginBottom: "12px", display: "block" }}>Add Interests *</label>
                <div className="add-button-group full">
                  <input
                    type="text"
                    placeholder="e.g., Web Development, Machine Learning"
                    value={interestInput}
                    onChange={(e) => setInterestInput(e.target.value)}
                  />
                  <button
                    type="button"
                    className="add-btn"
                    onClick={addInterest}
                  >
                    Add Interest
                  </button>
                </div>
              </div>

              {profile.interests.length > 0 && (
                <div className="item-list">
                  {profile.interests.map((interest, index) => (
                    <div key={index} className="item-tag">
                      {interest}
                      <button
                        type="button"
                        className="item-remove"
                        onClick={() => removeInterest(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {errors.interests && <p className="field-error">{errors.interests}</p>}

              <div className="button-group">
                <button type="button" className="btn-back" onClick={prevStep}>
                  Back
                </button>
                <button type="button" className="btn-next" onClick={nextStep}>
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: LEARNING PREFERENCES */}
          {step === 4 && (
            <div className="form-section">
              <h2>Learning Preferences</h2>

              <div className="form-field">
                <label>Preferred Learning Style</label>
                <select
                  name="preferredLearningStyle"
                  value={profile.preferredLearningStyle}
                  onChange={handleChange}
                >
                  <option value="video">Video</option>
                  <option value="theory">Theory</option>
                  <option value="project">Project-Based</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>

              <div className="form-field">
                <label>Difficulty Level</label>
                <select
                  name="preferredDifficultyLevel"
                  value={profile.preferredDifficultyLevel}
                  onChange={handleChange}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className="form-field">
                <label>Weekly Learning Hours *</label>
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
                  Back
                </button>
                <button type="button" className="btn-next" onClick={nextStep}>
                  Review
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW */}
          {step === 5 && (
            <div className="form-section">
              <h2>Review Your Profile</h2>

              <div className="review-section">
                <div className="review-item">
                  <strong>Personal Information</strong>
                  <p>Name: <strong>{profile.fullName || "Not provided"}</strong></p>
                  <p>College: <strong>{profile.college || "Not provided"}</strong></p>
                  <p>Branch: <strong>{profile.branch || "Not provided"}</strong></p>
                  <p>Year: <strong>{profile.year || "Not provided"}</strong></p>
                </div>

                <div className="review-item">
                  <strong>Career Goal</strong>
                  <p>{profile.careerGoal || "Not selected"}</p>
                </div>

                <div className="review-item">
                  <strong>Learning Goals</strong>
                  <div className="review-list">
                    {profile.learningGoals.length > 0 ? (
                      profile.learningGoals.map((goal, i) => (
                        <span key={i} className="review-tag">{goal}</span>
                      ))
                    ) : (
                      <p>None added</p>
                    )}
                  </div>
                </div>

                <div className="review-item">
                  <strong>Skills</strong>
                  <div className="review-list">
                    {profile.skills.length > 0 ? (
                      profile.skills.map((skill, i) => (
                        <span key={i} className="review-tag">
                          {skill.name} ({skill.level})
                        </span>
                      ))
                    ) : (
                      <p>None added</p>
                    )}
                  </div>
                </div>

                <div className="review-item">
                  <strong>Interests</strong>
                  <div className="review-list">
                    {profile.interests.length > 0 ? (
                      profile.interests.map((interest, i) => (
                        <span key={i} className="review-tag">{interest}</span>
                      ))
                    ) : (
                      <p>None added</p>
                    )}
                  </div>
                </div>

                <div className="review-item">
                  <strong>Preferences</strong>
                  <p>Learning Style: <strong>{profile.preferredLearningStyle}</strong></p>
                  <p>Difficulty: <strong>{profile.preferredDifficultyLevel}</strong></p>
                  <p>Weekly Hours: <strong>{profile.weeklyLearningHours}</strong></p>
                </div>
              </div>

              <div className="button-group">
                <button type="button" className="btn-back" onClick={prevStep}>
                  Back
                </button>
                <button type="button" className="btn-next" onClick={handleSubmit}>
                  Complete Setup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}

export default Profile;