import axios from "axios";
import { useNavigate } from "react-router-dom";
const checkProfile = async () => {
  const navigate = useNavigate();
  try {
    const res = await axios.get(
      "http://localhost:5000/api/profile/me",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const profile = res.data.profile;

    // Check if profile exists
    if (!profile) {
      navigate("/profile");
      return;
    }

    // Check required fields
    if (
      !profile.fullName ||
      !profile.careerGoal ||
      profile.skills.length === 0
    ) {
      navigate("/profile");
    } else {
      navigate("/dashboard");
    }

  } catch (err) {
    console.error(err);
    navigate("/profile");
  }
};
export default checkProfile;