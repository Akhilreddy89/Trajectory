import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  {updateProfile ,getProfile} from "../../services/profileService.js";
import Navbar from "../components/Navbar.jsx";
import "../style/Home.css";
function Profile() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

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
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
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

  // Interests

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
    await updateProfile(profile);
    navigate("/dashboard");
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />
    <div style={{ padding: "20px" }}>
      <h1>Trajectory Profile Setup</h1>

      <h3>Step {step} of 5</h3>

      {/* STEP 1 */}

      {step === 1 && (
        <div>
          <h2>Basic Information</h2>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={profile.fullName}
            onChange={handleChange}
          />

          <br /><br />

          <input
            type="text"
            name="college"
            placeholder="College"
            value={profile.college}
            onChange={handleChange}
          />

          <br /><br />

          <input
            type="text"
            name="branch"
            placeholder="Branch"
            value={profile.branch}
            onChange={handleChange}
          />

          <br /><br />

          <input
            type="number"
            name="year"
            placeholder="Year"
            value={profile.year}
            onChange={handleChange}
          />

          <br /><br />

          <button onClick={nextStep}>
            Next
          </button>
        </div>
      )}

      {/* STEP 2 */}

      {step === 2 && (
        <div>
          <h2>Career Goals</h2>

          <select
            name="careerGoal"
            value={profile.careerGoal}
            onChange={handleChange}
          >
            <option value="">
              Select Career Goal
            </option>

            <option value="Frontend Developer">
              Frontend Developer
            </option>

            <option value="Backend Developer">
              Backend Developer
            </option>

            <option value="Full Stack Developer">
              Full Stack Developer
            </option>

            <option value="AI Engineer">
              AI Engineer
            </option>

            <option value="Data Analyst">
              Data Analyst
            </option>
          </select>

          <br /><br />

          <input
            type="text"
            placeholder="Add Learning Goal"
            value={goalInput}
            onChange={(e) =>
              setGoalInput(e.target.value)
            }
          />

          <button
            type="button"
            onClick={addGoal}
          >
            Add Goal
          </button>

          <ul>
            {profile.learningGoals.map(
              (goal, index) => (
                <li key={index}>
                  {goal}

                  <button
                    type="button"
                    onClick={() =>
                      removeGoal(index)
                    }
                  >
                    Remove
                  </button>
                </li>
              )
            )}
          </ul>

          <button onClick={prevStep}>
            Back
          </button>

          <button onClick={nextStep}>
            Next
          </button>
        </div>
      )}

      {/* STEP 3 */}

      {step === 3 && (
        <div>
          <h2>Skills & Interests</h2>

          <input
            type="text"
            placeholder="Skill Name"
            value={skillName}
            onChange={(e) =>
              setSkillName(e.target.value)
            }
          />

          <select
            value={skillLevel}
            onChange={(e) =>
              setSkillLevel(e.target.value)
            }
          >
            <option value="beginner">
              Beginner
            </option>

            <option value="intermediate">
              Intermediate
            </option>

            <option value="advanced">
              Advanced
            </option>
          </select>

          <button
            type="button"
            onClick={addSkill}
          >
            Add Skill
          </button>

          <ul>
            {profile.skills.map((skill, index) => (
              <li key={index}>
                {skill.name} - {skill.level}

                <button
                  type="button"
                  onClick={() =>
                    removeSkill(index)
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <br />

          <input
            type="text"
            placeholder="Add Interest"
            value={interestInput}
            onChange={(e) =>
              setInterestInput(e.target.value)
            }
          />

          <button
            type="button"
            onClick={addInterest}
          >
            Add Interest
          </button>

          <ul>
            {profile.interests.map(
              (interest, index) => (
                <li key={index}>
                  {interest}

                  <button
                    type="button"
                    onClick={() =>
                      removeInterest(index)
                    }
                  >
                    Remove
                  </button>
                </li>
              )
            )}
          </ul>

          <button onClick={prevStep}>
            Back
          </button>

          <button onClick={nextStep}>
            Next
          </button>
        </div>
      )}

      {/* STEP 4 */}

      {step === 4 && (
        <div>
          <h2>Learning Preferences</h2>

          <label>Learning Style</label>

          <br />

          <select
            name="preferredLearningStyle"
            value={profile.preferredLearningStyle}
            onChange={handleChange}
          >
            <option value="video">
              Video
            </option>

            <option value="theory">
              Theory
            </option>

            <option value="project">
              Project
            </option>

            <option value="mixed">
              Mixed
            </option>
          </select>

          <br /><br />

          <label>Difficulty Level</label>

          <br />

          <select
            name="preferredDifficultyLevel"
            value={
              profile.preferredDifficultyLevel
            }
            onChange={handleChange}
          >
            <option value="beginner">
              Beginner
            </option>

            <option value="intermediate">
              Intermediate
            </option>

            <option value="advanced">
              Advanced
            </option>
          </select>

          <br /><br />

          <label>
            Weekly Learning Hours
          </label>

          <br />

          <input
            type="number"
            name="weeklyLearningHours"
            value={profile.weeklyLearningHours}
            onChange={handleChange}
          />

          <br /><br />

          <button onClick={prevStep}>
            Back
          </button>

          <button onClick={nextStep}>
            Next
          </button>
        </div>
      )}

      {/* STEP 5 */}

      {step === 5 && (
        <div>
          <h2>Review Profile</h2>

          <p>
            <strong>Name:</strong>{" "}
            {profile.fullName}
          </p>

          <p>
            <strong>College:</strong>{" "}
            {profile.college}
          </p>

          <p>
            <strong>Branch:</strong>{" "}
            {profile.branch}
          </p>

          <p>
            <strong>Career Goal:</strong>{" "}
            {profile.careerGoal}
          </p>

          <p>
            <strong>Skills:</strong>
          </p>

          <ul>
            {profile.skills.map(
              (skill, index) => (
                <li key={index}>
                  {skill.name} - {skill.level}
                </li>
              )
            )}
          </ul>

          <p>
            <strong>Interests:</strong>
          </p>

          <ul>
            {profile.interests.map(
              (interest, index) => (
                <li key={index}>
                  {interest}
                </li>
              )
            )}
          </ul>

          <button onClick={prevStep}>
            Back
          </button>

          <button onClick={handleSubmit}>
            Submit Profile
          </button>
        </div>
      )}
    </div>
    </>
  );
}

export default Profile;