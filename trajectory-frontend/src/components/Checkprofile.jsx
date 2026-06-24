import axios from "axios";
import { useNavigate } from "react-router-dom";
import { checkProfiles } from "../../services/profileService";
const checkProfile = async () => {
  const navigate = useNavigate();
  try {
    const res = await checkProfiles();
    const profile = res.data.profile;
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