import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    college: "",
    branch: "",
    year: "",
    skills: "",
    interests: "",
    learningGoals: "",
    preferredLearningStyle: "video",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const p = res.data.profile;

        if (p) {
          setProfile({
            name: p.name || "",
            college: p.college || "",
            branch: p.branch || "",
            year: p.year || "",
            skills: p.skills?.map(s => s.name).join(", ") || "",
            interests: p.interests?.join(", ") || "",
            learningGoals: p.learningGoals?.join(", ") || "",
            preferredLearningStyle: p.preferredLearningStyle || "video",
          });
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedData = {
        ...profile,
        skills: profile.skills
          ? profile.skills.split(",").map(s => ({
              name: s.trim(),
              level: "beginner",
            }))
          : [],
        interests: profile.interests
          ? profile.interests.split(",").map(i => i.trim())
          : [],
        learningGoals: profile.learningGoals
          ? profile.learningGoals.split(",").map(g => g.trim())
          : [],
      };

      await axios.put(
        "http://localhost:5000/api/profile",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Profile saved successfully");
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" value={profile.name} onChange={handleChange} placeholder="Name" />
        <input name="college" value={profile.college} onChange={handleChange} placeholder="College" />
        <input name="branch" value={profile.branch} onChange={handleChange} placeholder="Branch" />
        <input name="year" value={profile.year} onChange={handleChange} placeholder="Year" />

        <input name="skills" value={profile.skills} onChange={handleChange} placeholder="Skills (comma separated)" />
        <input name="interests" value={profile.interests} onChange={handleChange} placeholder="Interests" />
        <input name="learningGoals" value={profile.learningGoals} onChange={handleChange} placeholder="Goals" />

        <select
          name="preferredLearningStyle"
          value={profile.preferredLearningStyle}
          onChange={handleChange}
        >
          <option value="video">Video</option>
          <option value="theory">Theory</option>
          <option value="project">Project</option>
        </select>

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default Profile;